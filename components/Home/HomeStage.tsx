"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChecklistArtifact } from "../Artifacts";
import { PAIN_ICONS, PAIN_SLUGS } from "@/lib/pains";

/**
 * Scroll choreography for the top of the homepage.
 *
 * Seven elements don't belong to the hero or to the situations section —
 * they belong to the transition between them:
 *
 *   slot 0     the checklist artifact, which lands full-size in the
 *              "one platform" panel
 *   slots 1-6  one SVG icon per move-out situation, which land in front of
 *              their own label in the situation list
 *
 * As the page scrolls the hero headline recedes (RecedingTitle) while these
 * travel down and settle into the section below, so the type and the objects
 * separate instead of scrolling away as one layer.
 *
 * Because they cross a section boundary they can't live inside either
 * section's DOM. This component wraps both, renders them once in an
 * absolutely-positioned overlay spanning the whole region, and interpolates
 * each between two measured rectangles:
 *
 *   [data-fly-slot="n"]   — an invisible box in the hero marking the start
 *   [data-fly-target="n"] — the box in the section below where it lands
 *
 * Measuring real DOM rather than hardcoding offsets means the choreography
 * survives copy of any length in any of the three locales, and re-measures
 * on resize and once webfonts have settled (both change layout).
 *
 * Note there is no `hidden xl:block` anywhere in this system. Whether
 * anything flies is decided here in JS (matchMedia), because the component
 * already has to know the breakpoint in order to measure — and routing the
 * decision through a `.hidden` utility makes it vulnerable to any stylesheet
 * that defines its own `.hidden`, which browser extensions commonly do.
 */

/** Index 0 is the artifact; 1-6 are the per-situation icons, in list order. */
const FLYERS: (() => ReactNode)[] = [
  () => <ChecklistArtifact />,
  ...PAIN_SLUGS.map((slug) => {
    const Icon = PAIN_ICONS[slug];
    return () => (
      <span className="flex h-14 w-14 items-center justify-center rounded-card-sm bg-mist">
        <Icon className="h-7 w-7 text-ink" />
      </span>
    );
  }),
];

type Rect = { x: number; y: number; w: number };
type Pair = { start: Rect; end: Rect };

/**
 * Sub-pixel-tolerant comparison, used to decide whether a re-measure is
 * worth a state update.
 *
 * This guard is load-bearing, not an optimisation. `measure` runs from a
 * ResizeObserver on the wrapper, and it builds a fresh array every time —
 * so setting state unconditionally would re-render, which lays out, which
 * notifies the observer again, forever. That loop locks the renderer.
 */
function samePairs(a: Pair[] | null, b: Pair[] | null): boolean {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  const close = (p: number, q: number) => Math.abs(p - q) < 0.5;
  return a.every((pair, i) => {
    const other = b[i];
    return (
      close(pair.start.x, other.start.x) &&
      close(pair.start.y, other.start.y) &&
      close(pair.start.w, other.start.w) &&
      close(pair.end.x, other.end.x) &&
      close(pair.end.y, other.end.y) &&
      close(pair.end.w, other.end.w)
    );
  });
}

/**
 * One element in flight. Split into its own component because each needs its
 * own set of `useTransform` hooks, and hooks can't be called in a loop over a
 * variable-length array.
 */
function Flyer({
  index,
  pair,
  scrollY,
  distance,
}: {
  index: number;
  pair: Pair;
  scrollY: MotionValue<number>;
  distance: number;
}) {
  // Each departs on a slight stagger so the group reads as separate objects
  // rather than one rigid formation — the last is still moving when the
  // first has arrived. Fractions are of the measured flight distance.
  const from = Math.min(index * 0.04, 0.24) * distance;
  const to = (0.8 + Math.min(index * 0.02, 0.14)) * distance;
  const span: [number, number] = [from, to];
  const progress = scrollY;

  const x = useTransform(progress, span, [pair.start.x, pair.end.x]);
  const yTravel = useTransform(progress, span, [pair.start.y, pair.end.y]);
  // Landing pads are smaller than the flying elements, so scale comes from
  // the measured widths rather than being picked by eye.
  const scale = useTransform(progress, span, [1, pair.end.w / pair.start.w]);
  // A shallow arc keeps the motion from reading as a straight linear slide.
  const lift = useTransform(progress, [from, (from + to) / 2, to], [0, -16, 0]);
  const y = useTransform([yTravel, lift], ([travel, arc]: number[]) => travel + arc);

  return (
    <motion.div className="absolute left-0 top-0 origin-top-left" style={{ x, y, scale }}>
      {FLYERS[index]()}
    </motion.div>
  );
}

export default function HomeStage({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  // How far the page must scroll for the flight to complete, in pixels.
  const [distance, setDistance] = useState(0);
  const reduceMotion = useReducedMotion();

  // Raw scroll position in pixels, not a 0-1 progress over some element.
  //
  // The obvious `useScroll({ target: wrapperRef })` is wrong here: the
  // wrapper spans BOTH sections, so its progress only reaches 1 once the
  // situations section has itself scrolled past — the flight would still be
  // barely started by the time its destinations are on screen. What the
  // choreography actually wants is "one hero-height of scrolling", which is
  // a measured pixel distance, so the interpolation works in those units.
  const { scrollY } = useScroll();

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Every exit below goes through `commit`, which drops the update when
    // nothing actually moved — see samePairs for why that matters.
    const commit = (next: Pair[] | null) =>
      setPairs((prev) => (samePairs(prev, next) ? prev : next));

    // The hero is the wrapper's first child; scrolling its full height puts
    // the situations section in view, which is exactly when the flight
    // should finish.
    const hero = wrapper.firstElementChild as HTMLElement | null;
    if (hero) {
      const h = Math.round(hero.getBoundingClientRect().height);
      setDistance((prev) => (Math.abs(prev - h) < 1 ? prev : h));
    }

    // Below xl the hero has no room for a collage, so nothing flies and the
    // sections render their own static content instead.
    if (!window.matchMedia("(min-width: 1280px)").matches) {
      commit(null);
      return;
    }

    const base = wrapper.getBoundingClientRect();
    const next: Pair[] = [];

    for (let i = 0; i < FLYERS.length; i += 1) {
      const slot = wrapper.querySelector<HTMLElement>(`[data-fly-slot="${i}"]`);
      const target = wrapper.querySelector<HTMLElement>(`[data-fly-target="${i}"]`);
      if (!slot || !target) return commit(null);

      const s = slot.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      // A zero-width rect means the element isn't laid out yet (or is hidden
      // by something outside our control). Interpolating from it would stack
      // everything in the top-left corner, so bail rather than render wrong.
      if (!s.width || !t.width) return commit(null);

      next.push({
        start: { x: s.left - base.left, y: s.top - base.top, w: s.width },
        end: { x: t.left - base.left, y: t.top - base.top, w: t.width },
      });
    }

    commit(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // Webfonts land after first paint and reflow every headline, which moves
    // both the slots and the targets. Re-measure once they're in.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    // The quote carousel in the section below changes height per slide;
    // observing the wrapper catches that and any other late layout shift.
    const observer = new ResizeObserver(() => measure());
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [measure]);

  return (
    <div ref={wrapperRef} className="relative">
      {children}

      {/* Overlay lives in the wrapper's coordinate space (absolute, not
          fixed) so the elements scroll with the page and the measured
          rectangles stay valid. It never intercepts pointer events.
          z-40 puts it above the situations section (z-30), which overlaps
          the hero — otherwise the icons would slide underneath their own
          landing pads on the way down. */}
      {pairs && distance > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-40">
          {pairs.map((pair, i) =>
            reduceMotion ? (
              // Reduced motion: they still need to exist, they just don't
              // travel. Parked at their hero positions, which is the
              // composition the section was designed around anyway.
              <div
                key={i}
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `translate(${pair.start.x}px, ${pair.start.y}px)` }}
              >
                {FLYERS[i]()}
              </div>
            ) : (
              <Flyer key={i} index={i} pair={pair} scrollY={scrollY} distance={distance} />
            )
          )}
        </div>
      )}
    </div>
  );
}

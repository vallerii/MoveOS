"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ChecklistArtifact, DocumentArtifact, StatArtifact, TimelineArtifact } from "../Artifacts";

/**
 * Scroll choreography for the top of the homepage.
 *
 * The four floating product artifacts don't belong to the hero or to the
 * situations section — they belong to the transition between them. As the
 * page scrolls, the hero headline recedes (scales back and fades, like a
 * layer dropping away from the camera) while the artifacts travel down the
 * page and settle into the section below: the checklist lands in the
 * "one platform" panel, the other three shrink onto the first three rows
 * of the situation list.
 *
 * Because the artifacts cross a section boundary, they can't live inside
 * either section's DOM. Instead this component wraps both, renders the
 * artifacts once in an absolutely-positioned overlay spanning the whole
 * region, and interpolates each one between two measured rectangles:
 *
 *   [data-fly-slot="n"]   — an invisible box in the hero marking where
 *                           artifact n starts
 *   [data-fly-target="n"] — the box in the section below where it lands
 *
 * Measuring real DOM rather than hardcoding offsets means the choreography
 * survives copy of any length in any of the three locales, and re-measures
 * on resize and once webfonts have settled (both change layout).
 */

// Index here is the slot/target index used by the data attributes below.
// Slot 0 is the checklist, which is the one that lands full-size in the
// "one platform" panel; 1–3 shrink onto the situation list rows.
const ARTIFACTS: (() => JSX.Element)[] = [
  () => <ChecklistArtifact />,
  () => <DocumentArtifact />,
  () => <StatArtifact value="46.2%" delta="↑ 5.5×" />,
  () => <TimelineArtifact />,
];

type Rect = { x: number; y: number; w: number };
type Pair = { start: Rect; end: Rect };

/**
 * One artifact in flight. Split into its own component because each needs
 * its own set of `useTransform` hooks, and hooks can't be called in a loop
 * over a variable-length array.
 */
function FlyingArtifact({
  index,
  pair,
  progress,
}: {
  index: number;
  pair: Pair;
  progress: MotionValue<number>;
}) {
  const Artifact = ARTIFACTS[index];

  // Each artifact departs on a slight stagger so the group reads as four
  // separate objects rather than one rigid formation. The last one is
  // still moving when the first has arrived.
  const from = index * 0.06;
  const to = 0.82 + index * 0.04;
  const span: [number, number] = [from, to];

  const x = useTransform(progress, span, [pair.start.x, pair.end.x]);
  const y = useTransform(progress, span, [pair.start.y, pair.end.y]);
  // Landing pads are much smaller than the artifacts themselves, so the
  // scale is derived from the measured widths rather than picked by eye.
  const scale = useTransform(progress, span, [1, pair.end.w / pair.start.w]);
  // A shallow arc — the artifacts lift very slightly before descending,
  // which keeps the motion from looking like a straight linear slide.
  const lift = useTransform(progress, [from, (from + to) / 2, to], [0, -18, 0]);
  const yArc = useTransform([y, lift], ([travel, arc]: number[]) => travel + arc);

  return (
    <motion.div className="absolute left-0 top-0 origin-top-left" style={{ x, y: yArc, scale }}>
      <Artifact />
    </motion.div>
  );
}

export default function HomeStage({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pairs, setPairs] = useState<Pair[] | null>(null);
  const reduceMotion = useReducedMotion();

  // Progress runs from "hero pinned at the top of the viewport" to "hero
  // fully scrolled past", i.e. one hero-height of scrolling. The section
  // below is on screen by the time it reaches 1, so the artifacts land
  // just as their destinations come into view.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // The overlay is only ever mounted at xl and up — below that the hero
    // has no room for artifacts and the slots aren't rendered at all.
    if (!window.matchMedia("(min-width: 1280px)").matches) {
      setPairs(null);
      return;
    }

    const base = wrapper.getBoundingClientRect();
    const next: Pair[] = [];

    for (let i = 0; i < ARTIFACTS.length; i += 1) {
      const slot = wrapper.querySelector<HTMLElement>(`[data-fly-slot="${i}"]`);
      const target = wrapper.querySelector<HTMLElement>(`[data-fly-target="${i}"]`);
      if (!slot || !target) {
        setPairs(null);
        return;
      }
      const s = slot.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      next.push({
        start: { x: s.left - base.left, y: s.top - base.top, w: s.width || 1 },
        end: { x: t.left - base.left, y: t.top - base.top, w: t.width || 1 },
      });
    }

    setPairs(next);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    measure();

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    // Webfonts land after first paint and reflow every headline, which
    // moves both the slots and the targets. Re-measure once they're in.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    // The situations panel below contains an auto-advancing carousel whose
    // content height varies per quote; observing the wrapper catches that
    // and any other late layout shift.
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
          fixed) so the artifacts scroll with the page and the measured
          rectangles stay valid. It never intercepts pointer events. */}
      {pairs && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
          {pairs.map((pair, i) =>
            reduceMotion ? (
              // Reduced motion: the artifacts still need to exist, they
              // just don't travel. They stay parked at their hero
              // positions, which is the composition the section was
              // designed around in the first place.
              <div
                key={i}
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `translate(${pair.start.x}px, ${pair.start.y}px)` }}
              >
                {ARTIFACTS[i]()}
              </div>
            ) : (
              <FlyingArtifact key={i} index={i} pair={pair} progress={scrollYProgress} />
            )
          )}
        </div>
      )}
    </div>
  );
}

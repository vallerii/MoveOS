"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Fraction of a viewport of scrolling over which the fade completes. */
  distance?: number;
  children: ReactNode;
};

/**
 * Fades its children out as the page scrolls — opacity only, no movement or
 * scaling.
 *
 * Used for the hero's badge row. It sits at the foot of the pinned hero,
 * which is exactly where the next section arrives first, so without this it
 * would still be sitting there at full strength while the incoming panel
 * slides across it. The headline above uses RecedingTitle instead, which
 * also scales and lifts; here that would be noise, since the row is
 * secondary metadata and should simply get out of the way.
 *
 * Driven by raw scroll position rather than `useScroll({ target })`, for the
 * same reason as RecedingTitle: from `pin` up the hero is `position: sticky`,
 * and a pinned element's rect stops changing, so element-relative progress
 * never advances.
 */
/** Matches the `pin` screen in tailwind.config.ts. */
const PIN_QUERY = "(min-width: 1280px) and (min-height: 780px)";

export default function FadeOnScroll({ distance = 0.35, children }: Props) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Fallback keeps the range sane during SSR and first paint, before the
  // real viewport height is known.
  const [span, setSpan] = useState(800);
  // The fade is measured from the top of the page, which only makes sense
  // while the hero is pinned — then this row is on screen from the start and
  // the fade is what clears it out of the incoming section's way. Without
  // the hero pinned the row sits below the fold, and fading against absolute
  // scroll would have it dissolved before the reader ever reaches it.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const read = () => {
      setSpan(window.innerHeight || 800);
      setPinned(mq.matches);
    };
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const opacity = useTransform(scrollY, [0, span * distance], [1, 0], { clamp: true });

  if (reduceMotion || !pinned) {
    return <div>{children}</div>;
  }

  return <motion.div style={{ opacity }}>{children}</motion.div>;
}

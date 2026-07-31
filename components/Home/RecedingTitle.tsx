"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Pulls the hero headline block away from the camera as the page scrolls.
 *
 * Paired with the flight in HomeStage: the icons and the checklist card move
 * forward into the next section while the type they sat on drops back and
 * dissolves, so the two layers separate instead of scrolling away together.
 *
 * IMPORTANT — the measured element and the animated element must be
 * different nodes. `useScroll({ target })` derives progress from the
 * target's `getBoundingClientRect()`, and that rect includes transforms. If
 * the same node is both measured and scaled, every progress update changes
 * the rect, which changes progress, which changes the transform: a feedback
 * loop that pegs the main thread and eventually locks the tab. So the outer
 * div is the untransformed ruler, and the inner motion.div is what moves.
 *
 * The fade finishes well before the block leaves the viewport (opacity is
 * gone by 55% of the range) — otherwise the headline is still faintly
 * legible while the section below is already reading, which looks like a
 * rendering fault rather than an effect.
 */
export default function RecedingTitle({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, -50]);

  if (reduceMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <div ref={ref}>
      <motion.div style={{ scale, opacity, y }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}

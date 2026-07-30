"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Pulls the hero headline block away from the camera as the page scrolls.
 *
 * Paired with the artifact flight in HomeStage: the artifacts move forward
 * into the next section while the type it sat on drops back and dissolves,
 * so the two layers separate instead of scrolling away together.
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
    <motion.div ref={ref} style={{ scale, opacity, y }} className="origin-top">
      {children}
    </motion.div>
  );
}

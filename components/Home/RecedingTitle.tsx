"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Pulls the hero headline block away from the camera as the page scrolls:
 * it shrinks, drifts up and fades out while the section below climbs over
 * the pinned hero.
 *
 * Driven by raw scroll position, NOT by `useScroll({ target })`.
 * Element-relative progress is derived from the target's
 * getBoundingClientRect, and from xl up the hero is `position: sticky` — a
 * pinned element's rect stops changing, so element-relative progress never
 * advances and the headline just sits there. Scroll pixels keep moving
 * whatever the layout does.
 *
 * The span is one viewport, which is exactly the pinned hero's height, so
 * the headline has fully dissolved by the time the next section has covered
 * it. The fade finishes a little before the movement does — otherwise the
 * type is still faintly legible under the incoming block, which reads as a
 * rendering fault rather than an effect.
 */
export default function RecedingTitle({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Fallback keeps the ranges sane during SSR and first paint, before the
  // real viewport height is known.
  const [span, setSpan] = useState(800);

  useEffect(() => {
    const read = () => setSpan(window.innerHeight || 800);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);

  const scale = useTransform(scrollY, [0, span * 0.6], [1, 0.88], { clamp: true });
  const opacity = useTransform(scrollY, [0, span * 0.5], [1, 0], { clamp: true });
  const y = useTransform(scrollY, [0, span * 0.6], [0, -70], { clamp: true });

  if (reduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div style={{ scale, opacity, y }} className="origin-top will-change-transform">
      {children}
    </motion.div>
  );
}

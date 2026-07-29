"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  // "up" (default) slides in from below; "right" slides in from the right —
  // used for the DidYouKnow cards.
  direction?: "up" | "right";
};

const hiddenClasses = {
  up: "translate-y-6 opacity-0",
  right: "translate-x-6 opacity-0",
};

const visibleClasses = {
  up: "translate-y-0 opacity-100",
  right: "translate-x-0 opacity-100",
};

/**
 * Lightweight scroll-reveal wrapper — no animation library, just an
 * IntersectionObserver + CSS transitions. Fades and slides children in
 * the first time they enter the viewport.
 */
export default function Reveal({ children, delay = 0, className = "", direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        visible ? visibleClasses[direction] : hiddenClasses[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}

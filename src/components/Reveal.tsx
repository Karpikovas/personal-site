"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
};

export const Reveal = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.02,
  rootMargin = "0px 0px -8% 0px",
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.classList.add("reveal-ready");

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return;
    }

    // Fallback for mobile browsers where observer callbacks may be delayed or skipped.
    const fallbackTimer = window.setTimeout(() => {
      node.classList.add("is-visible");
    }, 1800);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.clearTimeout(fallbackTimer);
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      {
        root: null,
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
};

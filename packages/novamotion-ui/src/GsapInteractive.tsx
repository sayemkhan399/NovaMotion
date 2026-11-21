"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface GsapInteractiveProps {
  as?: "article" | "div";
  children: React.ReactNode;
  className?: string;
}

export function GsapInteractive({
  as = "div",
  children,
  className = "",
}: GsapInteractiveProps) {
  const elementRef = useRef<HTMLElement | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const element = elementRef.current;
      if (!element || !contextSafe) return;

      const media = gsap.matchMedia(element);
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const animateHover = contextSafe(() =>
          gsap.to(element, {
            y: -4,
            scale: 1.01,
            boxShadow: "0 16px 36px rgba(0, 0, 0, 0.1)",
            duration: 0.24,
            ease: "power2.out",
            overwrite: "auto",
          }),
        );
        const animateRest = contextSafe(() =>
          gsap.to(element, {
            y: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          }),
        );
        const animatePress = contextSafe(() =>
          gsap.to(element, {
            y: 0,
            scale: 0.985,
            duration: 0.1,
            ease: "power2.out",
            overwrite: "auto",
          }),
        );
        const animateRelease = contextSafe(() =>
          element.matches(":hover") ? animateHover() : animateRest(),
        );
        const handleFocusOut = (event: FocusEvent) => {
          if (event.relatedTarget && element.contains(event.relatedTarget as Node)) return;
          animateRest();
        };

        element.addEventListener("pointerenter", animateHover);
        element.addEventListener("pointerleave", animateRest);
        element.addEventListener("pointerdown", animatePress);
        element.addEventListener("pointerup", animateRelease);
        element.addEventListener("pointercancel", animateRest);
        element.addEventListener("focusin", animateHover);
        element.addEventListener("focusout", handleFocusOut);

        return () => {
          element.removeEventListener("pointerenter", animateHover);
          element.removeEventListener("pointerleave", animateRest);
          element.removeEventListener("pointerdown", animatePress);
          element.removeEventListener("pointerup", animateRelease);
          element.removeEventListener("pointercancel", animateRest);
          element.removeEventListener("focusin", animateHover);
          element.removeEventListener("focusout", handleFocusOut);
        };
      });

      return () => media.revert();
    },
    { scope: elementRef },
  );

  const setElementRef = (element: HTMLElement | null) => {
    elementRef.current = element;
  };

  return as === "article" ? (
    <article ref={setElementRef} className={className}>
      {children}
    </article>
  ) : (
    <div ref={setElementRef} className={className}>
      {children}
    </div>
  );
}

import React, { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Star, X } from "lucide-react";

gsap.registerPlugin(useGSAP);

const DEFAULT_FEATURES = [
  "Unlimited projects and collaborators",
  "Priority support with 24h response",
  "Advanced analytics and exports",
] as const;

export type ProUpgradeCardProps = {
  badge?: string;
  title?: string;
  description?: string;
  features?: readonly string[];
  upgradeLabel?: string;
  compareLabel?: string;
  onUpgrade?: () => void;
  onCompare?: () => void;
  className?: string;
};

export function ProUpgradeCard({
  badge = "Recommended",
  title = "Upgrade to Pro",
  description = "Unlock team workflows and insights built for growing products.",
  features = DEFAULT_FEATURES,
  upgradeLabel = "Upgrade now",
  compareLabel = "Compare plans",
  onUpgrade,
  onCompare,
  className = "",
}: ProUpgradeCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const comparisonId = useId();
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  useEffect(() => {
    if (!isCompareOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCompareOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCompareOpen]);

  const openComparison = () => {
    setIsCompareOpen(true);
    onCompare?.();
  };

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      gsap.fromTo(
        "[data-pro-feature]",
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "all",
        },
      );
      gsap.to("[data-pro-glow]", {
        x: 8,
        y: -6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: cardRef, dependencies: [shouldReduceMotion], revertOnUpdate: true },
  );

  return (
    <article
      ref={cardRef}
      className={`relative isolate w-full max-w-[420px] overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-5 text-[#18181B] shadow-[0_16px_42px_rgba(24,24,27,0.08)] sm:p-6 ${className}`}
    >
      <div
        data-pro-glow
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 -z-10 size-40 rounded-full bg-[#FFDD00]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-8 -z-10 size-28 rounded-full bg-[#FFDD00]/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-[#FFFDF2] via-white to-[#F4F4F5]"
      />

      <header className="flex flex-col gap-3">
        {badge && (
          <span className="w-fit rounded-full bg-[#FFDD00]/20 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#746500]">
            {badge}
          </span>
        )}
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#FFDD00]/20 text-[#8A7100]">
            <Star aria-hidden="true" className="size-5" fill="currentColor" />
          </span>
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold tracking-[-0.03em]">
              {title}
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-[#71717A]">
              {description}
            </p>
          </div>
        </div>
      </header>

      <ul className="my-5 flex flex-col gap-3">
        {features.map((feature) => (
          <li
            key={feature}
            data-pro-feature
            className="flex items-center gap-2.5 text-[11px] text-[#52525B]"
          >
            <Check
              aria-hidden="true"
              className="size-4 shrink-0 text-[#9A8000]"
              strokeWidth={2.2}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <footer className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onUpgrade}
          className="w-full rounded-xl bg-[#18181B] px-4 py-2.5 text-[11px] font-semibold text-white shadow-[0_5px_14px_rgba(24,24,27,0.16)] transition-all hover:-translate-y-0.5 hover:bg-[#27272A] hover:shadow-[0_8px_20px_rgba(24,24,27,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
        >
          {upgradeLabel}
        </button>
        <button
          type="button"
          onClick={openComparison}
          className="w-full rounded-xl border border-black/[0.07] bg-white/80 px-4 py-2.5 text-[11px] font-semibold text-[#3F3F46] transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
        >
          {compareLabel}
        </button>
      </footer>
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isCompareOpen && (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/45 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setIsCompareOpen(false);
              }
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${comparisonId}-title`}
              aria-describedby={`${comparisonId}-description`}
              className="relative my-auto w-full max-w-[680px] overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-5 text-[#18181B] shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-7"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8, scale: shouldReduceMotion ? 1 : 0.99 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close plan comparison"
                autoFocus
                onClick={() => setIsCompareOpen(false)}
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#F4F4F5] text-[#52525B] transition-colors hover:bg-[#E4E4E7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
              >
                <X aria-hidden="true" className="size-4" />
              </button>

              <div className="pr-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFDD00]/20 px-2.5 py-1 text-[10px] font-semibold text-[#746500]">
                  <Star aria-hidden="true" className="size-3" fill="currentColor" />
                  Choose your plan
                </span>
                <h3
                  id={`${comparisonId}-title`}
                  className="mt-3 text-xl font-semibold tracking-[-0.04em] sm:text-2xl"
                >
                  Compare plans
                </h3>
                <p
                  id={`${comparisonId}-description`}
                  className="mt-1 text-xs leading-relaxed text-[#71717A]"
                >
                  See what is included in Free and Pro before you decide.
                </p>
              </div>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-black/[0.07]">
                <table className="w-full min-w-[440px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-[#FAFAFA]">
                      <th scope="col" className="px-4 py-3 font-medium text-[#71717A]">
                        Features
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold text-[#52525B]">
                        Free
                      </th>
                      <th scope="col" className="bg-[#FFDD00]/10 px-4 py-3 font-semibold text-[#18181B]">
                        Pro
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Projects and collaborators", "Limited", "Unlimited"],
                      ["Analytics and exports", "Basic", "Advanced"],
                      ["Support", "Community", "Priority · 24h response"],
                    ].map(([feature, free, pro]) => (
                      <tr key={feature} className="border-t border-black/[0.06]">
                        <th scope="row" className="px-4 py-3 font-medium text-[#52525B]">
                          {feature}
                        </th>
                        <td className="px-4 py-3 text-[#71717A]">{free}</td>
                        <td className="bg-[#FFDD00]/[0.06] px-4 py-3 font-medium text-[#3F3F46]">
                          <span className="inline-flex items-center gap-1.5">
                            <Check aria-hidden="true" className="size-3.5 text-[#8A7100]" />
                            {pro}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsCompareOpen(false)}
                  className="rounded-xl border border-black/[0.07] bg-white px-4 py-2.5 text-xs font-semibold text-[#3F3F46] transition-colors hover:bg-[#F4F4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
                >
                  Maybe later
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onUpgrade?.();
                    setIsCompareOpen(false);
                  }}
                  className="rounded-xl bg-[#18181B] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#27272A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
                >
                  Upgrade to Pro
                </button>
              </div>
            </motion.section>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </article>
  );
}

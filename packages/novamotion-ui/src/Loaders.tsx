import React from "react";

export type SkeletonLoaderProps = React.HTMLAttributes<HTMLDivElement>;

export function SkeletonLoader({
  className = "",
  ...props
}: SkeletonLoaderProps) {
  return (
    <div
      role="status"
      aria-label="Loading content"
      aria-busy="true"
      className={`w-full max-w-[360px] rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="motion-safe:animate-pulse space-y-5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-[#E4E4E7]" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-2/5 rounded-full bg-[#E4E4E7]" />
            <div className="h-2.5 w-1/4 rounded-full bg-[#E4E4E7]" />
          </div>
        </div>
        <div className="aspect-[16/9] rounded-xl bg-[#E4E4E7]" />
        <div className="space-y-2.5">
          <div className="h-3 w-full rounded-full bg-[#E4E4E7]" />
          <div className="h-3 w-4/5 rounded-full bg-[#E4E4E7]" />
        </div>
        <div className="h-9 w-1/3 rounded-lg bg-[#E4E4E7]" />
      </div>
    </div>
  );
}

export type CanvasShadowLoaderProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

const CANVAS_SHADOW_STYLES = `
@keyframes novamotion-canvas-shadow-a {
  0%, 100% { transform: translate3d(-12px, -8px, 0) scale(.92); }
  50% { transform: translate3d(22px, 18px, 0) scale(1.16); }
}
@keyframes novamotion-canvas-shadow-b {
  0%, 100% { transform: translate3d(16px, 12px, 0) scale(1.08); }
  50% { transform: translate3d(-20px, -14px, 0) scale(.9); }
}
@media (prefers-reduced-motion: reduce) {
  .novamotion-canvas-shadow { animation: none !important; }
}
`;

export function CanvasShadowLoader({
  label = "Preparing your canvas",
  className = "",
  ...props
}: CanvasShadowLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      aria-busy="true"
      className={`relative isolate flex min-h-[220px] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] ${className}`}
      {...props}
    >
      <style>{CANVAS_SHADOW_STYLES}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="novamotion-canvas-shadow absolute -left-8 top-2 size-36 rounded-full bg-[#7C3AED]/25 blur-3xl" style={{ animation: "novamotion-canvas-shadow-a 5s ease-in-out infinite" }} />
        <span className="novamotion-canvas-shadow absolute -right-8 top-12 size-40 rounded-full bg-[#38BDF8]/25 blur-3xl" style={{ animation: "novamotion-canvas-shadow-b 6s ease-in-out infinite" }} />
        <span className="novamotion-canvas-shadow absolute bottom-[-4rem] left-1/3 size-36 rounded-full bg-[#F472B6]/20 blur-3xl" style={{ animation: "novamotion-canvas-shadow-a 7s ease-in-out infinite reverse" }} />
      </div>
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="grid size-14 place-items-center rounded-2xl border border-black/[0.06] bg-white/80 text-[#18181B] shadow-[0_8px_24px_rgba(24,24,27,0.08)] backdrop-blur">
          <svg
            aria-hidden="true"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5z" />
            <path d="m7 16 3.5-4 2.5 2 2-2.5L18 15" />
            <path d="m8 8 .5.5L9 8l-.5-.5z" />
          </svg>
        </div>
        <p className="mt-4 text-sm font-semibold text-[#18181B]">{label}</p>
        <p className="mt-1 text-xs text-[#71717A]">Setting up your workspace</p>
        <div aria-hidden="true" className="mt-4 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#7C3AED] motion-safe:animate-pulse" />
          <span className="size-1.5 rounded-full bg-[#38BDF8] motion-safe:animate-pulse [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-[#F472B6] motion-safe:animate-pulse [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

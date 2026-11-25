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


export type DualRingLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const DUAL_RING_STYLES = `
@keyframes novamotion-dual-ring { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .novamotion-dual-ring { animation: none !important; } }
`;
export function DualRingLoader({ className = "", ...props }: DualRingLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`relative size-14 ${className}`} {...props}>
      <style>{DUAL_RING_STYLES}</style>
      <span className="novamotion-dual-ring absolute inset-0 rounded-full border-[4px] border-[#E4E4E7] border-t-[#7C3AED] border-b-[#7C3AED]" style={{ animation: "novamotion-dual-ring 1.1s linear infinite" }} />
      <span className="novamotion-dual-ring absolute inset-[9px] rounded-full border-[4px] border-[#E4E4E7] border-l-[#F472B6] border-r-[#F472B6]" style={{ animation: "novamotion-dual-ring 0.85s linear infinite reverse" }} />
    </div>
  );
}

export type WaveDotsLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const WAVE_DOTS_STYLES = `
@keyframes novamotion-wave-dot { 0%, 60%, 100% { transform: translateY(0); opacity: .45; } 30% { transform: translateY(-10px); opacity: 1; } }
@media (prefers-reduced-motion: reduce) { .novamotion-wave-dot { animation: none !important; opacity: .75; } }
`;
export function WaveDotsLoader({ className = "", ...props }: WaveDotsLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`flex items-end gap-2 ${className}`} {...props}>
      <style>{WAVE_DOTS_STYLES}</style>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="novamotion-wave-dot size-3 rounded-full bg-[#7C3AED]" style={{ animation: `novamotion-wave-dot 0.9s ease-in-out ${i * 0.12}s infinite` }} />
      ))}
    </div>
  );
}

export type HourglassLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const HOURGLASS_STYLES = `
@keyframes novamotion-hourglass { 0% { transform: rotate(0deg); } 45%, 55% { transform: rotate(180deg); } 95%, 100% { transform: rotate(360deg); } }
@keyframes novamotion-hourglass-sand { 0%, 45% { transform: scaleY(1); } 55%, 95% { transform: scaleY(0.2); } 100% { transform: scaleY(1); } }
@media (prefers-reduced-motion: reduce) { .novamotion-hourglass, .novamotion-hourglass-sand { animation: none !important; } }
`;
export function HourglassLoader({ className = "", ...props }: HourglassLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`grid place-items-center ${className}`} {...props}>
      <style>{HOURGLASS_STYLES}</style>
      <div className="novamotion-hourglass relative h-14 w-10" style={{ animation: "novamotion-hourglass 2s ease-in-out infinite" }}>
        <div className="absolute inset-x-0 top-0 h-1.5 rounded-full bg-[#18181B]" />
        <div className="absolute inset-x-0 bottom-0 h-1.5 rounded-full bg-[#18181B]" />
        <div className="absolute left-1/2 top-1.5 h-5 w-8 -translate-x-1/2 rounded-b-[10px] border-x-2 border-b-2 border-[#18181B]/20 bg-[#F4F4F5] overflow-hidden">
          <div className="novamotion-hourglass-sand absolute inset-x-1 top-0 bottom-1 origin-top rounded-b-md bg-gradient-to-b from-[#F59E0B] to-[#F97316]" style={{ animation: "novamotion-hourglass-sand 2s ease-in-out infinite" }} />
        </div>
        <div className="absolute left-1/2 bottom-1.5 h-5 w-8 -translate-x-1/2 rounded-t-[10px] border-x-2 border-t-2 border-[#18181B]/20 bg-[#F4F4F5] overflow-hidden">
          <div className="novamotion-hourglass-sand absolute inset-x-1 bottom-0 top-1 origin-bottom rounded-t-md bg-gradient-to-t from-[#F59E0B] to-[#F97316]" style={{ animation: "novamotion-hourglass-sand 2s ease-in-out infinite reverse" }} />
        </div>
      </div>
    </div>
  );
}

export type ProgressRingLoaderProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  label?: string;
};
export function ProgressRingLoader({ value = 72, label = "Progress", className = "", ...props }: ProgressRingLoaderProps) {
  const progress = Math.max(0, Math.min(100, value));
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <div role="status" aria-label={`${label} ${progress}%`} aria-busy={progress < 100} className={`relative grid size-16 place-items-center ${className}`} {...props}>
      <svg viewBox="0 0 56 56" className="size-16 -rotate-90">
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#E4E4E7" strokeWidth="6" />
        <circle cx="28" cy="28" r={radius} fill="none" stroke="#7C3AED" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-[stroke-dashoffset] duration-500 ease-out" />
      </svg>
      <span className="absolute text-[11px] font-semibold text-[#18181B] tabular-nums">{progress}%</span>
    </div>
  );
}

export type StripedBarLoaderProps = React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  label?: string;
};
const STRIPED_BAR_STYLES = `
@keyframes novamotion-striped-bar { from { background-position: 0 0; } to { background-position: 32px 0; } }
@media (prefers-reduced-motion: reduce) { .novamotion-striped-bar { animation: none !important; } }
`;
export function StripedBarLoader({ value = 64, label = "Loading", className = "", ...props }: StripedBarLoaderProps) {
  const progress = Math.max(0, Math.min(100, value));
  return (
    <div role="status" aria-label={`${label} ${progress}%`} aria-busy={progress < 100} className={`w-full max-w-[280px] ${className}`} {...props}>
      <style>{STRIPED_BAR_STYLES}</style>
      <div className="mb-2 flex items-center justify-between text-[12px] font-medium text-[#52525B]">
        <span>{label}</span><span className="tabular-nums">{progress}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#E4E4E7]">
        <div
          className="novamotion-striped-bar h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundImage: "linear-gradient(45deg, rgba(255,255,255,.28) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.28) 50%, rgba(255,255,255,.28) 75%, transparent 75%, transparent)",
            backgroundSize: "32px 32px",
            backgroundColor: "#7C3AED",
            animation: "novamotion-striped-bar 0.8s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

export type HeartbeatLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const HEARTBEAT_STYLES = `
@keyframes novamotion-heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.18); } 28% { transform: scale(1); } 42% { transform: scale(1.12); } 70% { transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { .novamotion-heartbeat { animation: none !important; } }
`;
export function HeartbeatLoader({ className = "", ...props }: HeartbeatLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`grid place-items-center ${className}`} {...props}>
      <style>{HEARTBEAT_STYLES}</style>
      <div className="novamotion-heartbeat grid size-14 place-items-center rounded-full bg-[#FEE2E2]" style={{ animation: "novamotion-heartbeat 1.2s ease-in-out infinite" }}>
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="#EF4444">
          <path d="M12 21s-6.716-4.35-9.193-7.032C.82 11.8.967 8.39 3.172 6.5 5.1 4.85 7.88 5.13 9.5 6.86L12 9.55l2.5-2.69c1.62-1.73 4.4-2.01 6.328-.36 2.205 1.89 2.352 5.3.365 7.468C18.716 16.65 12 21 12 21Z" />
        </svg>
      </div>
    </div>
  );
}

export type SquareGridLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const SQUARE_GRID_STYLES = `
@keyframes novamotion-square-grid { 0%, 70%, 100% { transform: scale3d(1,1,1); opacity: 1; } 35% { transform: scale3d(0.2,0.2,1); opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .novamotion-square-grid { animation: none !important; } }
`;
export function SquareGridLoader({ className = "", ...props }: SquareGridLoaderProps) {
  const delays = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`grid grid-cols-3 gap-1.5 ${className}`} {...props}>
      <style>{SQUARE_GRID_STYLES}</style>
      {delays.map((delay, i) => (
        <span key={i} className="novamotion-square-grid size-3.5 rounded-[4px] bg-[#7C3AED]" style={{ animation: `novamotion-square-grid 1.3s ease-in-out ${delay}s infinite` }} />
      ))}
    </div>
  );
}

export type NewtonCradleLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const NEWTON_CRADLE_STYLES = `
@keyframes novamotion-cradle-left { 0% { transform: rotate(0deg); } 25% { transform: rotate(35deg); } 50%, 100% { transform: rotate(0deg); } }
@keyframes novamotion-cradle-right { 0%, 50% { transform: rotate(0deg); } 75% { transform: rotate(-35deg); } 100% { transform: rotate(0deg); } }
@media (prefers-reduced-motion: reduce) { .novamotion-cradle-left, .novamotion-cradle-right { animation: none !important; } }
`;
export function NewtonCradleLoader({ className = "", ...props }: NewtonCradleLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`flex items-start gap-0.5 ${className}`} {...props}>
      <style>{NEWTON_CRADLE_STYLES}</style>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={i === 0 ? "novamotion-cradle-left origin-top" : i === 4 ? "novamotion-cradle-right origin-top" : ""}
          style={i === 0 ? { animation: "novamotion-cradle-left 1.2s ease-in-out infinite" } : i === 4 ? { animation: "novamotion-cradle-right 1.2s ease-in-out infinite" } : undefined}
        >
          <div className="mx-auto h-10 w-px bg-[#A1A1AA]" />
          <div className="size-4 rounded-full bg-gradient-to-b from-[#52525B] to-[#18181B] shadow-sm" />
        </div>
      ))}
    </div>
  );
}

export type ClockSpinLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const CLOCK_SPIN_STYLES = `
@keyframes novamotion-clock-spin { to { transform: rotate(360deg); } }
@keyframes novamotion-clock-spin-slow { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .novamotion-clock-hand, .novamotion-clock-hand-slow { animation: none !important; } }
`;
export function ClockSpinLoader({ className = "", ...props }: ClockSpinLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`relative size-14 rounded-full border-[3px] border-[#18181B]/15 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] ${className}`} {...props}>
      <style>{CLOCK_SPIN_STYLES}</style>
      <span className="absolute left-1/2 top-1.5 size-1 -translate-x-1/2 rounded-full bg-[#D4D4D8]" />
      <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#D4D4D8]" />
      <span className="absolute left-1.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#D4D4D8]" />
      <span className="absolute right-1.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#D4D4D8]" />
      <span className="novamotion-clock-hand-slow absolute left-1/2 top-1/2 h-4 w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-[#71717A]" style={{ animation: "novamotion-clock-spin-slow 6s linear infinite" }} />
      <span className="novamotion-clock-hand absolute left-1/2 top-1/2 h-5 w-[2px] origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-[#7C3AED]" style={{ animation: "novamotion-clock-spin 1s linear infinite" }} />
      <span className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#18181B]" />
    </div>
  );
}

export type TwinSquaresLoaderProps = React.HTMLAttributes<HTMLDivElement>;
const TWIN_SQUARES_STYLES = `
@keyframes novamotion-twin-square-a { 0%, 100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(18px,0) rotate(90deg); } 50% { transform: translate(18px,18px) rotate(180deg); } 75% { transform: translate(0,18px) rotate(270deg); } }
@keyframes novamotion-twin-square-b { 0%, 100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(-18px,0) rotate(-90deg); } 50% { transform: translate(-18px,-18px) rotate(-180deg); } 75% { transform: translate(0,-18px) rotate(-270deg); } }
@media (prefers-reduced-motion: reduce) { .novamotion-twin-square-a, .novamotion-twin-square-b { animation: none !important; } }
`;
export function TwinSquaresLoader({ className = "", ...props }: TwinSquaresLoaderProps) {
  return (
    <div role="status" aria-label="Loading" aria-busy="true" className={`relative size-14 ${className}`} {...props}>
      <style>{TWIN_SQUARES_STYLES}</style>
      <span className="novamotion-twin-square-a absolute left-1 top-1 size-5 rounded-[6px] bg-[#7C3AED]" style={{ animation: "novamotion-twin-square-a 1.8s ease-in-out infinite" }} />
      <span className="novamotion-twin-square-b absolute bottom-1 right-1 size-5 rounded-[6px] bg-[#F472B6]" style={{ animation: "novamotion-twin-square-b 1.8s ease-in-out infinite" }} />
    </div>
  );
}

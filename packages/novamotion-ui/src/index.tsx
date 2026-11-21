import React, {
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent,
} from "react";

export { DuoFlip } from "./DuoFlip.js";
export type { DuoFlipImage, DuoFlipProps } from "./DuoFlip.js";
export { MasonryGallery, ThumbnailCarousel } from "./Galleries.js";
export type { GalleryImagesProps } from "./Galleries.js";
export { CourseCard } from "./CourseCard.js";
export type { CourseCardProps } from "./CourseCard.js";
export { TabBar } from "./TabBar.js";
export type { TabBarProps, TabBarVariant, TabIcon, TabItem } from "./TabBar.js";
export { AuthCard } from "./AuthCard.js";
export type { AuthCardProps, AuthDetails, AuthMode, AuthProvider } from "./AuthCard.js";
export { Social } from "./Social.js";
export type { SocialProps } from "./Social.js";
export type { SocialProvider } from "./SocialProviderIcon.js";
export { BookingCard } from "./BookingCard.js";
export type { BookingCardProps, BookingSlot } from "./BookingCard.js";
export { GsapInteractive } from "./GsapInteractive.js";
export { MonthCalendar } from "./MonthCalendar.js";
export type { MonthCalendarProps } from "./MonthCalendar.js";
export { DeviceFrame } from "./DeviceFrame.js";
export type { DeviceFrameKind, DeviceFrameProps } from "./DeviceFrame.js";
export { BarChart, DonutChart, LineChart } from "./Charts.js";
export type { ChartPoint, ChartProps } from "./Charts.js";
export { RatingInput, Toast } from "./Feedback.js";
export type { RatingInputProps, ToastProps } from "./Feedback.js";

export type MotionButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const focusStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7C3AED] disabled:pointer-events-none disabled:opacity-50";

export function AnimatedButton({
  children = "Animated",
  className = "",
  ...props
}: MotionButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full bg-[#18181B] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(24,24,27,0.15)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-[#27272A] hover:shadow-[0_10px_24px_rgba(24,24,27,0.22)] active:translate-y-0 active:scale-95 ${focusStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function MagneticButton({
  children = "Magnetic",
  className = "",
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: MotionButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 14,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 14,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    setOffset({ x: 0, y: 0 });
    onPointerLeave?.(event);
  };

  return (
    <button
      type="button"
      className={`rounded-full bg-[#18181B] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(24,24,27,0.2)] transition-[transform,background-color] duration-200 ease-out hover:bg-[#27272A] ${focusStyles} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export function GradientButton({
  children = "Explore now",
  className = "",
  ...props
}: MotionButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full bg-gradient-to-r from-[#7C3AED] via-[#DB2777] to-[#F97316] bg-[length:200%_200%] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(219,39,119,0.22)] transition-all duration-300 hover:bg-right-bottom hover:shadow-[0_10px_26px_rgba(219,39,119,0.32)] active:scale-95 ${focusStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function GlowButton({
  children = "Get started",
  className = "",
  ...props
}: MotionButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border border-[#A78BFA] bg-[#18181B] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_0_14px_rgba(139,92,246,0.32)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(139,92,246,0.72)] active:scale-95 ${focusStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ShimmerButton({
  children = "Shimmer",
  className = "",
  ...props
}: MotionButtonProps) {
  return (
    <button
      type="button"
      className={`group relative overflow-hidden rounded-full bg-[#18181B] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_4px_12px_rgba(24,24,27,0.15)] transition-transform active:scale-95 ${focusStyles} ${className}`}
      {...props}
    >
      <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[500%]" />
      <span className="relative">{children}</span>
    </button>
  );
}

type Ripple = { x: number; y: number; id: number };

export function RippleButton({
  children = "Press me",
  className = "",
  onPointerDown,
  ...props
}: MotionButtonProps) {
  const [ripple, setRipple] = useState<Ripple | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setRipple((previous) => ({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      id: (previous?.id ?? 0) + 1,
    }));
    onPointerDown?.(event);
  };

  return (
    <button
      type="button"
      className={`relative isolate overflow-hidden rounded-full bg-[#2563EB] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_5px_14px_rgba(37,99,235,0.24)] transition-transform active:scale-95 ${focusStyles} ${className}`}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {ripple && (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-0 size-3 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/50"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function LiquidGlassButton({
  children = "Explore",
  className = "",
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: MotionButtonProps) {
  const [highlight, setHighlight] = useState({ x: 50, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setHighlight({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLButtonElement>) => {
    setHighlight({ x: 50, y: 0 });
    onPointerLeave?.(event);
  };

  return (
    <button
      type="button"
      className={`group relative isolate overflow-hidden rounded-full border border-white/70 bg-white/25 px-7 py-3.5 text-[13px] font-semibold text-[#18181B] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_24px_rgba(31,41,55,0.16)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.95),0_12px_30px_rgba(31,41,55,0.2)] active:translate-y-0 active:scale-[0.98] ${focusStyles} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        background: `radial-gradient(120px circle at ${highlight.x}% ${highlight.y}%, rgba(255,255,255,0.9), transparent 75%), rgba(255,255,255,0.28)`,
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-px rounded-full bg-gradient-to-b from-white/70 via-white/15 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="relative z-10 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-[#7C3AED] shadow-[0_0_8px_rgba(124,58,237,0.65)]"
        />
        {children}
      </span>
    </button>
  );
}

export type MotionCardProps = React.HTMLAttributes<HTMLDivElement>;

export function SpotlightCard({
  children = "Spotlight",
  className = "",
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: MotionCardProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    setPosition(null);
    onPointerLeave?.(event);
  };

  return (
    <div
      className={`flex min-h-[190px] w-full max-w-[300px] items-end rounded-[24px] border border-white/10 p-6 text-white shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.28)] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        background: position
          ? `radial-gradient(280px circle at ${position.x}px ${position.y}px, rgba(129,140,248,0.45), transparent 70%), linear-gradient(135deg, #18181B, #312E81)`
          : "linear-gradient(135deg, #18181B, #312E81)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function TiltCard({
  children = "Tilt",
  className = "",
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: MotionCardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setRotation({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -12,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 12,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    setRotation({ x: 0, y: 0 });
    onPointerLeave?.(event);
  };

  return (
    <div
      className={`flex min-h-[190px] w-full max-w-[300px] items-end rounded-[24px] border border-white/70 bg-gradient-to-br from-[#FDE68A] via-[#FDBA74] to-[#F472B6] p-6 text-[#18181B] shadow-[0_18px_40px_rgba(244,114,182,0.2)] transition-transform duration-200 ease-out ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        ...style,
        transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCard({
  children = "Glass",
  className = "",
  ...props
}: MotionCardProps) {
  return (
    <div
      className={`flex min-h-[190px] w-full max-w-[300px] items-end rounded-[24px] border border-white/70 bg-white/65 p-6 text-[#18181B] shadow-[0_18px_50px_rgba(24,24,27,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export type FlipCardProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  children?: React.ReactNode;
  backFace?: React.ReactNode;
};

export function FlipCard({
  children = "Front",
  backFace = "Back",
  className = "",
  onClick,
  ...props
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFlipped((current) => !current);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      aria-label={flipped ? "Show front of card" : "Show back of card"}
      className={`relative h-[190px] w-full max-w-[300px] rounded-[24px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 ${className}`}
      onClick={handleClick}
      {...props}
    >
      <span
        className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: `rotateY(${flipped ? 180 : 0}deg)` }}
      >
        <span className="absolute inset-0 flex items-end rounded-[24px] bg-[#18181B] p-6 text-white shadow-lg [backface-visibility:hidden]">
          {children}
        </span>
        <span
          className="absolute inset-0 flex items-end rounded-[24px] bg-gradient-to-br from-[#7C3AED] to-[#DB2777] p-6 text-white shadow-lg [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backFace}
        </span>
      </span>
    </button>
  );
}

export function GradientCard({
  children = "Gradient",
  className = "",
  ...props
}: MotionCardProps) {
  return (
    <div
      className={`w-full max-w-[300px] rounded-[24px] bg-gradient-to-br from-[#7C3AED] via-[#DB2777] to-[#F97316] p-[1.5px] shadow-[0_16px_40px_rgba(219,39,119,0.22)] transition-transform duration-300 hover:-translate-y-1 ${className}`}
      {...props}
    >
      <div className="flex min-h-[190px] items-end rounded-[23px] bg-[#18181B]/95 p-6 text-white">
        {children}
      </div>
    </div>
  );
}

export type MotionTextProps = React.HTMLAttributes<HTMLSpanElement> & {
  text?: string;
  speed?: number;
};

export function TypewriterText({
  text = "Ideas in motion.",
  speed = 55,
  className = "",
  ...props
}: MotionTextProps) {
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, Math.max(speed, 10));

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return (
    <span className={`font-semibold ${className}`} {...props}>
      {visibleText}
      <span aria-hidden="true" className="ml-0.5 animate-pulse">|</span>
    </span>
  );
}

export function TextReveal({
  text = "Reveal the details.",
  className = "",
  ...props
}: MotionTextProps) {
  return (
    <span
      className={`group/reveal inline-block overflow-hidden align-bottom ${className}`}
      {...props}
    >
      <span className="inline-block translate-y-[110%] transition-transform duration-500 group-hover/reveal:translate-y-0">
        {text}
      </span>
    </span>
  );
}

export function GradientText({
  text = "Color your ideas",
  className = "",
  ...props
}: MotionTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-[#7C3AED] via-[#DB2777] to-[#F97316] bg-clip-text font-bold text-transparent ${className}`}
      {...props}
    >
      {text}
    </span>
  );
}

export function SplitText({
  text = "Move with purpose",
  className = "",
  ...props
}: MotionTextProps) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} {...props}>
      {Array.from(text).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-[#7C3AED]"
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}

export function ScrambleText({
  text = "Signal found",
  speed = 55,
  className = "",
  ...props
}: MotionTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let frame = 0;
    const framesPerCharacter = 3;
    const timer = window.setInterval(() => {
      frame += 1;
      const settledCharacters = Math.floor(frame / framesPerCharacter);
      setDisplayText(
        Array.from(text)
          .map((character, index) => {
            if (character === " " || index < settledCharacters) return character;
            return alphabet[Math.floor(Math.random() * alphabet.length)];
          })
          .join("")
      );
      if (settledCharacters >= text.length) window.clearInterval(timer);
    }, Math.max(speed, 10));

    return () => window.clearInterval(timer);
  }, [speed, text]);

  return (
    <span className={`font-mono font-semibold ${className}`} {...props}>
      {displayText}
    </span>
  );
}

export type MotionBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

export function AuroraBackground({
  children = "Northern lights, in motion.",
  className = "",
  ...props
}: MotionBackgroundProps) {
  return (
    <div
      className={`relative isolate flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#090B1A] p-8 text-center text-white ${className}`}
      {...props}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -inset-1/2 animate-pulse bg-[radial-gradient(ellipse_at_25%_30%,rgba(16,185,129,0.42),transparent_38%),radial-gradient(ellipse_at_72%_45%,rgba(124,58,237,0.46),transparent_40%),radial-gradient(ellipse_at_48%_80%,rgba(14,165,233,0.32),transparent_35%)] blur-2xl" />
      <div className="relative z-10 text-lg font-semibold">{children}</div>
    </div>
  );
}

const PARTICLE_POSITIONS = [
  [8, 24], [18, 74], [29, 41], [40, 16], [51, 65], [61, 32], [72, 81],
  [82, 48], [92, 22], [13, 90], [36, 87], [58, 10], [77, 12], [89, 72],
];

export function ParticleBackground({
  children = "A field of tiny lights.",
  className = "",
  ...props
}: MotionBackgroundProps) {
  return (
    <div
      className={`relative isolate flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#080B18] p-8 text-center text-white ${className}`}
      {...props}
    >
      {PARTICLE_POSITIONS.map(([left, top], index) => (
        <span
          key={`${left}-${top}`}
          aria-hidden="true"
          className="absolute h-1 w-1 rounded-full bg-cyan-100 shadow-[0_0_10px_2px_rgba(103,232,249,0.6)] animate-pulse"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${(index % 5) * 180}ms`,
            animationDuration: `${1.2 + (index % 4) * 0.4}s`,
          }}
        />
      ))}
      <div className="relative z-10 text-lg font-semibold">{children}</div>
    </div>
  );
}

export function GridBackground({
  children = "A clear space to create.",
  className = "",
  style,
  ...props
}: MotionBackgroundProps) {
  return (
    <div
      className={`flex min-h-[220px] w-full items-center justify-center rounded-[24px] bg-[#FAFAFA] p-8 text-center text-[#18181B] ${className}`}
      style={{
        ...style,
        backgroundImage:
          "linear-gradient(rgba(24,24,27,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(24,24,27,0.08) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
      {...props}
    >
      <div className="rounded-2xl bg-white/90 px-5 py-3 text-lg font-semibold shadow-sm">
        {children}
      </div>
    </div>
  );
}

export function SpotlightBackground({
  children = "Follow the light.",
  className = "",
  onPointerMove,
  onPointerLeave,
  ...props
}: MotionBackgroundProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    setPosition(null);
    onPointerLeave?.(event);
  };

  return (
    <div
      className={`relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#09090B] p-8 text-center text-white ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        backgroundImage: position
          ? `radial-gradient(260px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.5), transparent 75%)`
          : undefined,
      }}
      {...props}
    >
      <div className="relative z-10 text-lg font-semibold">{children}</div>
    </div>
  );
}

export function MeteorsBackground({
  children = "Make a wish.",
  className = "",
  ...props
}: MotionBackgroundProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setPhase((current) => (current + 1) % 120),
      60
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative isolate flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-[24px] bg-[#070A13] p-8 text-center text-white ${className}`}
      {...props}
    >
      {[10, 28, 48, 69, 88].map((left, index) => (
        <span
          key={left}
          aria-hidden="true"
          className="absolute top-0 h-px w-20 -rotate-[35deg] bg-gradient-to-r from-transparent via-cyan-100 to-transparent animate-pulse"
          style={{
            left: `${(left + phase * 0.3) % 120 - 10}%`,
            top: `${(10 + index * 13 + phase * 0.7) % 120 - 10}%`,
            animationDelay: `${index * 220}ms`,
            animationDuration: "1.8s",
            transition: "left 60ms linear, top 60ms linear",
          }}
        />
      ))}
      <div className="relative z-10 text-lg font-semibold">{children}</div>
    </div>
  );
}

export type NavigationItem = { label: string; href?: string };
export type MotionNavigationProps = React.HTMLAttributes<HTMLElement> & {
  items?: NavigationItem[];
  activeItem?: string;
  onSelect?: (item: NavigationItem) => void;
};

const DEFAULT_NAV_ITEMS: NavigationItem[] = [
  { label: "Overview", href: "#overview" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
];

function NavigationMenu({
  variant,
  items = DEFAULT_NAV_ITEMS,
  activeItem,
  onSelect,
  className = "",
  ...props
}: MotionNavigationProps & { variant: "floating" | "dock" | "sidebar" | "bubble" }) {
  const [internalSelected, setInternalSelected] = useState(
    items[0]?.label ?? ""
  );
  const selected = activeItem ?? internalSelected;

  const vertical = variant === "sidebar";
  const shellStyles = {
    floating:
      "sticky top-4 mx-auto w-fit rounded-full border border-white/10 bg-[#18181B]/90 p-1.5 text-white shadow-xl backdrop-blur-xl",
    dock:
      "mx-auto w-fit rounded-[20px] border border-[#E4E4E7] bg-white/90 p-2 text-[#18181B] shadow-xl backdrop-blur-xl",
    sidebar:
      "w-full max-w-[240px] rounded-[20px] border border-[#E4E4E7] bg-white p-2 text-[#18181B] shadow-lg",
    bubble:
      "mx-auto w-fit rounded-full bg-[#18181B] p-2 text-white shadow-lg",
  }[variant];

  return (
    <nav
      aria-label="Primary navigation"
      className={`${shellStyles} ${className}`}
      {...props}
    >
      <ul className={`flex ${vertical ? "flex-col" : "items-center"} gap-1`}>
        {items.map((item) => {
          const isActive = selected === item.label;
          const linkStyle =
            variant === "bubble"
              ? isActive
                ? "bg-[#7C3AED] text-white shadow-md"
                : "text-white/75 hover:bg-white/10 hover:text-white"
              : isActive
                ? variant === "floating"
                  ? "bg-white text-[#18181B]"
                  : "bg-[#F4F4F5] text-[#18181B]"
                : variant === "floating"
                  ? "text-white/75 hover:bg-white/10 hover:text-white"
                  : "text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B]";

          return (
            <li key={item.label}>
              <a
                href={item.href ?? `#${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(event) => {
                  if (activeItem === undefined) setInternalSelected(item.label);
                  onSelect?.(item);
                  if (!item.href) event.preventDefault();
                }}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-medium transition-colors ${linkStyle}`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function FloatingNavbar(props: MotionNavigationProps) {
  return <NavigationMenu variant="floating" {...props} />;
}

export function DockNavigation(props: MotionNavigationProps) {
  return <NavigationMenu variant="dock" {...props} />;
}

export function SidebarNavigation(props: MotionNavigationProps) {
  return <NavigationMenu variant="sidebar" {...props} />;
}

export function BubbleNavigation(props: MotionNavigationProps) {
  return <NavigationMenu variant="bubble" {...props} />;
}

export type CursorEffectProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

function CursorStage({
  variant,
  children = "Move your cursor here",
  className = "",
  onPointerMove,
  onPointerLeave,
  ...props
}: CursorEffectProps & { variant: "custom" | "trail" | "follower" }) {
  const [points, setPoints] = useState<Array<{ x: number; y: number }>>([]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };
    setPoints((previous) =>
      variant === "trail" ? [point, ...previous].slice(0, 5) : [point]
    );
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    setPoints([]);
    onPointerLeave?.(event);
  };

  return (
    <div
      className={`relative flex min-h-[220px] w-full cursor-none items-center justify-center overflow-hidden rounded-[24px] bg-[#18181B] p-8 text-center text-white ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      {children}
      {points.map((point, index) => (
        <span
          key={`${point.x}-${point.y}-${index}`}
          aria-hidden="true"
          className={`pointer-events-none absolute z-10 rounded-full ${
            variant === "custom"
              ? "h-5 w-5 border-2 border-[#FFDD00] bg-white/20"
              : variant === "follower"
                ? "h-10 w-10 border border-white/70 bg-white/10 backdrop-blur-sm"
                : "h-2.5 w-2.5 bg-[#FFDD00] shadow-[0_0_12px_3px_rgba(255,221,0,0.45)]"
          }`}
          style={{
            left: point.x,
            top: point.y,
            transform: "translate(-50%, -50%)",
            opacity: variant === "trail" ? 1 - index * 0.18 : 1,
            transition:
              variant === "follower" ? "left 160ms ease-out, top 160ms ease-out" : undefined,
          }}
        />
      ))}
    </div>
  );
}

export function CustomCursor(props: CursorEffectProps) {
  return <CursorStage variant="custom" {...props} />;
}

export function CursorTrail(props: CursorEffectProps) {
  return <CursorStage variant="trail" {...props} />;
}

export function CursorFollower(props: CursorEffectProps) {
  return <CursorStage variant="follower" {...props} />;
}

export type MotionImageProps = React.HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85";

export function ImageReveal({
  src = DEFAULT_IMAGE,
  alt = "Sunlit mountain landscape",
  className = "",
  ...props
}: MotionImageProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`group relative aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-[24px] bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${src}")` }}
      {...props}
    >
      <div className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">
        {alt}
      </span>
    </div>
  );
}

export function ParallaxImage({
  src = DEFAULT_IMAGE,
  alt = "Sunlit mountain landscape",
  className = "",
  onPointerMove,
  onPointerLeave,
  ...props
}: MotionImageProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * -14,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * -14,
    });
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    setOffset({ x: 0, y: 0 });
    onPointerLeave?.(event);
  };

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-[24px] ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    >
      <div
        className="absolute -inset-4 bg-cover bg-center transition-transform duration-200 ease-out"
        style={{
          backgroundImage: `url("${src}")`,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(1.05)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      <span className="absolute bottom-4 left-4 text-sm font-semibold text-white">
        {alt}
      </span>
    </div>
  );
}

export type ImageCompareProps = React.HTMLAttributes<HTMLDivElement> & {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
};

export function ImageCompare({
  beforeSrc = DEFAULT_IMAGE,
  afterSrc = "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
  ...props
}: ImageCompareProps) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className={`relative aspect-[16/10] w-full max-w-[420px] overflow-hidden rounded-[24px] bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url("${afterSrc}")` }}
      {...props}
    >
      <div
        role="img"
        aria-label={beforeLabel}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${beforeSrc}")`,
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      />
      <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-white">
        {afterLabel}
      </span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
        style={{ left: `${position}%` }}
      />
      <input
        aria-label="Image comparison position"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}

export function MorphingLoader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [shape, setShape] = useState(0);
  const shapes = [
    "38% 62% 65% 35% / 42% 42% 58% 58%",
    "60% 40% 35% 65% / 55% 60% 40% 45%",
    "45% 55% 56% 44% / 60% 38% 62% 40%",
  ];

  useEffect(() => {
    const timer = window.setInterval(
      () => setShape((current) => (current + 1) % shapes.length),
      900
    );
    return () => window.clearInterval(timer);
  }, [shapes.length]);

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`h-16 w-16 bg-gradient-to-br from-[#7C3AED] to-[#F472B6] transition-[border-radius] duration-700 ${className}`}
      style={{ borderRadius: shapes[shape] }}
      {...props}
    />
  );
}

export function CircularLoader({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`h-12 w-12 animate-spin rounded-full border-[4px] border-[#E4E4E7] border-t-[#7C3AED] ${className}`}
      {...props}
    />
  );
}

export function ProgressBar({
  value,
  label = "Upload progress",
  onChange,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  value?: number;
  label?: string;
  onChange?: (value: number) => void;
}) {
  const inputId = useId();
  const [internalProgress, setInternalProgress] = useState(68);
  const progress = Math.max(0, Math.min(100, value ?? internalProgress));

  return (
    <div className={`w-full max-w-[360px] space-y-3 ${className}`} {...props}>
      <div className="flex items-center justify-between text-[12px] font-medium text-[#52525B]">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2.5 overflow-hidden rounded-full bg-[#E4E4E7]"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#DB2777] transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <input
        id={inputId}
        aria-label={`Adjust ${label.toLowerCase()}`}
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(event) => {
          const nextValue = Number(event.target.value);
          if (value === undefined) setInternalProgress(nextValue);
          onChange?.(nextValue);
        }}
        className="w-full accent-[#7C3AED]"
      />
    </div>
  );
}

export type MotionInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function FloatingInput({
  label = "Email address",
  id,
  className = "",
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}: MotionInputProps) {
  const generatedId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const [focused, setFocused] = useState(false);
  const inputId = id ?? generatedId;
  const currentValue = value ?? internalValue;

  return (
    <div className="relative w-full max-w-[360px]">
      <input
        id={inputId}
        value={currentValue}
        onChange={(event) => {
          if (value === undefined) setInternalValue(event.target.value);
          onChange?.(event);
        }}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        placeholder=" "
        className={`peer w-full rounded-xl border border-[#D4D4D8] bg-white px-4 pb-2.5 pt-5 text-sm text-[#18181B] outline-none transition-colors focus:border-[#7C3AED] ${className}`}
        {...props}
      />
      <label
        htmlFor={inputId}
        className={`pointer-events-none absolute left-4 transition-all ${
          focused || String(currentValue).length
            ? "top-2 text-[10px] font-medium text-[#7C3AED]"
            : "top-3.5 text-sm text-[#71717A]"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function AnimatedInput({
  label = "Search projects",
  className = "",
  ...props
}: MotionInputProps) {
  return (
    <label className="group relative block w-full max-w-[360px]">
      <span className="mb-2 block text-[12px] font-medium text-[#52525B]">
        {label}
      </span>
      <input
        className={`w-full rounded-xl border border-[#E4E4E7] bg-white px-4 py-3 text-sm text-[#18181B] outline-none transition-all duration-200 placeholder:text-[#A1A1AA] focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10 ${className}`}
        placeholder="Type to search..."
        {...props}
      />
      <span className="pointer-events-none absolute bottom-0 left-4 h-0.5 w-0 bg-[#7C3AED] transition-all duration-300 group-focus-within:w-[calc(100%-2rem)]" />
    </label>
  );
}

export type ToggleSwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

export function ToggleSwitch({
  checked,
  onChange,
  label = "Enable notifications",
  className = "",
  onClick,
  disabled,
  ...props
}: ToggleSwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = checked ?? internalChecked;

  const toggle = () => {
    const nextChecked = !isChecked;
    if (checked === undefined) setInternalChecked(nextChecked);
    onChange?.(nextChecked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      aria-label={label}
      disabled={disabled}
      onClick={(event) => {
        toggle();
        onClick?.(event);
      }}
      className={`inline-flex items-center gap-3 text-sm font-medium text-[#18181B] disabled:opacity-50 ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className={`relative h-6 w-11 rounded-full transition-colors ${
          isChecked ? "bg-[#7C3AED]" : "bg-[#D4D4D8]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            isChecked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
      {label}
    </button>
  );
}

export type OTPInputProps = {
  length?: number;
  onComplete?: (value: string) => void;
};

export function OTPInput({ length = 6, onComplete }: OTPInputProps) {
  const [digits, setDigits] = useState(() => Array(length).fill(""));
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const updateDigit = (index: number, rawValue: string) => {
    const digit = rawValue.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < length - 1) inputs.current[index + 1]?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(""));
  };

  return (
    <div
      role="group"
      aria-label={`${length}-digit verification code`}
      className="flex gap-2"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          aria-label={`Digit ${index + 1}`}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          onChange={(event) => updateDigit(index, event.target.value)}
          onPaste={(event) => {
            const pasted = event.clipboardData
              .getData("text")
              .replace(/\D/g, "")
              .slice(0, length - index);
            if (!pasted) return;
            event.preventDefault();
            const next = [...digits];
            pasted.split("").forEach((value, offset) => {
              next[index + offset] = value;
            });
            setDigits(next);
            inputs.current[Math.min(index + pasted.length, length - 1)]?.focus();
            if (next.every(Boolean)) onComplete?.(next.join(""));
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !digits[index] && index > 0) {
              inputs.current[index - 1]?.focus();
            }
            if (event.key === "ArrowLeft" && index > 0) {
              inputs.current[index - 1]?.focus();
            }
            if (event.key === "ArrowRight" && index < length - 1) {
              inputs.current[index + 1]?.focus();
            }
          }}
          className="h-12 w-10 rounded-xl border border-[#D4D4D8] bg-white text-center text-lg font-semibold text-[#18181B] outline-none transition-colors focus:border-[#7C3AED] focus:ring-4 focus:ring-[#7C3AED]/10"
        />
      ))}
    </div>
  );
}

export type ScrollEffectProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

export function ScrollReveal({
  children = "This content appears as you scroll.",
  className = "",
  ...props
}: ScrollEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-2xl bg-white p-6 text-[#18181B] shadow-lg transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function ScrollParallax({
  children = "Scroll to move this layer.",
  className = "",
  ...props
}: ScrollEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const element = ref.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      setOffset((bounds.top - window.innerHeight / 2) * -0.08);
    };
    updateOffset();
    window.addEventListener("scroll", updateOffset, { passive: true });
    window.addEventListener("resize", updateOffset);
    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex min-h-[220px] items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-[#312E81] to-[#0F172A] p-8 text-center text-white ${className}`}
      {...props}
    >
      <div
        className="text-xl font-semibold transition-transform duration-150"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

export function StickyScroll({
  children,
  title = "Keep the important details in view",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  title?: string;
}) {
  return (
    <section
      className={`grid w-full gap-6 rounded-[24px] bg-[#F4F4F5] p-6 md:grid-cols-[0.8fr_1.2fr] ${className}`}
      {...props}
    >
      <aside className="self-start md:sticky md:top-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
          Sticky scroll
        </p>
        <h3 className="mt-2 text-xl font-bold text-[#18181B]">{title}</h3>
      </aside>
      <div className="space-y-4">
        {children ?? (
          <>
            <article className="min-h-[120px] rounded-2xl bg-white p-5 text-sm text-[#52525B]">
              <h4 className="font-semibold text-[#18181B]">01 · Plan</h4>
              <p className="mt-2">Set a clear direction before you begin.</p>
            </article>
            <article className="min-h-[120px] rounded-2xl bg-white p-5 text-sm text-[#52525B]">
              <h4 className="font-semibold text-[#18181B]">02 · Build</h4>
              <p className="mt-2">Turn the plan into a thoughtful experience.</p>
            </article>
            <article className="min-h-[120px] rounded-2xl bg-white p-5 text-sm text-[#52525B]">
              <h4 className="font-semibold text-[#18181B]">03 · Launch</h4>
              <p className="mt-2">Share the finished work with the world.</p>
            </article>
          </>
        )}
      </div>
    </section>
  );
}

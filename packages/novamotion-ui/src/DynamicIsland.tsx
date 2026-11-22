import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  CarFront,
  Check,
  Mic,
  Music2,
  Pause,
  PhoneCall,
  Play,
  Signal,
  Volume2,
  Wifi,
} from "lucide-react";

export type DynamicIslandActivity = "music" | "call" | "delivery";

export type DynamicIslandProps = {
  activity?: DynamicIslandActivity;
  autoCycle?: boolean;
  cycleDuration?: number;
  className?: string;
  onActivityChange?: (activity: DynamicIslandActivity) => void;
};

const ACTIVITIES: DynamicIslandActivity[] = ["music", "call", "delivery"];

const ACTIVITY_COPY = {
  music: { label: "Music", title: "Midnight City", subtitle: "M83 · Hurry Up, We're Dreaming" },
  call: { label: "Call", title: "Maya Chen", subtitle: "iPhone · 02:48" },
  delivery: { label: "Delivery", title: "Your ride is close", subtitle: "Alex is 4 min away" },
} satisfies Record<
  DynamicIslandActivity,
  { label: string; title: string; subtitle: string }
>;

function getNextActivity(activity: DynamicIslandActivity) {
  return ACTIVITIES[(ACTIVITIES.indexOf(activity) + 1) % ACTIVITIES.length];
}

export function DynamicIsland({
  activity,
  autoCycle = true,
  cycleDuration = 4200,
  className = "",
  onActivityChange,
}: DynamicIslandProps) {
  const [internalActivity, setInternalActivity] =
    useState<DynamicIslandActivity>(activity ?? "music");
  const activityRef = useRef<DynamicIslandActivity>(activity ?? "music");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(168);
  const shouldReduceMotion = useReducedMotion();
  const currentActivity = activity ?? internalActivity;
  const copy = ACTIVITY_COPY[currentActivity];

  useEffect(() => {
    if (!autoCycle || activity !== undefined) return undefined;

    const timer = window.setInterval(() => {
      const next = getNextActivity(activityRef.current);
      activityRef.current = next;
      setInternalActivity(next);
      onActivityChange?.(next);
    }, Math.max(1800, cycleDuration));

    return () => window.clearInterval(timer);
  }, [activity, autoCycle, cycleDuration, onActivityChange]);

  useEffect(() => {
    if (currentActivity !== "call") return undefined;

    const timer = window.setInterval(() => {
      setCallSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [currentActivity]);

  const selectActivity = (next: DynamicIslandActivity) => {
    activityRef.current = next;
    if (activity === undefined) setInternalActivity(next);
    onActivityChange?.(next);
  };

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 360, damping: 28 };
  const formattedCallTime = `${String(Math.floor(callSeconds / 60)).padStart(2, "0")}:${String(callSeconds % 60).padStart(2, "0")}`;

  return (
    <div
      role="group"
      aria-label="Dynamic Island preview"
      className={`w-full max-w-[390px] rounded-[28px] border border-black/[0.05] bg-[radial-gradient(ellipse_at_top,#FFFFFF_0%,#F5F7FB_58%,#E9EDF5_100%)] p-4 text-[#18181B] shadow-[0_22px_55px_rgba(24,24,27,0.12)] sm:p-5 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between px-1.5">
        <span className="text-[11px] font-semibold tracking-[-0.02em] text-[#18181B]">
          9:41
        </span>
        <div className="flex items-center gap-1.5 text-[#18181B]">
          <Signal aria-hidden="true" size={12} strokeWidth={2.2} />
          <Wifi aria-hidden="true" size={13} strokeWidth={2.2} />
          <span className="relative h-[9px] w-[17px] rounded-[3px] border border-[#18181B]/75 p-px">
            <span className="block h-full w-[72%] rounded-[1px] bg-[#18181B]" />
            <span className="absolute -right-[3px] top-[2px] h-[3px] w-[2px] rounded-r-sm bg-[#18181B]/75" />
          </span>
        </div>
      </div>

      <motion.div
        layout
        transition={transition}
        className="overflow-hidden rounded-[25px] border border-white/[0.09] bg-black px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_35px_rgba(0,0,0,0.38)] sm:px-5 sm:py-4"
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            <span className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-white/45">
              {currentActivity === "call" ? "Connected" : currentActivity === "music" ? "Now playing" : "On the way"}
            </span>
          </div>
          <span className="shrink-0 text-[9px] font-medium tabular-nums text-white/40">
            {currentActivity === "call" ? formattedCallTime : "LIVE"}
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentActivity}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, filter: "blur(3px)" }}
            transition={transition}
            className="flex min-h-[62px] items-center gap-3"
          >
            {currentActivity === "music" ? (
              <>
                <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-[13px] bg-gradient-to-br from-fuchsia-400 via-violet-600 to-sky-500 shadow-[0_5px_18px_rgba(139,92,246,0.25)]">
                  <span className="absolute -right-2 -top-3 size-8 rounded-full bg-white/25 blur-md" />
                  <Music2 aria-hidden="true" size={19} className="relative text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-white">
                    {copy.title}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] text-white/45">
                    {copy.subtitle}
                  </p>
                  <div className="mt-2 flex h-3 items-center gap-[3px]" aria-hidden="true">
                    {[5, 9, 6, 11, 7, 10, 4, 8, 5, 11, 6, 9, 4, 7, 10, 5, 8].map(
                      (height, index) => (
                        <span
                          key={index}
                          className={`w-[2px] rounded-full bg-gradient-to-t from-violet-400 to-sky-300 motion-safe:transition-[height] motion-safe:duration-300 ${
                            isPlaying ? "motion-safe:animate-pulse" : ""
                          }`}
                          style={{
                            height: isPlaying ? `${height}px` : "3px",
                            animationDelay: `${index * 45}ms`,
                          }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                  onClick={() => setIsPlaying((playing) => !playing)}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.09] text-white transition-colors hover:bg-white/[0.16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {isPlaying ? (
                    <Pause aria-hidden="true" size={14} fill="currentColor" />
                  ) : (
                    <Play aria-hidden="true" size={14} fill="currentColor" />
                  )}
                </button>
              </>
            ) : currentActivity === "call" ? (
              <>
                <div className="relative grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 text-[13px] font-semibold text-[#3B2117] shadow-[0_5px_18px_rgba(251,146,60,0.2)]">
                  MC
                  <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full border-2 border-black bg-emerald-400">
                    <PhoneCall aria-hidden="true" size={8} className="text-emerald-950" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-white">
                    {copy.title}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] text-emerald-300/80">
                    {isMuted ? "Muted" : "iPhone"} · {formattedCallTime}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-1 w-12 rounded-full bg-emerald-400" />
                    <span className="h-1 w-7 rounded-full bg-emerald-400/55" />
                    <span className="h-1 w-3 rounded-full bg-emerald-400/25" />
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={isMuted ? "Unmute call" : "Mute call"}
                  aria-pressed={isMuted}
                  onClick={() => setIsMuted((muted) => !muted)}
                  className={`grid size-9 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    isMuted ? "bg-white text-black" : "bg-white/[0.09] text-white hover:bg-white/[0.16]"
                  }`}
                >
                  <Mic aria-hidden="true" size={15} />
                </button>
              </>
            ) : (
              <>
                <div className="grid size-12 shrink-0 place-items-center rounded-[13px] bg-gradient-to-br from-emerald-300 to-teal-600 text-white shadow-[0_5px_18px_rgba(16,185,129,0.2)]">
                  <CarFront aria-hidden="true" size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold tracking-[-0.02em] text-white">
                    {copy.title}
                  </p>
                  <p className="mt-0.5 truncate text-[9px] text-white/45">
                    {copy.subtitle}
                  </p>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={false}
                      animate={{ width: "72%" }}
                      transition={transition}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-400"
                    />
                  </div>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/[0.09] text-emerald-300">
                  <Check aria-hidden="true" size={15} />
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2.5">
          <span className="text-[9px] text-white/35">
            {currentActivity === "music" ? "iPhone · AirPlay ready" : currentActivity === "call" ? "End-to-end encrypted" : "Live location shared"}
          </span>
          <span className="flex items-center gap-1 text-[9px] text-white/40">
            <Volume2 aria-hidden="true" size={11} />
            {currentActivity === "music" ? "AirPods Pro" : currentActivity === "call" ? "Audio" : "Maps"}
          </span>
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1" role="group" aria-label="Island activity">
          {ACTIVITIES.map((item) => {
            const selected = currentActivity === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => selectActivity(item)}
                className={`rounded-full px-2.5 py-1.5 text-[9px] font-medium capitalize transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  selected
                    ? "bg-white text-[#18181B]"
                    : "text-[#71717A] hover:bg-black/[0.05] hover:text-[#18181B]"
                }`}
              >
                {ACTIVITY_COPY[item].label}
              </button>
            );
          })}
        </div>
        <span className="flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.12em] text-[#A1A1AA]">
          {autoCycle && activity === undefined ? "Auto demo" : "Interactive"}
        </span>
      </div>
    </div>
  );
}

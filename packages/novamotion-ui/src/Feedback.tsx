import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, Check, Info, LoaderCircle, TriangleAlert, X } from "lucide-react";

export type RatingInputProps = {
  value?: number;
  defaultValue?: number;
  max?: number;
  label?: string;
  onChange?: (value: number) => void;
  className?: string;
};

export function RatingInput({
  value,
  defaultValue = 4,
  max = 5,
  label = "Rate this experience",
  onChange,
  className = "",
}: RatingInputProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const rating = value ?? internalValue;
  const starCount = Math.max(1, Math.floor(max));

  const selectRating = (nextValue: number) => {
    setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div
      className={`w-full max-w-[340px] rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}
    >
      <p className="text-[13px] font-semibold text-[#18181B]">{label}</p>
      <div
        role="radiogroup"
        aria-label={label}
        className="mt-3 flex items-center gap-1"
      >
        {Array.from({ length: starCount }, (_, index) => {
          const starValue = index + 1;
          const selected = rating === starValue;
          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`${starValue} ${starValue === 1 ? "star" : "stars"}`}
              onClick={() => selectRating(starValue)}
              className="grid size-9 place-items-center rounded-lg transition-colors hover:bg-[#FFF9CC] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={starValue <= rating ? "#FFDD00" : "none"}
                stroke={starValue <= rating ? "#B79E00" : "#A1A1AA"}
                strokeWidth="1.7"
                strokeLinejoin="round"
              >
                <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
              </svg>
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-2 text-[11px] text-[#71717A]">
        {rating} out of {starCount} stars
      </p>
    </div>
  );
}

export type ToastProps = {
  title?: string;
  description?: string;
  variant?: "success" | "info" | "warning" | "error" | "loading";
  className?: string;
};

export function Toast({
  title = "Changes saved",
  description = "Your project is up to date.",
  variant = "success",
  className = "",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const variants = {
    success: {
      Icon: Check,
      iconStyle: "bg-emerald-50 text-emerald-700",
      accent: "border-l-emerald-500",
      role: "status" as const,
    },
    info: {
      Icon: Info,
      iconStyle: "bg-sky-50 text-sky-700",
      accent: "border-l-sky-500",
      role: "status" as const,
    },
    warning: {
      Icon: TriangleAlert,
      iconStyle: "bg-amber-50 text-amber-700",
      accent: "border-l-amber-500",
      role: "status" as const,
    },
    error: {
      Icon: AlertCircle,
      iconStyle: "bg-rose-50 text-rose-700",
      accent: "border-l-rose-500",
      role: "alert" as const,
    },
    loading: {
      Icon: LoaderCircle,
      iconStyle: "bg-violet-50 text-violet-700",
      accent: "border-l-violet-500",
      role: "status" as const,
    },
  };
  const style = variants[variant];
  const Icon = style.Icon;
  const animation = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 8, scale: 0.97 },
      };

  return (
    <div className={`w-full max-w-[380px] ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {isVisible ? (
          <motion.div
            key="toast"
            {...animation}
            transition={shouldReduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 420, damping: 30 }}
            role={style.role}
            aria-live={style.role === "alert" ? "assertive" : "polite"}
            className={`flex items-start gap-3 rounded-2xl border border-black/[0.06] border-l-[3px] ${style.accent} bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.1)]`}
          >
            <span className={`grid size-9 shrink-0 place-items-center rounded-xl ${style.iconStyle}`}>
              <Icon
                aria-hidden="true"
                size={17}
                strokeWidth={variant === "loading" ? 2 : 2.2}
                className={
                  variant === "loading" && !shouldReduceMotion
                    ? "animate-spin"
                    : ""
                }
              />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-semibold text-[#18181B]">{title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#71717A]">
                {description}
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={() => setIsVisible(false)}
              className="grid size-7 shrink-0 place-items-center rounded-lg text-[#A1A1AA] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B]"
            >
              <X aria-hidden="true" size={14} />
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="reopen"
            {...animation}
            transition={shouldReduceMotion ? { duration: 0.12 } : { type: "spring", stiffness: 420, damping: 30 }}
            type="button"
            onClick={() => setIsVisible(true)}
            className="rounded-full bg-[#18181B] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#3F3F46]"
          >
            Show notification
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

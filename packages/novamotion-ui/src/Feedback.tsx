import React, { useState } from "react";

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
  className?: string;
};

export function Toast({
  title = "Changes saved",
  description = "Your project is up to date.",
  className = "",
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className={`w-full max-w-[380px] ${className}`}>
      {isVisible ? (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_12px_30px_rgba(0,0,0,0.1)]"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#FFF9CC] text-[#746500]">
            <svg
              aria-hidden="true"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>
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
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m18 6-12 12M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="rounded-full bg-[#18181B] px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#3F3F46]"
        >
          Show notification
        </button>
      )}
    </div>
  );
}

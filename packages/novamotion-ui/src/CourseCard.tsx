import React from "react";

export interface CourseCardProps {
  badge?: string;
  lessonsCount?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

export function CourseCard({
  badge = "New",
  lessonsCount = "39 LESSONS",
  title = "React for Interviews",
  description = "React for interviews, from components and state to effects, forms and testing.",
  onClick,
  className = "",
}: CourseCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!onClick || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onClick();
  };

  return (
    <article
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`course-card group relative w-full max-w-[390px] cursor-pointer select-none overflow-hidden rounded-[30px] border border-black/[0.04] bg-white shadow-[0_14px_38px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${className}`}
    >
      <div className="course-card__stage relative h-[245px] w-full overflow-hidden bg-[#222428]">
        {badge && (
          <div className="absolute right-0 top-0 z-20 flex items-start">
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              className="-mr-px block"
            >
              <path d="M0 0H22V22C22 9.84974 12.1503 0 0 0Z" fill="#0B0C0E" />
            </svg>
            <div className="relative rounded-bl-[22px] bg-[#0B0C0E] px-5 pb-3 pt-2.5 text-[13.5px] font-semibold tracking-[-0.01em] text-white">
              {badge}
              <svg
                aria-hidden="true"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                className="absolute -bottom-[21px] right-0 block"
              >
                <path d="M0 0H22V22C22 9.84974 12.1503 0 0 0Z" fill="#0B0C0E" />
              </svg>
            </div>
          </div>
        )}

        <svg
          aria-hidden="true"
          viewBox="0 0 400 135"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-[125px] w-full"
        >
          <path
            d="M0 54C42 46 72 28 118 28C164 28 192 48 242 45C292 42 325 18 368 20C384 21 394 25 400 28V135H0V54Z"
            fill="#AEEBFA"
          />
          <path
            d="M0 72C48 64 95 45 148 48C201 51 232 69 286 64C338 59 366 42 400 46V135H0V72Z"
            fill="#83DFF6"
          />
          <path
            d="M0 90C58 84 112 68 172 72C232 76 266 92 326 86C362 82 384 74 400 72V135H0V90Z"
            fill="#56CEEE"
          />
          <path
            d="M0 108C74 104 134 92 198 96C262 100 315 112 400 102V135H0V108Z"
            fill="#32B9DF"
          />
        </svg>

        <div className="absolute left-1/2 top-[48%] z-20 -translate-x-1/2 -translate-y-1/2">
          <div className="flex size-[88px] items-center justify-center rounded-[22px] border border-white/20 bg-gradient-to-b from-[#3A3D42]/90 via-[#444A52]/75 to-[#99B5BF]/55 shadow-[0_14px_28px_rgba(0,0,0,0.28),inset_0_1px_1px_rgba(255,255,255,0.25)] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            <svg
              aria-label="React"
              role="img"
              width="46"
              height="46"
              viewBox="-11.5 -10.23174 23 20.46348"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_8px_rgba(0,216,255,0.35)]"
            >
              <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
              <g stroke="#00D8FF" strokeWidth="1.05" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 flex items-end">
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="absolute -top-[21px] left-0 block"
          >
            <path d="M0 0V22H22C9.84974 22 0 12.1503 0 0Z" fill="#FFFFFF" />
          </svg>
          <div className="rounded-tr-[24px] bg-white pb-1.5 pl-7 pr-6 pt-4">
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.09em] text-[#6B7280]">
              {lessonsCount}
            </span>
          </div>
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="-ml-px block"
          >
            <path d="M0 0V22H22C9.84974 22 0 12.1503 0 0Z" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      <div className="bg-white px-7 pb-8 pt-4">
        <h3 className="text-[22px] font-bold leading-snug tracking-[-0.02em] text-[#111827]">
          {title}
        </h3>
        <p className="mt-2.5 text-[15px] font-normal leading-[1.6] text-[#6B7280]">
          {description}
        </p>
      </div>
    </article>
  );
}

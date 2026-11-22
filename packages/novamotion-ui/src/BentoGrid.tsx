"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Bell, CalendarDays, FileText, Share2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { MonthCalendar } from "./MonthCalendar.js";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const FILES = [
  {
    name: "bitcoin.pdf",
    body: "A concise guide to decentralized digital currency.",
  },
  {
    name: "finances.xlsx",
    body: "A clear view of budgets, expenses, and monthly goals.",
  },
  {
    name: "brand-kit.svg",
    body: "Scalable artwork for product and marketing surfaces.",
  },
  {
    name: "meeting-notes.txt",
    body: "Decisions and next steps from the latest team sync.",
  },
];

const NOTIFICATIONS = [
  { title: "Design review complete", detail: "Workspace · just now", tone: "bg-[#18181B]" },
  { title: "New teammate joined", detail: "Product team · 4 min ago", tone: "bg-[#71717A]" },
  { title: "Weekly report is ready", detail: "Analytics · 12 min ago", tone: "bg-[#A1A1AA]" },
];

export type BentoGridProps = React.HTMLAttributes<HTMLDivElement>;

export type BentoCardProps = {
  Icon: LucideIcon;
  name: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
  onPointerEnter?: React.PointerEventHandler<HTMLElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLElement>;
};

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  function BentoGrid({ className = "", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={`grid w-full grid-cols-1 gap-4 md:grid-cols-3 ${className}`}
        {...props}
      />
    );
  },
);

export function BentoCard({
  Icon,
  name,
  description,
  className = "",
  children,
  onPointerEnter,
  onPointerLeave,
}: BentoCardProps) {
  const iconRef = useRef<SVGSVGElement>(null);
  const titleId = React.useId();
  const shouldReduceMotion = useReducedMotion();

  const drawIcon = () => {
    if (shouldReduceMotion || !iconRef.current) return;
    const strokes = iconRef.current.querySelectorAll(
      "path, line, polyline, polygon, rect, circle, ellipse",
    );
    if (!strokes.length) return;

    gsap.killTweensOf(strokes);
    gsap.fromTo(
      strokes,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 0.62,
        stagger: 0.045,
        ease: "power2.inOut",
        clearProps: "all",
      },
    );
  };

  return (
    <article
      role="group"
      aria-labelledby={titleId}
      tabIndex={0}
      onPointerEnter={(event) => {
        drawIcon();
        onPointerEnter?.(event);
      }}
      onPointerLeave={onPointerLeave}
      onFocus={drawIcon}
      className={`group relative flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-black/[0.07] bg-white p-4 text-[#18181B] shadow-[0_8px_30px_rgba(24,24,27,0.045)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.12] hover:shadow-[0_18px_48px_rgba(24,24,27,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B] sm:p-5 ${className}`}
    >
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 id={titleId} className="text-[15px] font-semibold tracking-[-0.025em]">
            {name}
          </h3>
          <p className="mt-1 max-w-[340px] text-[11px] leading-relaxed text-[#71717A]">
            {description}
          </p>
        </div>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#F4F4F5] text-[#3F3F46] transition-colors group-hover:bg-[#E4E4E7] group-hover:text-[#18181B]">
          <Icon ref={iconRef} aria-hidden="true" className="size-[18px]" strokeWidth={1.8} />
        </span>
      </div>
      <div className="relative z-0 mt-4 min-h-0 flex-1">{children}</div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-10 bg-gradient-to-t from-white/80 to-transparent"
      />
      <span className="relative z-10 mt-2 inline-flex items-center gap-1 self-start text-[10px] font-semibold text-[#71717A] transition-colors group-hover:text-[#18181B]">
        Explore feature <span aria-hidden="true">↗</span>
      </span>
    </article>
  );
}

export function BentoDemo({ className = "" }: { className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeTween = useRef<gsap.core.Tween | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date(2026, 10, 11));
  const shouldReduceMotion = useReducedMotion();

  useGSAP(
    () => {
      if (shouldReduceMotion) return;

      const marquee = gridRef.current?.querySelector<HTMLElement>(
        "[data-bento-marquee]",
      );
      if (marquee) {
        marqueeTween.current = gsap.to(marquee, {
          yPercent: -50,
          duration: 24,
          ease: "none",
          repeat: -1,
        });
      }

      const beams = gridRef.current?.querySelectorAll("[data-bento-beam]");
      if (beams?.length) {
        gsap.fromTo(
          beams,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.7,
            stagger: 0.35,
            repeat: -1,
            repeatDelay: 0.7,
            yoyo: true,
            ease: "power1.inOut",
          },
        );
      }

      gsap.fromTo(
        "[data-bento-notification]",
        { y: 5, autoAlpha: 0.7 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.22,
          repeat: -1,
          yoyo: true,
          repeatDelay: 0.8,
          ease: "sine.inOut",
        },
      );
    },
    { scope: gridRef, dependencies: [shouldReduceMotion], revertOnUpdate: true },
  );

  const renderFiles = () =>
    FILES.map((file) => (
      <figure
        key={file.name}
        className="rounded-xl border border-black/[0.07] bg-white/90 p-3 shadow-[0_4px_14px_rgba(24,24,27,0.04)] backdrop-blur-sm transition-colors hover:bg-white"
      >
        <figcaption className="truncate text-[11px] font-semibold text-[#3F3F46]">
          {file.name}
        </figcaption>
        <blockquote className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-[#71717A]">
          {file.body}
        </blockquote>
      </figure>
    ));

  return (
    <BentoGrid ref={gridRef} className={className}>
      <BentoCard
        Icon={FileText}
        name="Save your files"
        description="Keep every project file organized and ready when your team needs it."
        className="md:col-span-1"
        onPointerEnter={() => marqueeTween.current?.pause()}
        onPointerLeave={() => marqueeTween.current?.resume()}
      >
        <div className="absolute inset-x-0 top-0 h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,#000_18%,#000_78%,transparent_100%)]">
          <div data-bento-marquee className="flex flex-col gap-2">
            {renderFiles()}
            {renderFiles()}
          </div>
        </div>
      </BentoCard>

      <BentoCard
        Icon={Bell}
        name="Notifications"
        description="Stay in the loop with useful updates from across your workspace."
        className="md:col-span-2"
      >
        <div className="absolute inset-x-0 top-1 flex flex-col gap-2">
          {NOTIFICATIONS.map((notification) => (
            <div
              key={notification.title}
              data-bento-notification
              className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white/90 p-3 shadow-[0_4px_14px_rgba(24,24,27,0.035)]"
            >
              <span className={`size-2 shrink-0 rounded-full ${notification.tone}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-[#3F3F46]">
                  {notification.title}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-[#A1A1AA]">
                  {notification.detail}
                </p>
              </div>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-[#18181B]" />
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard
        Icon={Share2}
        name="Integrations"
        description="Bring your favorite tools together in one connected workspace."
        className="md:col-span-2"
      >
        <div className="relative h-full min-h-[145px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAFAFA] to-[#F4F4F5]">
          <svg
            aria-hidden="true"
            className="absolute inset-0 size-full"
            viewBox="0 0 480 180"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M240 88C190 42 150 42 91 45" stroke="#D4D4D8" strokeWidth="2" />
            <path d="M240 88C290 42 330 42 389 45" stroke="#D4D4D8" strokeWidth="2" />
            <path d="M240 92C190 138 150 138 91 135" stroke="#D4D4D8" strokeWidth="2" />
            <path d="M240 92C290 138 330 138 389 135" stroke="#D4D4D8" strokeWidth="2" />
            <path data-bento-beam d="M240 88C190 42 150 42 91 45" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
            <path data-bento-beam d="M240 88C290 42 330 42 389 45" stroke="#3F3F46" strokeWidth="2.5" strokeLinecap="round" />
            <path data-bento-beam d="M240 92C190 138 150 138 91 135" stroke="#71717A" strokeWidth="2.5" strokeLinecap="round" />
            <path data-bento-beam d="M240 92C290 138 330 138 389 135" stroke="#A1A1AA" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white bg-[#18181B] text-[10px] font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(24,24,27,0.2)]">
            NOVA
          </div>
          {[
            ["Docs", "left-[8%] top-[14%]"],
            ["Flow", "right-[8%] top-[14%]"],
            ["Data", "left-[8%] bottom-[14%]"],
            ["API", "right-[8%] bottom-[14%]"],
          ].map(([label, position]) => (
            <span
              key={label}
              className={`absolute ${position} grid min-w-14 place-items-center rounded-lg border border-black/[0.06] bg-white px-2.5 py-2 text-[10px] font-semibold text-[#52525B] shadow-[0_5px_16px_rgba(24,24,27,0.06)]`}
            >
              {label}
            </span>
          ))}
        </div>
      </BentoCard>

      <BentoCard
        Icon={CalendarDays}
        name="Calendar"
        description={`Browse your files by date. Selected day ${selectedDate.getDate()}.`}
        className="md:col-span-1"
      >
        <div className="relative mx-auto h-[260px] w-full max-w-[290px] overflow-hidden">
          <div className="absolute left-1/2 top-0 w-[340px] -translate-x-1/2 origin-top scale-[0.72]">
            <MonthCalendar
              value={selectedDate}
              onChange={setSelectedDate}
              className="!max-w-none !p-3"
            />
          </div>
        </div>
      </BentoCard>
    </BentoGrid>
  );
}

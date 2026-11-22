"use client";

/**
 * ToastStack is adapted from https://motion-brew.com/components/toast-stack.
 * The animated icon shapes in the source are adapted from lucide-animated.
 * MIT License, Copyright (c) 2024-2026 pqoqubbw.
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files, to deal in the Software
 * without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies.
 */

import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  TriangleAlert,
  Undo2,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

export type ToastKind = "success" | "warning" | "error" | "info";

export interface ToastItem {
  id?: string;
  kind: ToastKind;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void };
  /** Milliseconds before dismissal. Set to 0 to keep the toast open. */
  duration?: number;
}

export interface ToastStackHandle {
  push: (toast: ToastItem) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export interface ToastStackProps {
  /** Toasts displayed on first render; they remain until dismissed by default. */
  initial?: ToastItem[];
  /** Default lifetime for toasts added with `push`. Set to 0 to disable. */
  duration?: number;
  /** Number of toasts visible in the folded stack. */
  visible?: number;
  /** Show the sample trigger buttons. */
  triggers?: boolean;
  onDismiss?: (toast: ToastItem & { id: string }) => void;
  className?: string;
}

type LiveToast = ToastItem & { id: string; duration: number };

const MAX_TOASTS = 6;
const PEEK = 12;
const GAP = 10;
const SWIPE_THRESHOLD = 90;
const SPRING = { type: "spring", stiffness: 380, damping: 34, mass: 0.9 } as const;
const POP = { type: "spring", stiffness: 520, damping: 30 } as const;

const KIND_DETAILS = {
  success: { label: "Success", Icon: CheckCircle2 },
  warning: { label: "Warning", Icon: TriangleAlert },
  error: { label: "Error", Icon: AlertCircle },
  info: { label: "Info", Icon: Bell },
} satisfies Record<ToastKind, { label: string; Icon: typeof CheckCircle2 }>;

const SAMPLES: Record<ToastKind, ToastItem[]> = {
  success: [
    { kind: "success", title: "Changes saved", description: "Your workspace settings are up to date." },
    { kind: "success", title: "Invite sent", description: "Your teammate will receive an email shortly." },
  ],
  warning: [
    { kind: "warning", title: "Storage almost full", description: "You are getting close to your storage limit." },
    { kind: "warning", title: "Card expires soon", description: "Review your billing details when you have a moment." },
  ],
  error: [
    { kind: "error", title: "Project moved to trash", description: "You can restore it with Undo.", action: { label: "Undo" } },
    { kind: "error", title: "Member removed", description: "This person no longer has workspace access.", action: { label: "Undo" } },
  ],
  info: [
    { kind: "info", title: "New comment", description: "Maya replied to the Homepage redesign." },
    { kind: "info", title: "Deploy started", description: "Your latest build is in progress." },
  ],
};

const DEFAULT_INITIAL: ToastItem[] = [
  { kind: "info", title: "New comment", description: "Maya replied to the Homepage redesign.", duration: 0 },
  { kind: "warning", title: "Storage almost full", description: "You are getting close to your storage limit.", duration: 0 },
  { kind: "success", title: "Changes saved", description: "Your workspace settings are up to date.", duration: 0 },
];

type ToastCardProps = {
  toast: LiveToast;
  index: number;
  count: number;
  open: boolean;
  visible: number;
  y: number;
  height?: number;
  frontHeight: number;
  reduced: boolean;
  paused: boolean;
  onMeasure: (id: string, height: number) => void;
  onDismiss: (id: string) => void;
  onDrag: (dragging: boolean) => void;
};

function ToastCard({
  toast,
  index,
  count,
  open,
  visible,
  y,
  height,
  frontHeight,
  reduced,
  paused,
  onMeasure,
  onDismiss,
  onDrag,
}: ToastCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const remaining = useRef(toast.duration);
  const progress = useMotionValue(1);
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-220, 220], [-7, 7]);
  const fade = useTransform(x, [-240, -SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD, 240], [0, 0.65, 1, 0.65, 0]);
  const kind = KIND_DETAILS[toast.kind];
  const front = index === 0;
  const folded = !open && !front;
  const shown = open || index < visible;

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => onMeasure(toast.id, element.offsetHeight));
    observer.observe(element);
    onMeasure(toast.id, element.offsetHeight);
    return () => observer.disconnect();
  }, [onMeasure, toast.id]);

  useEffect(() => {
    if (toast.duration <= 0 || paused) return;
    const starting = progress.get();
    const timeLeft = remaining.current || toast.duration;
    const started = Date.now();
    const timer = window.setTimeout(() => onDismiss(toast.id), timeLeft);
    const fill = animate(progress, 0, {
      duration: timeLeft / 1000,
      ease: "linear",
    });

    return () => {
      window.clearTimeout(timer);
      fill.stop();
      const elapsed = Date.now() - started;
      remaining.current = Math.max(0, timeLeft - elapsed);
      progress.set(Math.max(0, starting - elapsed / toast.duration));
    };
  }, [onDismiss, paused, progress, toast.duration, toast.id]);

  const fling = (direction: number) => {
    void animate(
      x,
      direction * 460,
      reduced
        ? { duration: 0 }
        : { type: "spring", stiffness: 260, damping: 30, velocity: direction * 900 },
    ).then(() => onDismiss(toast.id));
  };

  return (
    <motion.li
      layout={false}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: y + 44, scale: 0.9, filter: "blur(6px)" }}
      animate={{
        opacity: shown ? 1 : 0,
        y,
        scale: open ? 1 : 1 - index * 0.05,
        filter: "blur(0px)",
        height: folded ? frontHeight : (height ?? "auto"),
      }}
      exit={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, scale: 0.92, y: y + 10, filter: "blur(4px)", transition: { duration: 0.22 } }
      }
      transition={reduced ? { duration: 0 } : SPRING}
      style={{
        zIndex: count - index,
        transformOrigin: "50% 0%",
        pointerEvents: shown ? "auto" : "none",
      }}
      className="absolute inset-x-0 bottom-0 list-none"
    >
      <motion.div
        ref={contentRef}
        role={toast.kind === "error" ? "alert" : "status"}
        aria-label={`${kind.label}: ${toast.title}`}
        tabIndex={front || open ? 0 : -1}
        drag={front || open ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        dragSnapToOrigin={false}
        onDragStart={() => onDrag(true)}
        onDragEnd={(_, info) => {
          onDrag(false);
          const direction = Math.sign(info.offset.x || info.velocity.x) || 1;
          if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 600) {
            fling(direction);
          } else {
            void animate(x, 0, POP);
          }
        }}
        onKeyDown={(event) => {
          if (event.key === "Delete" || event.key === "Backspace") {
            event.preventDefault();
            onDismiss(toast.id);
          }
        }}
        style={{ x, rotate: dragRotate, opacity: fade }}
        className="group relative h-full cursor-grab touch-pan-y overflow-hidden rounded-[22px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.06] outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-[#71717A]"
      >
        <motion.div
          animate={{ opacity: folded ? 0 : 1 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="flex items-start gap-3 p-3.5 pr-11"
        >
          <motion.span
            initial={reduced ? false : { scale: 0.65, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 24 }}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-[#F4F4F5] text-[#18181B]"
          >
            <kind.Icon aria-hidden="true" className="size-[18px]" strokeWidth={2} />
          </motion.span>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-semibold leading-5 tracking-tight text-[#18181B]">
              {toast.title}
            </p>
            {toast.description && (
              <p className="mt-0.5 text-sm leading-5 text-[#71717A]">
                {toast.description}
              </p>
            )}
            {toast.action && (
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => {
                  toast.action?.onClick?.();
                  onDismiss(toast.id);
                }}
                className="mt-2.5 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-[#18181B]/[0.06] px-3 text-sm font-medium text-[#18181B] outline-none transition-colors hover:bg-[#18181B]/[0.1] focus-visible:ring-2 focus-visible:ring-[#71717A]"
              >
                <Undo2 aria-hidden="true" className="size-3.5" />
                {toast.action.label}
              </button>
            )}
          </div>
        </motion.div>

        <button
          type="button"
          aria-label="Dismiss notification"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => onDismiss(toast.id)}
          className="absolute right-2.5 top-2.5 grid size-7 scale-75 cursor-pointer place-items-center rounded-full text-[#A1A1AA] opacity-0 outline-none transition-[opacity,transform,background-color,color] duration-200 hover:bg-[#18181B]/[0.06] hover:text-[#18181B] focus-visible:scale-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#71717A] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <X aria-hidden="true" className="size-3.5" />
        </button>

        {toast.duration > 0 && !folded && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-4 bottom-0 h-[2px] origin-left rounded-full bg-[#18181B]/30"
            style={{ scaleX: progress }}
          />
        )}
      </motion.div>
    </motion.li>
  );
}

export const ToastStack = React.forwardRef<ToastStackHandle, ToastStackProps>(
  function ToastStack(
    {
      initial = DEFAULT_INITIAL,
      duration = 6000,
      visible = 3,
      triggers = true,
      onDismiss,
      className = "",
    },
    ref,
  ) {
    const reduced = !!useReducedMotion();
    const sequence = useRef(0);
    const turn = useRef<Record<ToastKind, number>>({
      success: 0,
      warning: 0,
      error: 0,
      info: 0,
    });
    const [toasts, setToasts] = useState<LiveToast[]>(() =>
      initial.map((toast, index) => ({
        ...toast,
        id: toast.id ?? `toast-initial-${index + 1}`,
        duration: toast.duration ?? 0,
      })),
    );
    const allToasts = useRef(toasts);
    const nextId = useCallback(() => {
      let id = "";
      do {
        id = `toast-${++sequence.current}`;
      } while (allToasts.current.some((toast) => toast.id === id));
      return id;
    }, []);

    const dismiss = useCallback(
      (id: string) => {
        const toast = allToasts.current.find((item) => item.id === id);
        if (!toast) return;
        const remaining = allToasts.current.filter((item) => item.id !== id);
        allToasts.current = remaining;
        setToasts(remaining);
        onDismiss?.(toast);
      },
      [onDismiss],
    );

    const push = useCallback(
      (toast: ToastItem) => {
        const live: LiveToast = {
          ...toast,
          id: toast.id ?? nextId(),
          duration: toast.duration ?? duration,
        };
        const next = [...allToasts.current, live].slice(-MAX_TOASTS);
        allToasts.current = next;
        setToasts(next);
        return live.id;
      },
      [duration, nextId],
    );

    const clear = useCallback(() => {
      const ids = [...allToasts.current].reverse().map((toast) => toast.id);
      ids.forEach((id, index) => {
        window.setTimeout(() => dismiss(id), reduced ? 0 : index * 70);
      });
    }, [dismiss, reduced]);

    useImperativeHandle(ref, () => ({ push, dismiss, clear }), [push, dismiss, clear]);

    const [heights, setHeights] = useState<Record<string, number>>({});
    const [hover, setHover] = useState(false);
    const [focus, setFocus] = useState(false);
    const [dragging, setDragging] = useState(false);
    const box = useRef<HTMLDivElement>(null);
    const turnIndex = turn.current;
    const order = [...toasts].reverse();
    const count = order.length;
    const open = (hover || focus) && count > 1;
    const frontHeight = count ? heights[order[0]!.id] ?? 76 : 76;
    const offsets: number[] = [];
    let stackHeight = 0;
    order.forEach((toast, index) => {
      offsets.push(open ? -stackHeight : -PEEK * Math.min(index, visible - 1));
      stackHeight += (heights[toast.id] ?? 76) + GAP;
    });
    const height = !count
      ? 76
      : open
        ? stackHeight - GAP
        : frontHeight + PEEK * (Math.min(count, visible) - 1);
    const measure = useCallback((id: string, measured: number) => {
      setHeights((current) =>
        current[id] === measured ? current : { ...current, [id]: measured },
      );
    }, []);

    const sample = (kind: ToastKind) => {
      const samples = SAMPLES[kind];
      const item = samples[turnIndex[kind]++ % samples.length]!;
      push(
        kind === "error"
          ? {
              ...item,
              duration: Math.max(duration, 8000) || 0,
              action: {
                label: "Undo",
                onClick: () => {
                  window.setTimeout(
                    () =>
                      push({
                        kind: "success",
                        title: "Restored",
                        description: "The item was restored.",
                      }),
                    reduced ? 0 : 160,
                  );
                },
              },
            }
          : item,
      );
    };

    return (
      <div className={`flex w-[380px] max-w-full flex-col items-center gap-6 ${className}`}>
        <motion.div
          ref={box}
          className="relative w-full"
          animate={{ height }}
          transition={reduced ? { duration: 0 } : SPRING}
          onPointerEnter={(event) => event.pointerType === "mouse" && setHover(true)}
          onPointerLeave={(event) => event.pointerType === "mouse" && setHover(false)}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") setHover((value) => !value);
          }}
          onFocus={(event) => {
            if ((event.target as Element).matches(":focus-visible")) setFocus(true);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setFocus(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setHover(false);
              (document.activeElement as HTMLElement | null)?.blur();
            }
          }}
        >
          <ol aria-label="Notifications" aria-live="polite" className="contents">
            <AnimatePresence initial={false}>
              {order.map((toast, index) => (
                <ToastCard
                  key={toast.id}
                  toast={toast}
                  index={index}
                  count={count}
                  open={open}
                  visible={visible}
                  y={offsets[index]!}
                  height={heights[toast.id]}
                  frontHeight={frontHeight}
                  reduced={reduced}
                  paused={open || dragging}
                  onMeasure={measure}
                  onDismiss={dismiss}
                  onDrag={setDragging}
                />
              ))}
            </AnimatePresence>
          </ol>
          <AnimatePresence>
            {count === 0 && (
              <motion.p
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.35 }}
                className="absolute inset-0 flex items-center justify-center gap-2 rounded-[22px] border border-dashed border-black/[0.12] text-sm text-[#71717A]"
              >
                <CheckCircle2 aria-hidden="true" className="size-4 text-[#18181B]" />
                You are all caught up
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {triggers && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(Object.keys(KIND_DETAILS) as ToastKind[]).map((kind) => {
              const { Icon, label } = KIND_DETAILS[kind];
              return (
                <motion.button
                  key={kind}
                  type="button"
                  whileTap={reduced ? undefined : { scale: 0.94 }}
                  transition={POP}
                  onClick={() => sample(kind)}
                  className="flex h-9 cursor-pointer items-center gap-2 rounded-full bg-white px-3.5 text-sm font-medium text-[#18181B] shadow-[0_1px_2px_rgba(0,0,0,0.05),0_6px_16px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.06] outline-none transition-colors hover:bg-[#F4F4F5] focus-visible:ring-2 focus-visible:ring-[#71717A]"
                >
                  <Icon aria-hidden="true" className="size-4" />
                  {label}
                </motion.button>
              );
            })}
            <AnimatePresence>
              {count > 1 && (
                <motion.button
                  type="button"
                  onClick={clear}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                  transition={POP}
                  className="h-9 cursor-pointer rounded-full px-3 text-sm font-medium text-[#71717A] outline-none transition-colors hover:text-[#18181B] focus-visible:ring-2 focus-visible:ring-[#71717A]"
                >
                  Clear all
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  },
);

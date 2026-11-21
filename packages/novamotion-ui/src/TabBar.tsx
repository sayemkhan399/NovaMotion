import React, { useEffect, useRef, useState } from "react";
import {
  Activity,
  Bell,
  Compass,
  History,
  House,
  MessageCircle,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useElementInView } from "./useElementInView.js";

export type TabIcon =
  | "home"
  | "search"
  | "analytics"
  | "history"
  | "profile"
  | "bell"
  | "chat"
  | "explore"
  | "settings";

export interface TabItem {
  id: string;
  label: string;
  icon: TabIcon;
  badge?: number;
}

export type TabBarVariant = "pill" | "labels" | "action";

export interface TabBarProps {
  tabs?: TabItem[];
  variant?: TabBarVariant;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const ICONS = {
  home: House,
  search: Search,
  analytics: Activity,
  history: History,
  profile: UserRound,
  bell: Bell,
  chat: MessageCircle,
  explore: Compass,
  settings: Settings,
} satisfies Record<TabIcon, typeof House>;

const DEFAULT_TABS: TabItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "history", label: "History", icon: "history", badge: 3 },
  { id: "profile", label: "Profile", icon: "profile" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 500, damping: 34 };

export function TabBar({
  tabs = DEFAULT_TABS,
  variant = "pill",
  value,
  defaultValue,
  onChange,
  actionLabel = "Create",
  onAction,
  className = "",
}: TabBarProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const isInView = useElementInView(rootRef, { once: true, amount: 0.4 });
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? tabs[0]?.id ?? "",
  );
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [tapCounts, setTapCounts] = useState<Record<string, number>>({});
  const [actionCount, setActionCount] = useState(0);
  const animationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentValue = value ?? internalValue;
  const visibleTabs = variant === "action" ? tabs.slice(0, 4) : tabs.slice(0, 5);
  const visible = isInView || reducedMotion;
  const groupId = React.useId();

  useEffect(
    () => () => {
      if (animationTimer.current) clearTimeout(animationTimer.current);
    },
    [],
  );

  const selectTab = (id: string) => {
    setTapCounts((counts) => ({ ...counts, [id]: (counts[id] ?? 0) + 1 }));
    setActiveAnimation(id);
    if (animationTimer.current) clearTimeout(animationTimer.current);
    animationTimer.current = setTimeout(() => setActiveAnimation(null), 800);
    if (id === currentValue) return;
    if (value === undefined) setInternalValue(id);
    onChange?.(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const buttons = Array.from(
      rootRef.current?.querySelectorAll<HTMLButtonElement>("[data-tab]") ?? [],
    );
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0 || buttons.length === 0) return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    buttons[(index + offset + buttons.length) % buttons.length]?.focus();
  };

  const renderTab = (tab: TabItem, index: number) => {
    const selected = tab.id === currentValue;
    const Icon = ICONS[tab.icon];
    const tapCount = tapCounts[tab.id] ?? 0;
    const iconOnly = variant === "action";

    return (
      <motion.button
        key={tab.id}
        type="button"
        data-tab
        aria-label={tab.badge ? `${tab.label}, ${tab.badge} new` : tab.label}
        aria-current={selected ? "page" : undefined}
        onClick={() => selectTab(tab.id)}
        layout={variant === "pill" && !reducedMotion}
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={visible ? { opacity: 1, y: 0 } : undefined}
        whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        transition={{
          ...SPRING,
          opacity: { duration: 0.35, delay: index * 0.04 },
          y: { ...SPRING, delay: index * 0.04 },
        }}
        className={`group relative flex min-w-0 cursor-pointer select-none items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-[#242423]/30 ${
          variant === "pill"
            ? `h-12 rounded-full ${selected ? "gap-2 pl-4 pr-5" : "w-12"}`
            : iconOnly
              ? "h-12 flex-1 rounded-2xl"
              : "h-14 flex-1 flex-col gap-1 rounded-2xl"
        }`}
      >
        {variant === "pill" && selected && (
          <motion.span
            layoutId={`${groupId}-pill`}
            transition={reducedMotion ? { duration: 0 } : SPRING}
            className="absolute inset-0 rounded-full bg-[#242423]/[0.07]"
          />
        )}
        {!selected && (
          <span
            aria-hidden="true"
            className={`absolute rounded-full bg-[#242423]/[0.05] opacity-0 transition-opacity group-hover:opacity-100 ${
              variant === "pill"
                ? "inset-0"
                : iconOnly
                  ? "left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2"
                  : "left-1/2 top-1 size-10 -translate-x-1/2"
            }`}
          />
        )}

        <span className="relative grid place-items-center">
          {variant !== "pill" && selected && (
            <motion.span
              layoutId={`${groupId}-disc`}
              transition={reducedMotion ? { duration: 0 } : SPRING}
              className="absolute size-10 rounded-full bg-[#242423]/[0.07]"
            />
          )}
          <AnimatePresence>
            {!reducedMotion && tapCount > 0 && (
              <motion.span
                key={tapCount}
                aria-hidden="true"
                initial={{ scale: 0.4, opacity: 0.45 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute size-8 rounded-full bg-[#242423]/15"
              />
            )}
          </AnimatePresence>
          <motion.span
            key={tapCount}
            initial={tapCount > 0 && !reducedMotion ? { scale: 0.75, rotate: -14 } : false}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 520, damping: 11 }}
            className={`relative grid transition-colors duration-300 ${
              selected
                ? "text-[#242423]"
                : "text-[#a3a3a0] group-hover:text-[#5c5c59]"
            }`}
          >
            <Icon
              aria-hidden="true"
              className="size-[22px]"
              strokeWidth={selected ? 2.25 : 2}
              fill={activeAnimation === tab.id && tab.icon === "bell" ? "currentColor" : "none"}
            />
          </motion.span>
          <AnimatePresence>
            {!!tab.badge && (
              <motion.span
                key="badge"
                initial={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 600, damping: 26 }}
                className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#d64545] px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-white"
              >
                {tab.badge}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {variant === "pill" ? (
          <AnimatePresence initial={false} mode="popLayout">
            {selected && (
              <motion.span
                key="label"
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.25, ease: EASE }}
                className="relative whitespace-nowrap text-[14px] font-medium text-[#242423]"
              >
                {tab.label}
              </motion.span>
            )}
          </AnimatePresence>
        ) : iconOnly ? null : (
          <span
            className={`relative truncate text-[12px] leading-4 transition-colors ${
              selected
                ? "font-semibold text-[#242423]"
                : "font-medium text-[#242423]/45"
            }`}
          >
            {tab.label}
          </span>
        )}

        {variant === "labels" && selected && (
          <motion.span
            layoutId={`${groupId}-dot`}
            transition={reducedMotion ? { duration: 0 } : SPRING}
            className="absolute -bottom-1 size-1 rounded-full bg-[#242423]"
          />
        )}
      </motion.button>
    );
  };

  const splitAt = Math.ceil(visibleTabs.length / 2);

  return (
    <motion.nav
      ref={rootRef}
      aria-label="Main"
      onKeyDown={handleKeyDown}
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE }}
      className={`relative w-full max-w-[380px] rounded-full bg-white p-2 text-[#242423] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)] ${className}`}
    >
      <LayoutGroup id={groupId}>
        {variant === "action" ? (
          <div className="relative flex items-center">
            {visibleTabs.slice(0, splitAt).map(renderTab)}
            <div className="relative grid w-14 shrink-0 place-items-center sm:w-16">
              <motion.button
                type="button"
                aria-label={actionLabel}
                onClick={() => {
                  setActionCount((count) => count + 1);
                  onAction?.();
                }}
                animate={{ rotate: reducedMotion ? 0 : actionCount * 90 }}
                whileHover={reducedMotion ? undefined : { y: -3 }}
                whileTap={reducedMotion ? undefined : { scale: 0.9 }}
                transition={{ type: "spring", stiffness: 420, damping: 18 }}
                className="relative -mt-10 grid size-12 place-items-center rounded-full bg-[#242423] text-white shadow-[0_10px_22px_-10px_rgba(36,36,35,0.6)] outline-none ring-4 ring-white hover:bg-[#3a3a38] focus-visible:ring-[#242423]/30 sm:size-14"
              >
                <AnimatePresence>
                  {!reducedMotion && actionCount > 0 && (
                    <motion.span
                      key={actionCount}
                      aria-hidden="true"
                      initial={{ scale: 1, opacity: 0.4 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                      className="absolute inset-0 rounded-full bg-[#242423]/20"
                    />
                  )}
                </AnimatePresence>
                <Plus aria-hidden="true" className="relative size-6" strokeWidth={2.5} />
              </motion.button>
            </div>
            {visibleTabs.slice(splitAt).map((tab, index) =>
              renderTab(tab, index + splitAt),
            )}
          </div>
        ) : (
          <div
            className={`flex items-center ${
              variant === "pill" ? "justify-between px-1" : ""
            }`}
          >
            {visibleTabs.map(renderTab)}
          </div>
        )}
      </LayoutGroup>
    </motion.nav>
  );
}

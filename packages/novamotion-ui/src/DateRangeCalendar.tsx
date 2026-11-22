import React, { useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { CalendarDays, ChevronLeft, ChevronRight, Moon, X } from "lucide-react";

export type StayDateRange = {
  checkIn: Date | null;
  checkOut: Date | null;
};

export type DateRangeCalendarProps = {
  checkIn?: Date | null;
  checkOut?: Date | null;
  defaultCheckIn?: Date;
  defaultCheckOut?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  numberOfMonths?: 1 | 2;
  weekStartsOn?: 0 | 1;
  locale?: string;
  onChange?: (range: StayDateRange) => void;
  className?: string;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const sameDay = (left: Date | null, right: Date) =>
  Boolean(
    left &&
      left.getFullYear() === right.getFullYear() &&
      left.getMonth() === right.getMonth() &&
      left.getDate() === right.getDate(),
  );

const dayBefore = (left: Date, right: Date) =>
  startOfDay(left).getTime() < startOfDay(right).getTime();

const subscribeToToday = () => () => {};
const getTodaySnapshot = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};
const getServerTodaySnapshot = () => "2000-01-01";
const dateFromKey = (key: string) => {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year!, month! - 1, day);
};

function getMonthDays(month: Date, weekStartsOn: 0 | 1) {
  const firstDay = startOfMonth(month);
  const offset = (firstDay.getDay() - weekStartsOn + 7) % 7;
  const gridStart = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth(),
    firstDay.getDate() - offset,
  );

  return Array.from(
    { length: 42 },
    (_, index) =>
      new Date(
        gridStart.getFullYear(),
        gridStart.getMonth(),
        gridStart.getDate() + index,
      ),
  );
}

function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

function DateRangeCalendarContent({
  checkIn,
  checkOut,
  defaultCheckIn,
  defaultCheckOut,
  minDate,
  maxDate,
  disabledDates = [],
  numberOfMonths = 2,
  weekStartsOn = 0,
  locale = "en-US",
  onChange,
  className = "",
  today,
}: DateRangeCalendarProps & { today: Date }) {
  const minimumDate = startOfDay(minDate ?? today);
  const maximumDate = maxDate ? startOfDay(maxDate) : null;
  const [internalRange, setInternalRange] = useState<StayDateRange>(() => ({
    checkIn: defaultCheckIn ? startOfDay(defaultCheckIn) : null,
    checkOut: defaultCheckOut ? startOfDay(defaultCheckOut) : null,
  }));
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(
      defaultCheckIn && dayBefore(minimumDate, defaultCheckIn)
        ? defaultCheckIn
        : minimumDate,
    ),
  );
  const [slideDirection, setSlideDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const selectedRange = {
    checkIn: checkIn === undefined ? internalRange.checkIn : checkIn,
    checkOut: checkOut === undefined ? internalRange.checkOut : checkOut,
  };
  const monthCount = numberOfMonths === 1 ? 1 : 2;
  const displayedLastMonth = addMonths(visibleMonth, monthCount - 1);
  const earliestMonth = startOfMonth(minimumDate);
  const latestMonth = maximumDate ? startOfMonth(maximumDate) : null;
  const canGoBack = visibleMonth.getTime() > earliestMonth.getTime();
  const canGoForward =
    latestMonth === null || displayedLastMonth.getTime() < latestMonth.getTime();

  const weekdayLabels = Array.from({ length: 7 }, (_, index) => {
    const weekday = (weekStartsOn + index) % 7;
    return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      new Date(2023, 0, 1 + weekday),
    );
  });

  const formatDate = (date: Date | null) =>
    date
      ? new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(date)
      : "Add date";

  const nights =
    selectedRange.checkIn && selectedRange.checkOut
      ? Math.round(
          (startOfDay(selectedRange.checkOut).getTime() -
            startOfDay(selectedRange.checkIn).getTime()) /
            86_400_000,
        )
      : 0;

  const changeMonth = (amount: number) => {
    setSlideDirection(amount);
    setVisibleMonth((month) => addMonths(month, amount));
  };

  const selectDate = (date: Date) => {
    const day = startOfDay(date);
    const start = selectedRange.checkIn
      ? startOfDay(selectedRange.checkIn)
      : null;
    const end = selectedRange.checkOut
      ? startOfDay(selectedRange.checkOut)
      : null;
    const nextRange =
      !start || end || day.getTime() <= start.getTime()
        ? { checkIn: day, checkOut: null }
        : { checkIn: start, checkOut: day };

    setInternalRange(nextRange);
    onChange?.(nextRange);
  };

  const clearDates = () => {
    const emptyRange = { checkIn: null, checkOut: null };
    setInternalRange(emptyRange);
    onChange?.(emptyRange);
  };

  const calendarMonths = Array.from({ length: monthCount }, (_, index) =>
    addMonths(visibleMonth, index),
  );

  return (
    <section
      aria-label="Hotel check-in and check-out dates"
      className={`w-full max-w-[650px] rounded-[26px] border border-black/[0.06] bg-white p-4 text-[#18181B] shadow-[0_16px_45px_rgba(0,0,0,0.07)] sm:p-6 ${className}`}
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#18181B]">
            <CalendarDays aria-hidden="true" size={17} strokeWidth={1.8} />
            <h2 className="text-[14px] font-semibold tracking-[-0.02em]">
              Your stay
            </h2>
          </div>
          <p className="mt-1 text-[11px] text-[#71717A]">
            Select your check-in and check-out dates
          </p>
        </div>
        <div
          aria-live="polite"
          className="flex items-center gap-2 rounded-full bg-[#F4F4F5] px-3 py-1.5 text-[10px] font-medium text-[#52525B]"
        >
          <Moon aria-hidden="true" size={12} />
          {nights > 0 ? `${nights} ${nights === 1 ? "night" : "nights"}` : "Choose dates"}
        </div>
      </header>

      <div className="mb-5 grid grid-cols-2 gap-2.5">
        {[
          { label: "CHECK-IN", date: selectedRange.checkIn },
          { label: "CHECK-OUT", date: selectedRange.checkOut },
        ].map(({ label, date }) => (
          <div
            key={label}
            className={`min-w-0 rounded-2xl border px-3 py-2.5 transition-colors ${
              date
                ? "border-[#18181B]/15 bg-[#FAFAFA]"
                : "border-dashed border-[#D4D4D8] bg-white"
            }`}
          >
            <p className="text-[8px] font-semibold tracking-[0.13em] text-[#A1A1AA]">
              {label}
            </p>
            <p className="mt-1 truncate text-[11px] font-semibold text-[#18181B]">
              {formatDate(date)}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canGoBack}
          onClick={() => changeMonth(-1)}
          className="grid size-8 place-items-center rounded-full text-[#52525B] transition-colors hover:bg-[#F4F4F5] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft aria-hidden="true" size={16} />
        </button>
        <div className="flex min-w-0 flex-1 justify-center gap-3 text-center">
          {calendarMonths.map((month) => (
            <h3
              key={month.toISOString()}
              className="min-w-0 flex-1 text-[12px] font-semibold tracking-[-0.01em] text-[#18181B]"
            >
              {new Intl.DateTimeFormat(locale, {
                month: "long",
                year: "numeric",
              }).format(month)}
            </h3>
          ))}
        </div>
        <button
          type="button"
          aria-label="Next month"
          disabled={!canGoForward}
          onClick={() => changeMonth(1)}
          className="grid size-8 place-items-center rounded-full text-[#52525B] transition-colors hover:bg-[#F4F4F5] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight aria-hidden="true" size={16} />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
        <motion.div
          key={visibleMonth.toISOString()}
          custom={slideDirection}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: slideDirection * 14, filter: "blur(3px)" }
          }
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: slideDirection * -10, filter: "blur(2px)" }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.12 }
              : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
          }
          className={`grid gap-5 ${
            monthCount === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {calendarMonths.map((month) => {
            const days = getMonthDays(month, weekStartsOn);

            return (
              <div key={month.toISOString()}>
                <div
                  role="row"
                  className="mb-1.5 grid grid-cols-7 place-items-center"
                >
                  {weekdayLabels.map((weekday, index) => (
                    <span
                      key={`${weekday}-${index}`}
                      role="columnheader"
                      className="grid size-8 place-items-center text-[9px] font-medium text-[#A1A1AA]"
                    >
                      {weekday}
                    </span>
                  ))}
                </div>
                <div
                  role="grid"
                  aria-label={new Intl.DateTimeFormat(locale, {
                    month: "long",
                    year: "numeric",
                  }).format(month)}
                  className="grid grid-cols-7 gap-y-1"
                >
                  {days.map((date) => {
                    const inCurrentMonth = isSameMonth(date, month);
                    const isCheckIn = sameDay(selectedRange.checkIn, date);
                    const isCheckOut = sameDay(selectedRange.checkOut, date);
                    const isEndpoint = isCheckIn || isCheckOut;
                    const isInRange = Boolean(
                      selectedRange.checkIn &&
                        selectedRange.checkOut &&
                        dayBefore(selectedRange.checkIn, date) &&
                        dayBefore(date, selectedRange.checkOut),
                    );
                    const isDisabled =
                      !inCurrentMonth ||
                      dayBefore(date, minimumDate) ||
                      Boolean(maximumDate && dayBefore(maximumDate, date)) ||
                      disabledDates.some((disabledDate) =>
                        sameDay(disabledDate, date),
                      );
                    const isToday = sameDay(today, date);
                    const endpointLabel = isCheckIn
                      ? "Check-in"
                      : isCheckOut
                        ? "Check-out"
                        : "";
                    const displayDate = new Intl.DateTimeFormat(locale, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }).format(date);

                    return (
                      <div
                        key={date.toISOString()}
                        role="gridcell"
                        aria-selected={isEndpoint || isInRange}
                        className={`relative grid size-8 place-items-center ${
                          isInRange ? "bg-sky-50" : ""
                        } ${isCheckIn && selectedRange.checkOut ? "rounded-l-full" : ""} ${
                          isCheckOut ? "rounded-r-full" : ""
                        }`}
                      >
                        <button
                          type="button"
                          aria-label={`${displayDate}${endpointLabel ? `, ${endpointLabel}` : ""}`}
                          aria-pressed={isEndpoint}
                          disabled={isDisabled}
                          onClick={() => selectDate(date)}
                          className={`relative z-10 grid size-8 place-items-center rounded-full text-[10px] font-medium tabular-nums transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#18181B] ${
                            isEndpoint
                              ? "bg-[#18181B] text-white shadow-[0_3px_10px_rgba(24,24,27,0.2)]"
                              : isDisabled
                                ? "cursor-not-allowed text-[#D4D4D8]"
                                : isToday
                                  ? "text-[#18181B] ring-1 ring-inset ring-[#D4D4D8] hover:bg-[#F4F4F5]"
                                  : "text-[#3F3F46] hover:bg-[#F4F4F5]"
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <footer className="mt-4 flex min-h-8 items-center justify-between gap-3 border-t border-[#F4F4F5] pt-3">
        <p aria-live="polite" className="text-[10px] text-[#71717A]">
          {selectedRange.checkIn && !selectedRange.checkOut
            ? "Now choose your check-out"
            : selectedRange.checkIn && selectedRange.checkOut
              ? `${formatDate(selectedRange.checkIn)} – ${formatDate(selectedRange.checkOut)}`
              : "Your dates are flexible"}
        </p>
        {(selectedRange.checkIn || selectedRange.checkOut) && (
          <button
            type="button"
            onClick={clearDates}
            className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium text-[#71717A] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B]"
          >
            <X aria-hidden="true" size={11} />
            Clear
          </button>
        )}
      </footer>
    </section>
  );
}

export function DateRangeCalendar(props: DateRangeCalendarProps) {
  const todayKey = useSyncExternalStore(
    subscribeToToday,
    getTodaySnapshot,
    getServerTodaySnapshot,
  );
  const today = dateFromKey(todayKey);

  return <DateRangeCalendarContent key={todayKey} {...props} today={today} />;
}

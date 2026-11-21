import React from "react";

export type ChartPoint = {
  label: string;
  value: number;
};

export type ChartProps = {
  data?: ChartPoint[];
  title?: string;
  className?: string;
};

const DEFAULT_DATA: ChartPoint[] = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 68 },
  { label: "Wed", value: 54 },
  { label: "Thu", value: 86 },
  { label: "Fri", value: 63 },
  { label: "Sat", value: 96 },
  { label: "Sun", value: 72 },
];

function ChartShell({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`w-full max-w-[390px] rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] ${className}`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-[#71717A]">Preview data</p>
          <h3 className="mt-1 text-[14px] font-semibold text-[#18181B]">
            {title}
          </h3>
        </div>
        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-semibold text-[#52525B]">
          Sample
        </span>
      </div>
      {children}
    </section>
  );
}

export function BarChart({
  data = DEFAULT_DATA,
  title = "Weekly activity",
  className = "",
}: ChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);

  return (
    <ChartShell title={title} className={className}>
      <div
        role="img"
        aria-label={`${title}: ${data.map(({ label, value }) => `${label} ${value}`).join(", ")}`}
        className="grid h-[130px] grid-cols-7 items-end gap-2"
      >
        {data.map((point, index) => (
          <div
            key={`${point.label}-${index}`}
            className="group flex h-full flex-col items-center justify-end gap-2"
          >
            <div className="flex h-[104px] w-full items-end rounded-lg bg-[#F4F4F5] p-1">
              <span
                className={`w-full rounded-md transition-[height,background-color] duration-300 group-hover:bg-[#E9CC00] ${
                  index === data.length - 1 ? "bg-[#FFDD00]" : "bg-[#18181B]"
                }`}
                style={{
                  height: `${Math.max((point.value / maxValue) * 100, 4)}%`,
                }}
              />
            </div>
            <span className="text-[9px] font-medium text-[#71717A]">
              {point.label}
            </span>
          </div>
        ))}
      </div>
    </ChartShell>
  );
}

export function LineChart({
  data = DEFAULT_DATA,
  title = "Weekly activity",
  className = "",
}: ChartProps) {
  const maxValue = Math.max(...data.map((point) => point.value), 1);
  const points = data.map((point, index) => {
    const x = data.length <= 1 ? 160 : 18 + (index / (data.length - 1)) * 284;
    const y = 110 - (point.value / maxValue) * 86;
    return `${x},${y}`;
  });
  const chartDescription = data
    .map(({ label, value }) => `${label} ${value}`)
    .join(", ");

  return (
    <ChartShell title={title} className={className}>
      <div
        role="img"
        aria-label={`${title}: ${chartDescription}`}
        className="w-full"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 320 142"
          className="h-[132px] w-full overflow-visible"
          preserveAspectRatio="none"
        >
          {[30, 58, 86, 114].map((y) => (
            <line
              key={y}
              x1="14"
              x2="306"
              y1={y}
              y2={y}
              stroke="#E4E4E7"
              strokeDasharray="3 5"
            />
          ))}
          <polyline
            points={`18,132 ${points.join(" ")} 302,132`}
            fill="rgba(255,221,0,0.15)"
            stroke="none"
          />
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke="#18181B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
          {points.map((point, index) => {
            const [cx, cy] = point.split(",");
            return (
              <circle
                key={`${data[index].label}-${index}`}
                cx={cx}
                cy={cy}
                r="3.5"
                fill={index === points.length - 1 ? "#FFDD00" : "#18181B"}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="mt-1 flex justify-between px-1">
          {data.map((point, index) => (
            <span
              key={`${point.label}-${index}`}
              className="text-[9px] font-medium text-[#71717A]"
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

export function DonutChart({
  data = [
    { label: "Design", value: 38 },
    { label: "Development", value: 32 },
    { label: "Research", value: 18 },
    { label: "Other", value: 12 },
  ],
  title = "Time by activity",
  className = "",
}: ChartProps) {
  const total = data.reduce((sum, point) => sum + Math.max(point.value, 0), 0);
  const radius = 39;
  const circumference = 2 * Math.PI * radius;
  const colors = ["#FFDD00", "#18181B", "#A1A1AA", "#E4E4E7"];
  const segments = data.map((point, index) => {
    const segment = total
      ? (Math.max(point.value, 0) / total) * circumference
      : 0;
    const offset = data
      .slice(0, index)
      .reduce(
        (sum, previous) =>
          sum + (total ? (Math.max(previous.value, 0) / total) * circumference : 0),
        0,
      );

    return { point, index, segment, offset };
  });

  return (
    <ChartShell title={title} className={className}>
      <div className="flex items-center justify-center gap-5 py-1">
        <div
          role="img"
          aria-label={`${title}: ${data.map(({ label, value }) => `${label} ${value}`).join(", ")}`}
          className="relative size-[122px] shrink-0"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            className="size-full -rotate-90"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#F4F4F5"
              strokeWidth="12"
            />
            {segments.map(({ point, index, segment, offset }) => {
              return (
                <circle
                  key={`${point.label}-${index}`}
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeDasharray={`${segment} ${circumference - segment}`}
                  strokeDashoffset={-offset}
                  strokeWidth="12"
                  className="transition-[stroke-dasharray,stroke-dashoffset] duration-500"
                />
              );
            })}
          </svg>
          <span className="absolute inset-0 grid place-items-center text-[15px] font-semibold text-[#18181B]">
            {total}
          </span>
        </div>
        <ul className="min-w-0 space-y-2.5">
          {data.map((point, index) => (
            <li
              key={`${point.label}-${index}`}
              className="flex items-center gap-2 text-[10px] text-[#52525B]"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: colors[index % colors.length] }}
              />
              <span className="truncate">{point.label}</span>
              <span className="font-semibold text-[#18181B]">{point.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </ChartShell>
  );
}

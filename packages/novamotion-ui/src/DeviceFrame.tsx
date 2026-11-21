import type { ReactNode } from "react";

export type DeviceFrameKind = "android" | "ios" | "watch";

export interface DeviceFrameProps {
  device?: DeviceFrameKind;
  children: ReactNode;
  className?: string;
}

function StatusBar({ device }: { device: Exclude<DeviceFrameKind, "watch"> }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-8 shrink-0 items-center justify-between px-4 text-[9px] font-semibold text-[#18181B]"
    >
      <span>9:41</span>
      {device === "ios" ? (
        <span className="absolute left-1/2 top-1.5 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-[#18181B]" />
      ) : (
        <span className="absolute left-1/2 top-2 size-2 -translate-x-1/2 rounded-full bg-[#18181B]" />
      )}
      <span className="flex items-center gap-1">
        <span className="h-2 w-3 rounded-[2px] border border-current p-px">
          <span className="block h-full w-2/3 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

function PhoneFrame({
  device,
  children,
}: {
  device: Exclude<DeviceFrameKind, "watch">;
  children: ReactNode;
}) {
  const isIOS = device === "ios";

  return (
    <div
      className={`relative mx-auto w-full max-w-[260px] rounded-[38px] p-[7px] shadow-[0_20px_40px_rgba(24,24,27,0.2)] ${
        isIOS
          ? "border border-[#3F3F46] bg-[#18181B]"
          : "rounded-[30px] border border-[#52525B] bg-[#27272A]"
      }`}
      data-device-frame={device}
    >
      <div
        className={`relative flex aspect-[0.49] flex-col overflow-hidden bg-white ${
          isIOS ? "rounded-[31px]" : "rounded-[23px]"
        }`}
      >
        <StatusBar device={device} />
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        <div aria-hidden="true" className="flex h-5 shrink-0 items-center justify-center">
          {isIOS ? (
            <span className="h-1 w-20 rounded-full bg-[#18181B]" />
          ) : (
            <span className="size-1 rounded-full bg-[#D4D4D8]" />
          )}
        </div>
      </div>
      {!isIOS && (
        <span
          aria-hidden="true"
          className="absolute -right-[3px] top-24 h-12 w-[3px] rounded-r-full bg-[#71717A]"
        />
      )}
    </div>
  );
}

function WatchFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[190px]" data-device-frame="watch">
      <div
        aria-hidden="true"
        className="mx-auto h-12 w-[72px] rounded-t-[24px] border-x border-t border-[#A1A1AA] bg-gradient-to-r from-[#D4D4D8] via-[#F4F4F5] to-[#D4D4D8]"
      />
      <div className="relative rounded-[42px] border border-[#52525B] bg-[#27272A] p-[7px] shadow-[0_16px_30px_rgba(24,24,27,0.2)]">
        <div className="relative flex aspect-square flex-col overflow-hidden rounded-[34px] bg-white">
          <div
            aria-hidden="true"
            className="flex h-7 shrink-0 items-center justify-center text-[9px] font-semibold text-[#18181B]"
          >
            9:41
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
        <span
          aria-hidden="true"
          className="absolute -right-[5px] top-12 h-8 w-1 rounded-r-full bg-[#A1A1AA]"
        />
      </div>
      <div
        aria-hidden="true"
        className="mx-auto h-12 w-[72px] rounded-b-[24px] border-x border-b border-[#A1A1AA] bg-gradient-to-r from-[#D4D4D8] via-[#F4F4F5] to-[#D4D4D8]"
      />
    </div>
  );
}

export function DeviceFrame({
  device = "ios",
  children,
  className = "",
}: DeviceFrameProps) {
  if (device === "watch") {
    return (
      <div className={className}>
        <WatchFrame>{children}</WatchFrame>
      </div>
    );
  }

  return (
    <div className={className}>
      <PhoneFrame device={device}>{children}</PhoneFrame>
    </div>
  );
}

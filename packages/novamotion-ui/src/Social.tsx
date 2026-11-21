"use client";

import React, { useState } from "react";
import {
  SocialProviderIcon,
  type SocialProvider,
} from "./SocialProviderIcon.js";

export interface SocialProps {
  onProviderClick?: (provider: SocialProvider) => void | Promise<void>;
  className?: string;
}

const PROVIDERS: { id: SocialProvider; label: string }[] = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
  { id: "apple", label: "Apple" },
];

export function Social({ onProviderClick, className = "" }: SocialProps) {
  const [busy, setBusy] = useState<SocialProvider | null>(null);
  const [error, setError] = useState("");

  const signIn = async (provider: SocialProvider) => {
    if (busy) return;
    if (!onProviderClick) {
      setError("Connect onProviderClick to handle social sign-in.");
      return;
    }

    setBusy(provider);
    setError("");
    try {
      await onProviderClick(provider);
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "Social sign-in failed.",
      );
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className={`flex w-full max-w-xs flex-col gap-3 ${className}`}>
      {PROVIDERS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          disabled={busy !== null}
          onClick={() => void signIn(id)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#E4E4E7] bg-white px-4 text-sm font-medium text-[#18181B] transition-colors hover:bg-[#F8F8F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-wait disabled:opacity-60"
        >
          <SocialProviderIcon provider={id} />
          <span>
            {busy === id ? `Connecting to ${label}...` : `Sign in with ${label}`}
          </span>
        </button>
      ))}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

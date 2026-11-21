"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { SocialProviderIcon, type SocialProvider } from "./SocialProviderIcon.js";

export type AuthMode = "signin" | "signup";
export type AuthProvider = SocialProvider;

export interface AuthDetails {
  mode: AuthMode;
  email: string;
  password: string;
  name?: string;
}

export interface AuthCardProps {
  defaultMode?: AuthMode;
  mode?: AuthMode;
  onModeChange?: (mode: AuthMode) => void;
  onSubmit?: (details: AuthDetails) => void | Promise<void>;
  onSocial?: (provider: AuthProvider) => void | Promise<void>;
  onForgotPassword?: (email: string) => void | Promise<void>;
  logo?: React.ReactNode;
  className?: string;
}

const COPY = {
  signin: {
    title: "Welcome back",
    description: "Sign in to pick up where you left off.",
    submit: "Sign in",
    busy: "Signing in...",
    success: "Signed in successfully.",
    switchPrompt: "Don't have an account?",
    switchAction: "Create account",
  },
  signup: {
    title: "Create your account",
    description: "Get started in just a few steps.",
    submit: "Create account",
    busy: "Creating account...",
    success: "Account created successfully.",
    switchPrompt: "Already have an account?",
    switchAction: "Sign in",
  },
} satisfies Record<AuthMode, Record<string, string>>;

export function AuthCard({
  defaultMode = "signin",
  mode: controlledMode,
  onModeChange,
  onSubmit,
  onSocial,
  onForgotPassword,
  logo,
  className = "",
}: AuthCardProps) {
  const reducedMotion = useReducedMotion();
  const [uncontrolledMode, setUncontrolledMode] = useState<AuthMode>(defaultMode);
  const mode = controlledMode ?? uncontrolledMode;
  const copy = COPY[mode];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  const changeMode = () => {
    const nextMode = mode === "signin" ? "signup" : "signin";
    if (controlledMode === undefined) setUncontrolledMode(nextMode);
    onModeChange?.(nextMode);
    setMessage("");
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setMessage("");
    setMessageIsError(false);
    try {
      await onSubmit?.({
        mode,
        email: email.trim(),
        password,
        ...(mode === "signup" ? { name: name.trim() } : {}),
      });
      setMessage(onSubmit ? copy.success : "Preview only — connect an onSubmit handler to your backend.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
      setMessageIsError(true);
    } finally {
      setBusy(false);
    }
  };

  const submitSocial = async (provider: AuthProvider) => {
    if (!onSocial || busy) {
      setMessage("Provide an onSocial handler to connect provider sign-in.");
      setMessageIsError(true);
      return;
    }

    setBusy(true);
    setMessage("");
    setMessageIsError(false);
    try {
      await onSocial(provider);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Provider sign-in failed. Please try again.",
      );
      setMessageIsError(true);
    } finally {
      setBusy(false);
    }
  };

  const forgotPassword = async () => {
    if (!onForgotPassword) {
      setMessage("Provide an onForgotPassword handler to connect password recovery.");
      setMessageIsError(true);
      return;
    }

    setMessage("");
    setMessageIsError(false);
    try {
      await onForgotPassword(email.trim());
      setMessage("Password recovery request sent.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Could not request password recovery.",
      );
      setMessageIsError(true);
    }
  };

  const fieldClass =
    "h-12 w-full rounded-xl border border-[#E4E4E7] bg-[#FAFAFA] px-4 text-sm text-[#18181B] outline-none transition focus:border-[#A1A1AA] focus:bg-white focus:ring-2 focus:ring-black/5";

  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`w-full max-w-[390px] rounded-[28px] border border-black/[0.05] bg-white p-5 text-[#18181B] shadow-[0_12px_36px_rgba(0,0,0,0.08)] sm:p-7 ${className}`}
    >
      <header className="mb-6 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-2xl bg-[#18181B] text-white">
          {logo ?? <LockKeyhole aria-hidden="true" size={22} />}
        </div>
        <h2 className="text-xl font-bold tracking-tight">{copy.title}</h2>
        <p className="mt-1 text-sm text-[#71717A]">{copy.description}</p>
      </header>

      <form className="space-y-4" onSubmit={submit}>
        <AnimatePresence initial={false}>
          {mode === "signup" && (
            <motion.div
              key="name"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <label className="mb-1.5 block text-xs font-medium text-[#52525B]" htmlFor="auth-name">
                Name
              </label>
              <div className="relative">
                <UserRound aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={17} />
                <input
                  id="auth-name"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className={`${fieldClass} pl-10`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#52525B]" htmlFor="auth-email">
            Email address
          </label>
          <div className="relative">
            <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={17} />
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={`${fieldClass} pl-10`}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#52525B]" htmlFor="auth-password">
            Password
          </label>
          <div className="relative">
            <LockKeyhole aria-hidden="true" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1A1AA]" size={17} />
            <input
              id="auth-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              minLength={mode === "signup" ? 8 : undefined}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
              className={`${fieldClass} pl-10 pr-12`}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-[#71717A] hover:bg-[#F4F4F5]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>

        {mode === "signin" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={forgotPassword}
              className="text-xs font-medium text-[#52525B] underline-offset-4 hover:text-[#18181B] hover:underline"
            >
              Forgot password?
            </button>
          </div>
        )}

        {message && (
          <p
            role={messageIsError ? "alert" : "status"}
            className={`text-xs leading-relaxed ${messageIsError ? "text-red-700" : "text-emerald-700"}`}
          >
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="flex h-12 w-full items-center justify-center rounded-full bg-[#18181B] px-4 text-sm font-semibold text-white transition hover:bg-[#303036] disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? copy.busy : copy.submit}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#A1A1AA]">
        <span className="h-px flex-1 bg-[#E4E4E7]" />
        or continue with
        <span className="h-px flex-1 bg-[#E4E4E7]" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(["google", "apple", "github"] as const).map((provider) => (
          <button
            key={provider}
            type="button"
            disabled={busy}
            onClick={() => submitSocial(provider)}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#E4E4E7] text-xs font-medium capitalize text-[#52525B] transition hover:bg-[#F8F8F8] disabled:opacity-60"
          >
            <SocialProviderIcon provider={provider} className="size-4" />
            <span>{provider === "github" ? "GitHub" : provider}</span>
          </button>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-[#71717A]">
        {copy.switchPrompt}{" "}
        <button
          type="button"
          onClick={changeMode}
          className="font-semibold text-[#18181B] underline-offset-4 hover:underline"
        >
          {copy.switchAction}
        </button>
      </p>
    </motion.section>
  );
}

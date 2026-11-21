'use client';

import { useState } from 'react';
import Link from 'next/link';
import NovaMotionMascot from './NovaMotionMascot';

const LIBRARY_LINKS = [
  { label: 'Components', href: '/components' },
  { label: 'About NovaMotion', href: '/about' },
  { label: 'MCP server', href: '/mcp' },
];

const POPULAR_LINKS = [
  { label: 'Buttons', href: '/components?search=button' },
  { label: 'Cards', href: '/components?search=card' },
  { label: 'Loaders', href: '/components?search=loader' },
  { label: 'Search', href: '/components?search=search' },
];

export default function Footer() {
  const [copyState, setCopyState] = useState('idle');

  const handleCopyMcp = async () => {
    if (!navigator.clipboard?.writeText) {
      setCopyState('unavailable');
      return;
    }

    setCopyState('copying');
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/mcp`);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
  };

  const handleScrollTop = () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const copyLabel = {
    idle: 'Copy MCP URL',
    copying: 'Copying...',
    copied: 'MCP link copied',
    unavailable: 'Clipboard unavailable',
    failed: 'Copy failed - try again',
  }[copyState];

  return (
    <footer className="w-full bg-white px-4 pb-8 pt-6 font-sans antialiased text-[#18181B] sm:px-8">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-[28px] border border-black/[0.04] bg-[#F4F4F5] px-6 pb-0 pt-10 sm:px-10 sm:pt-12 lg:px-12">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-12">
          <div className="max-w-sm pr-2">
            <Link
              href="/"
              aria-label="NovaMotion home"
              className="mb-4 inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
            >
              <NovaMotionMascot size={32} interactive={false} />
              <span className="text-[15px] font-bold tracking-tight">
                NovaMotion
              </span>
            </Link>
            <p className="max-w-[270px] text-[13.5px] leading-[1.65] text-[#71717A]">
              Handcrafted motion components for React and Tailwind CSS. Explore
              each component, then make it your own.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-[12.5px] font-medium text-[#A1A1AA]">
              Library
            </h2>
            <ul className="space-y-3">
              {LIBRARY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13.5px] text-[#3F3F46] transition-colors hover:text-[#18181B] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[12.5px] font-medium text-[#A1A1AA]">
              Popular components
            </h2>
            <ul className="space-y-3">
              {POPULAR_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13.5px] text-[#3F3F46] transition-colors hover:text-[#18181B] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[12.5px] font-medium text-[#A1A1AA]">
              For AI agents
            </h2>
            <p className="mb-4 max-w-[260px] text-[13px] leading-5 text-[#71717A]">
              Connect your tools to the NovaMotion component library.
            </p>
            <Link
              href="/mcp"
              className="text-[13.5px] text-[#3F3F46] transition-colors hover:text-[#18181B] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C3AED]"
            >
              Explore the MCP server
            </Link>
            <div className="mt-4">
              <button
                type="button"
                onClick={handleCopyMcp}
                className="inline-flex max-w-full items-center gap-2 rounded-lg border border-[#E4E4E7] bg-white px-2.5 py-2 font-mono text-[11px] text-[#52525B] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
              >
                <span aria-live="polite" className="truncate">
                  {copyLabel}
                </span>
                <svg
                  aria-hidden="true"
                  className="shrink-0 text-[#71717A]"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-4 border-t border-[#E6E6E9] py-5 text-center text-[12px] text-[#71717A] sm:flex-row sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:justify-start">
            <span>© NovaMotion. All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span>Built for interfaces in motion.</span>
          </div>
          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#18181B] shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-colors hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C3AED]"
          >
            <svg
              aria-hidden="true"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
            Back to top
          </button>
        </div>

        <div
          aria-hidden="true"
          className="-mx-3 flex h-[82px] select-none items-start justify-center overflow-hidden sm:-mx-10 sm:h-[120px] lg:-mx-12 lg:h-[155px]"
        >
          <span className="whitespace-nowrap text-[76px] font-bold leading-[0.86] tracking-[-0.06em] text-[#18181B]/[0.04] sm:text-[125px] lg:text-[190px]">
            NovaMotion
          </span>
        </div>
      </div>
    </footer>
  );
}

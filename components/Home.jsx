import React from 'react';
import { Cookie } from 'next/font/google';
import Link from 'next/link';
import Footer from './Footer';

const cookieFont = Cookie({
  weight: '400',
  subsets: ['latin'],
});

export default function Home() {
  return (
    <div className="flex-1 bg-white text-[#18181B] flex flex-col font-sans antialiased selection:bg-[#FFDD00]/40">
      {/* Main Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-28 text-center">


        {/* Subtitle Tagline */}
        <p className="text-[13.5px] text-[#71717A] font-normal tracking-[-0.005em] mb-5">
          Free animated React component library
        </p>

        {/* Main Hero Headline */}
        <h1 className="max-w-[780px] text-[44px] sm:text-[64px] md:text-[72px] font-bold tracking-[-0.038em] leading-[1.04] text-[#18181B] mb-7">
          Interfaces that move
          <br />
          like they mean it.
        </h1>

        {/* Supporting Paragraph with Hand-drawn Red Underline */}
        <p className="max-w-[540px] text-[16px] sm:text-[17.5px] leading-[1.6] text-[#52525B] font-normal mb-10">
          Hand-tuned motion components for React,{' '}
          <span className="relative inline-block font-semibold text-[#18181B]">
            completely free.
            {/* Hand-drawn red underline SVG */}
            <svg
              aria-hidden="true"
              viewBox="0 0 165 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 -bottom-[5px] w-full h-[7px] pointer-events-none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 6.5C46 2.5 118 2.2 163 5.8"
                stroke="#F43F5E"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          Play with each one live, then copy the code or give your AI agent the
          prompt that comes with it.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/components"
            className="inline-flex items-center justify-center gap-2.5 bg-[#18181B] hover:bg-[#27272A] active:scale-[0.99] text-white px-7 py-3 rounded-full shadow-[0_2px_10px_rgba(24,24,27,0.16)] transition-all duration-150"
          >
            <span className="text-[15px] font-semibold tracking-[-0.01em]">
              Browse Components
            </span>
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>

          <a
            href="https://www.buymeacoffee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#FFDD00] hover:bg-[#f7d600] active:scale-[0.99] text-[#18181B] px-7 py-3 rounded-full shadow-[0_2px_10px_rgba(255,221,0,0.35)] transition-all duration-150"
          >
            {/* Coffee Cup Icon */}
            <svg
              width="22"
              height="24"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 6.5H19L17.8 3.5H6.2L5 6.5Z"
                fill="white"
                stroke="#18181B"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M3.8 6.5H20.2"
                stroke="#18181B"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M5.5 6.5L7.2 22.5H16.8L18.5 6.5H5.5Z"
                fill="white"
                stroke="#18181B"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M6.2 11.5H17.8L17.3 17.5H6.7L6.2 11.5Z"
                fill="#FFDD00"
                stroke="#18181B"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className={`${cookieFont.className} text-[26px] leading-none tracking-[0.01em] text-[#18181B] pt-0.5`}
            >
              Buy me a coffee
            </span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
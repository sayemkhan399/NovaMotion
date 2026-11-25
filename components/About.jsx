import React from 'react';
import Link from 'next/link';
import Footer from './Footer';

export default function About() {
  const pillars = [
    {
      title: 'NovaMotion · UI Motion Library',
      description:
        'An open-source React motion toolkit crafted by NovaMatrix—delivering copy-paste micro-interactions, live browser previews, and AI-ready prompts.',
    },
    {
      title: 'Software & Product Engineering',
      description:
        'Beyond NovaMotion, NovaMatrix builds custom websites, web applications, mobile apps, and scalable digital products tailored to real project needs.',
    },
    {
      title: 'UI/UX & Brand Design',
      description:
        'From user flows, wireframes, and interactive prototypes to cohesive brand graphics, our studio pairs crisp visual systems with production code.',
    },
  ];

  return (
    <div className="flex-1 bg-white text-[#18181B] flex flex-col font-sans antialiased selection:bg-[#FFDD00]/40">
      <main className="flex-1 max-w-[920px] w-full mx-auto px-6 pt-16 pb-28">
        {/* Product-by-Studio Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFDD00]/35 border border-[#FFDD00] text-[12.5px] font-semibold text-[#18181B] mb-6">
          <span>NovaMotion</span>
          <span className="text-[#71717A]">•</span>
          <span>A NovaMatrix Product</span>
        </div>

        {/* Main Headline */}
        <h1 className="max-w-[780px] text-[40px] sm:text-[56px] md:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[#18181B] mb-7">
          NovaMotion is crafted by{' '}
          <span className="relative inline-block">
            NovaMatrix.
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
          </span>
        </h1>

        {/* Highlighted Product Relationship Copy */}
        <p className="max-w-[680px] text-[17px] sm:text-[18.5px] leading-[1.65] text-[#52525B] mb-12">
          <strong className="font-semibold text-[#18181B]">NovaMotion</strong> is
          an official open-source UI motion product developed by{' '}
          <a
            href="https://www.novamatrix.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#18181B] underline decoration-[#F43F5E] decoration-2 underline-offset-4 hover:opacity-80"
          >
            NovaMatrix
          </a>
          —a software development, UI/UX, and graphic design studio based in
          Dhaka, Bangladesh. Built from our everyday product engineering work,
          NovaMotion gives developers free, ready-to-use React animations
          alongside the broader digital solutions we ship for clients.
        </p>

        {/* Three Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pillars.map((item, index) => (
            <div
              key={item.title}
              className={`p-6 rounded-2xl border transition-colors duration-150 ${
                index === 0
                  ? 'border-[#18181B] bg-[#FAFAFA] shadow-[0_4px_20px_rgba(24,24,27,0.06)]'
                  : 'border-[#E4E4E7] bg-[#FAFAFA] hover:border-[#18181B]/30'
              }`}
            >
              <span className="inline-block text-[12px] font-bold tracking-wider uppercase text-[#18181B] bg-[#FFDD00] px-2.5 py-1 rounded-full mb-4">
                {index === 0 ? 'Flagship UI Product' : `0${index + 1}`}
              </span>
              <h2 className="text-[19px] font-bold tracking-[-0.02em] text-[#18181B] mb-2.5">
                {item.title}
              </h2>
              <p className="text-[15px] leading-[1.6] text-[#52525B]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#18181B] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#FFDD00] mb-1.5">
              Behind NovaMotion
            </p>
            <h3 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.03em] mb-2">
              Explore more from NovaMatrix
            </h3>
            <p className="text-[15px] text-[#A1A1AA] max-w-[480px]">
              Need custom software, mobile apps, UI/UX, or brand design? Visit
              NovaMatrix or get in touch at{' '}
              <a
                href="mailto:novamatrixtech@gmail.com"
                className="text-white underline underline-offset-4"
              >
                novamatrixtech@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://www.novamatrix.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#FFDD00] hover:bg-[#f7d600] active:scale-[0.98] text-[#18181B] px-6 py-3 rounded-full text-[15px] font-semibold transition-all duration-150"
            >
              <span>Visit NovaMatrix</span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>

            <Link
              href="/components"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 text-white text-[15px] font-medium transition-colors duration-150"
            >
              Explore NovaMotion
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { SEARCH_ITEMS } from './searchItems';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchResult, setActiveSearchResult] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [emotion, setEmotion] = useState('happy');
  const [blinking, setBlinking] = useState(false);

  const mascotRef = useRef(null);

  const navItems = [
    { label: 'About', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'MCP', href: '/mcp' },
  ];

  const normalizedQuery = searchQuery.trim().toLowerCase().replace(/[\s-]/g, '');
  const searchResults = normalizedQuery
    ? SEARCH_ITEMS.filter((item) =>
        `${item.title} ${item.category} ${item.keywords}`
          .toLowerCase()
          .replace(/[\s-]/g, '')
          .includes(normalizedQuery)
      ).slice(0, 8)
    : SEARCH_ITEMS.slice(0, 6);

  const isActive = (href) =>
    href === '/components'
      ? pathname === href || pathname.startsWith(`${href}/`)
      : href === '/'
        ? pathname === '/' || pathname === '/about'
        : pathname === href;

  // Eye movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const eyeX = useSpring(mouseX, {
    stiffness: 180,
    damping: 20,
  });

  const eyeY = useSpring(mouseY, {
    stiffness: 180,
    damping: 20,
  });

  // Track cursor position relative to mascot
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!mascotRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;

      mouseX.set(Math.max(-3, Math.min(3, dx / 25)));
      mouseY.set(Math.max(-3, Math.min(3, dy / 25)));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Automatic blinking
  useEffect(() => {
    let blinkTimeout;
    let resetTimeout;

    const blink = () => {
      setBlinking(true);

      resetTimeout = setTimeout(() => {
        setBlinking(false);
      }, 130);

      blinkTimeout = setTimeout(
        blink,
        2200 + Math.random() * 2800
      );
    };

    blinkTimeout = setTimeout(blink, 1500);

    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(resetTimeout);
    };
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('novamotion-theme');
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMobileNavOpen(false);
        setSearchOpen((open) => !open);
      } else if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    const selectedResult = searchResults[activeSearchResult];

    if (selectedResult) {
      router.push(selectedResult.href);
    } else if (query) {
      router.push(`/components?search=${encodeURIComponent(query)}`);
      if (pathname === '/components') {
        window.dispatchEvent(
          new CustomEvent('novamotion:component-search', { detail: query })
        );
      }
    }
    setSearchOpen(false);
  };

  const handleSearchKeyDown = (event) => {
    if (!searchResults.length) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveSearchResult((index) =>
        Math.min(index + 1, searchResults.length - 1)
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveSearchResult((index) => Math.max(index - 1, 0));
    }
  };

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('novamotion-theme', nextTheme);
  };

  // Expression settings
  const expressions = {
    happy: {
      mouthWidth: 9,
      mouthHeight: 4,
      mouthRadius: '0 0 10px 10px',
      mouthBackground: 'transparent',
      mouthBorder: '1.5px solid #18181B',
      eyeScale: 1,
    },
    excited: {
      mouthWidth: 7,
      mouthHeight: 7,
      mouthRadius: '50%',
      mouthBackground: '#18181B',
      mouthBorder: 'none',
      eyeScale: 1.15,
    },
    curious: {
      mouthWidth: 6,
      mouthHeight: 3,
      mouthRadius: '50%',
      mouthBackground: 'transparent',
      mouthBorder: '1.5px solid #18181B',
      eyeScale: 1.15,
    },
    surprised: {
      mouthWidth: 5,
      mouthHeight: 7,
      mouthRadius: '50%',
      mouthBackground: '#18181B',
      mouthBorder: 'none',
      eyeScale: 1.2,
    },
  };

  const currentExpression = expressions[emotion] || expressions.happy;

  return (
    <header className="relative z-50 w-full bg-white px-6 py-5 sm:px-14 sm:py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        {/* Left: Animated Brand Logo */}
        <Link
          href="/"
          aria-label="NovaMotion Home"
          aria-current={pathname === '/' ? 'page' : undefined}
          onClick={() => {
            setMobileNavOpen(false);
            setSearchOpen(false);
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <motion.div
            ref={mascotRef}
            onMouseEnter={() => setEmotion('excited')}
            onMouseLeave={() => setEmotion('happy')}
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 rounded-full border-[1.8px] border-[#18181B] overflow-hidden bg-[#FFFDF7] relative shrink-0 shadow-sm cursor-pointer"
          >
            {/* Cream Foam */}
            <div className="absolute top-0 left-0 w-full h-[53%]">

              <span className="absolute top-[5px] left-[8px] w-[2.5px] h-[2.5px] rounded-full bg-[#18181B]" />

              <span className="absolute top-[7px] right-[8px] w-[2.5px] h-[2.5px] rounded-full bg-[#18181B]" />

            </div>

            {/* Animated Eyes */}
            <div className="absolute top-[12px] left-0 w-full flex justify-center items-center gap-[7px] z-20">

              {[0, 1].map((eye) => (
                <motion.div
                  key={eye}
                  style={{
                    x: eyeX,
                    y: eyeY,
                  }}
                  animate={{
                    scaleY: blinking ? 0.08 : currentExpression.eyeScale,
                  }}
                  transition={{
                    duration: 0.12,
                    ease: 'easeOut',
                  }}
                  className="w-[6px] h-[7px] rounded-full bg-[#18181B] relative origin-center"
                >
                  {/* Eye Highlight */}
                  <span className="absolute top-[1px] right-[1px] w-[2px] h-[2px] rounded-full bg-white" />
                </motion.div>
              ))}

            </div>

            {/* Animated Mouth */}
            <motion.div
              className="absolute z-20 left-1/2 -translate-x-1/2"
              animate={{
                width: currentExpression.mouthWidth,
                height: currentExpression.mouthHeight,
                borderRadius: currentExpression.mouthRadius,
                backgroundColor: currentExpression.mouthBackground,
                borderBottom: currentExpression.mouthBorder,
                bottom: emotion === 'excited' ? 7 : 8,
              }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
              }}
            />

            {/* Dark Liquid Wave */}
            <svg
              viewBox="0 0 40 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute bottom-0 w-full h-[48%] block"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z"
                fill="#18181B"
                animate={{
                  d: [
                    'M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z',
                    'M0 3C8 7 13 2 21 4C29 7 33 1 40 5V22H0V3Z',
                    'M0 5C8 1 13 8 21 5C29 2 33 2 40 4V22H0V5Z',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>

          </motion.div>

          {/* Brand Name */}
          <span className="text-[15px] font-semibold tracking-[-0.015em] text-[#18181B]">
            <span className="text-[#18181B] font-extrabold text-xl">N</span>ova<span className="text-[#18181B] font-extrabold text-xl">M</span>otion
          </span>
        </Link>

        {/* Center: Pill Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden sm:flex items-center bg-[#F4F4F5] p-1 rounded-full border border-black/[0.03]"
        >
          {navItems.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                onClick={() => {
                  setMobileNavOpen(false);
                  setSearchOpen(false);
                }}
                className={`px-4 py-1.5 rounded-full text-[13.5px] transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-white text-[#18181B] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                    : 'text-[#52525B] hover:text-[#18181B] font-normal'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileNavOpen}
          onClick={() => {
            setSearchOpen(false);
            setMobileNavOpen((open) => !open);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F4F5] text-[#18181B] sm:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileNavOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Right: Search & Theme Toggle */}
        <div className="flex items-center gap-2.5">

          {/* Search */}
          <button
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Search components'}
            aria-expanded={searchOpen}
            onClick={() => {
              setMobileNavOpen(false);
              setSearchQuery(
                new URLSearchParams(window.location.search).get('search') ?? ''
              );
              setActiveSearchResult(0);
              setSearchOpen((open) => !open);
            }}
            className="w-10 h-10 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7]/70 flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7.5" />
              <path d="m20.5 20.5-4.2-4.2" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
          aria-label="Toggle color theme"
          title="Toggle light and dark themes"
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7]/70 flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              <path d="M19 3v4M21 5h-4" />
            </svg>
          </button>

        </div>
      </div>

      {mobileNavOpen && (
        <nav
          aria-label="Mobile primary navigation"
          className="absolute left-4 right-4 top-full flex flex-col gap-1 rounded-2xl border border-black/[0.05] bg-white p-2 shadow-lg sm:hidden"
        >
          {navItems.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                onClick={() => {
                  setMobileNavOpen(false);
                  setSearchOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm ${
                  active
                    ? 'bg-[#F4F4F5] font-semibold text-[#18181B]'
                    : 'text-[#52525B]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/35 px-4 pt-[12vh] backdrop-blur-[3px] sm:pt-[16vh]"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSearchOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Search NovaMotion"
            className="mx-auto w-full max-w-[640px] overflow-hidden rounded-[22px] border border-white/60 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <form role="search" onSubmit={handleSearch}>
              <div className="flex items-center gap-3 border-b border-[#E4E4E7] px-5">
                <svg
                  aria-hidden="true"
                  className="shrink-0 text-[#71717A]"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7.5" />
                  <path d="m20.5 20.5-4.2-4.2" />
                </svg>
                <label htmlFor="header-component-search" className="sr-only">
                  Search the website
                </label>
                <input
                  id="header-component-search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="header-search-results"
                  aria-activedescendant={
                    searchResults.length
                      ? `header-search-result-${activeSearchResult}`
                      : undefined
                  }
                  autoFocus
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setActiveSearchResult(0);
                  }}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search components, pages, and galleries..."
                  className="h-[68px] min-w-0 flex-1 bg-transparent text-[16px] text-[#18181B] outline-none placeholder:text-[#A1A1AA] sm:text-[18px]"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="rounded-md px-2 py-1 text-[11px] text-[#71717A] hover:bg-[#F4F4F5]"
                >
                  Esc
                </button>
              </div>
            </form>

            <div className="px-3 py-3">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
                {normalizedQuery ? 'Search results' : 'Quick links'}
              </p>
              {searchResults.length ? (
                <div id="header-search-results" role="listbox" aria-label="Search results">
                  {searchResults.map((item, index) => (
                    <Link
                      key={item.href}
                      id={`header-search-result-${index}`}
                      href={item.href}
                      role="option"
                      aria-selected={index === activeSearchResult}
                      onMouseEnter={() => setActiveSearchResult(index)}
                      onClick={() => setSearchOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                        index === activeSearchResult
                          ? 'bg-[#F4F4F5]'
                          : 'hover:bg-[#FAFAFA]'
                      }`}
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white text-[#52525B] shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
                        {item.category === 'Page' ? (
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M5 4h14v16H5z" />
                            <path d="M8 8h8M8 12h8M8 16h5" />
                          </svg>
                        ) : (
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <rect x="4" y="4" width="6" height="6" rx="1" />
                            <rect x="14" y="4" width="6" height="6" rx="1" />
                            <rect x="4" y="14" width="6" height="6" rx="1" />
                            <rect x="14" y="14" width="6" height="6" rx="1" />
                          </svg>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-[#18181B]">
                          {item.title}
                        </span>
                        <span className="block text-[11px] text-[#71717A]">
                          {item.category}
                        </span>
                      </span>
                      <span aria-hidden="true" className="text-xs text-[#A1A1AA]">
                        ↵
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="rounded-xl px-3 py-5 text-sm text-[#71717A]">
                  No direct results. Press Enter to search the component catalog.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#F4F4F5] px-5 py-3 text-[10px] text-[#A1A1AA]">
              <span>Search NovaMotion</span>
              <span>
                <kbd className="rounded border border-[#E4E4E7] px-1.5 py-0.5">↑</kbd>{' '}
                <kbd className="rounded border border-[#E4E4E7] px-1.5 py-0.5">↓</kbd>{' '}
                to navigate · <kbd className="rounded border border-[#E4E4E7] px-1.5 py-0.5">Enter</kbd>{' '}
                to open
              </span>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}

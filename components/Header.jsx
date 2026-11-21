
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Blocks, Home, Moon, Network, Sun } from 'lucide-react';
import NovaMotionMascot from './NovaMotionMascot';
import { SEARCH_ITEMS } from './searchItems';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchResult, setActiveSearchResult] = useState(0);

  const navItems = [
    { label: 'About', href: '/', Icon: Home },
    { label: 'Components', href: '/components', Icon: Blocks },
    { label: 'MCP', href: '/mcp', Icon: Network },
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

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('novamotion-theme');
    const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
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

  const toggleTheme = (event) => {
    const root = document.documentElement;
    const currentTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    const updateTheme = () => {
      root.dataset.theme = nextTheme;
      window.localStorage.setItem('novamotion-theme', nextTheme);
    };

    if (
      typeof document.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      updateTheme();
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.style.setProperty('--theme-reveal-x', `${x}px`);
    root.style.setProperty('--theme-reveal-y', `${y}px`);
    root.style.setProperty('--theme-reveal-radius', `${radius}px`);

    const transition = document.startViewTransition(updateTheme);
    const clearRevealStyles = () => {
      root.style.removeProperty('--theme-reveal-x');
      root.style.removeProperty('--theme-reveal-y');
      root.style.removeProperty('--theme-reveal-radius');
    };

    transition.finished.then(clearRevealStyles, clearRevealStyles);
  };

  return (
    <header className="relative z-50 w-full bg-white px-6 py-5 sm:px-14 sm:py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">

        {/* Left: Animated Brand Logo */}
        <Link
          href="/"
          aria-label="NovaMotion Home"
          aria-current={pathname === '/' ? 'page' : undefined}
          onClick={() => {
            setSearchOpen(false);
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <NovaMotionMascot />

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
                onClick={() => setSearchOpen(false)}
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

        {/* Right: Search & Theme Toggle */}
        <div className="flex items-center gap-2.5">

          {/* Search */}
          <button
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Search components'}
            aria-expanded={searchOpen}
            onClick={() => {
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
            <Moon
              aria-hidden="true"
              className="theme-toggle-moon"
              size={16}
              strokeWidth={1.9}
            />
            <Sun
              aria-hidden="true"
              className="theme-toggle-sun"
              size={16}
              strokeWidth={1.9}
            />
          </button>

        </div>
      </div>

      <nav
        aria-label="Mobile primary navigation"
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-black/[0.06] bg-white px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.04)] sm:hidden"
      >
        <div className="mx-auto grid max-w-[480px] grid-cols-3 gap-2">
          {navItems.map(({ label, href, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? 'page' : undefined}
                onClick={() => setSearchOpen(false)}
                className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-colors ${
                  active
                    ? 'bg-[#F4F4F5] text-[#18181B]'
                    : 'text-[#71717A] hover:bg-[#FAFAFA] hover:text-[#18181B]'
                }`}
              >
                <Icon aria-hidden="true" size={19} strokeWidth={1.8} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>

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

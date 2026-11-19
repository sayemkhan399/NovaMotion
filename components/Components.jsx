'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  AnimatedInput,
  AnimatedButton,
  AuroraBackground,
  BubbleNavigation,
  CircularLoader,
  CursorFollower,
  CursorTrail,
  CustomCursor,
  DockNavigation,
  DuoFlip,
  FloatingInput,
  FloatingNavbar,
  GradientButton,
  GlowButton,
  GradientText,
  GridBackground,
  ImageCompare,
  ImageReveal,
  LiquidGlassButton,
  MorphingLoader,
  MeteorsBackground,
  OTPInput,
  ParallaxImage,
  ParticleBackground,
  ProgressBar,
  ScrambleText,
  ScrollParallax,
  ScrollReveal,
  SidebarNavigation,
  SpotlightBackground,
  SplitText,
  StickyScroll,
  TabBar,
  TextReveal,
  ToggleSwitch,
  TypewriterText,
  MagneticButton,
  RippleButton,
  ShimmerButton,
} from 'novamotion-ui';
import CardPreview from './CardPreview';
import GalleryDemos from './GalleryDemos';
import DUO_FLIP_IMAGES from './duoFlipImages';

const CATEGORIES = [
  { name: 'All', count: 43 },
  { name: 'Buttons', count: 7 },
  { name: 'Cards', count: 5 },
  { name: 'Text', count: 5 },
  { name: 'Backgrounds', count: 5 },
  { name: 'Navigation', count: 5 },
  { name: 'Cursor', count: 3 },
  { name: 'Images', count: 3 },
  { name: 'Loaders', count: 3 },
  { name: 'Forms', count: 4 },
  { name: 'Scroll', count: 3 },
  { name: 'Charts', count: 14 },
  { name: 'Galleries', count: 4 },
  { name: 'Feedback', count: 2 },
];

const BILLS = [
  {
    id: 1,
    title: 'Home internet',
    due: 'In 2 days',
    isUrgent: true,
    autopay: false,
    amount: '$49.00',
    icon: 'wifi',
  },
  {
    id: 2,
    title: 'Electricity',
    due: 'Due Nov 24',
    isUrgent: false,
    autopay: false,
    amount: '$86.30',
    icon: 'bolt',
  },
  {
    id: 3,
    title: 'Phone plan',
    due: 'Due Nov 26',
    isUrgent: false,
    autopay: true,
    amount: '$25.00',
    icon: 'phone',
  },
  {
    id: 4,
    title: 'Cloud backup',
    due: 'Due Nov 29',
    isUrgent: false,
    autopay: true,
    amount: '$9.99',
    icon: 'cloud',
  },
  {
    id: 5,
    title: 'Gym membership',
    due: 'Due Dec 2',
    isUrgent: false,
    autopay: false,
    amount: '$42.19',
    icon: 'heart',
  },
];

const BUTTON_COMPONENTS = [
  { slug: 'animated-button', name: 'AnimatedButton', description: 'A crisp lift and scale on hover.' },
  { slug: 'magnetic-button', name: 'MagneticButton', description: 'Follows your pointer as you move.' },
  { slug: 'gradient-button', name: 'GradientButton', description: 'A vivid gradient with a smooth shift.' },
  { slug: 'glow-button', name: 'GlowButton', description: 'A soft glow that brightens on hover.' },
  { slug: 'shimmer-button', name: 'ShimmerButton', description: 'A light sweep passes across the surface.' },
  { slug: 'ripple-button', name: 'RippleButton', description: 'A ripple effect on press.' },
  { slug: 'liquid-glass-button', name: 'LiquidGlassButton', description: 'A translucent glass button with a pointer-following highlight.' },
];

const BUTTON_PREVIEWS = {
  AnimatedButton,
  MagneticButton,
  GradientButton,
  GlowButton,
  ShimmerButton,
  RippleButton,
  LiquidGlassButton,
};

const CARD_COMPONENTS = [
  { slug: 'spotlight-card', name: 'SpotlightCard', description: 'A pointer-tracked glow illuminates the card.' },
  { slug: 'tilt-card', name: 'TiltCard', description: 'Tilts in 3D as you move your pointer.' },
  { slug: 'glass-card', name: 'GlassCard', description: 'A translucent glass surface with a soft blur.' },
  { slug: 'flip-card', name: 'FlipCard', description: 'Click to flip between the front and back.' },
  { slug: 'gradient-card', name: 'GradientCard', description: 'A vivid gradient edge frames the card.' },
];

const TEXT_COMPONENTS = [
  { slug: 'typewriter-text', name: 'TypewriterText', description: 'Types text character by character.' },
  { slug: 'text-reveal', name: 'TextReveal', description: 'Reveals clipped text on hover.' },
  { slug: 'gradient-text', name: 'GradientText', description: 'Applies a vivid gradient to text.' },
  { slug: 'split-text', name: 'SplitText', description: 'Animates individual characters on hover.' },
  { slug: 'scramble-text', name: 'ScrambleText', description: 'Scrambles characters into a readable message.' },
];

const BACKGROUND_COMPONENTS = [
  { slug: 'aurora-background', name: 'AuroraBackground', description: 'Animated northern-light color fields.' },
  { slug: 'particle-background', name: 'ParticleBackground', description: 'Twinkling particles on a dark canvas.' },
  { slug: 'grid-background', name: 'GridBackground', description: 'A subtle grid backdrop for content.' },
  { slug: 'spotlight-background', name: 'SpotlightBackground', description: 'A spotlight follows pointer movement.' },
  { slug: 'meteors-background', name: 'MeteorsBackground', description: 'A night sky with streaking meteors.' },
];

const NAVIGATION_COMPONENTS = [
  { slug: 'floating-navbar', name: 'FloatingNavbar', description: 'A floating, selectable navigation bar.' },
  { slug: 'dock-navigation', name: 'DockNavigation', description: 'A compact dock with active-item feedback.' },
  { slug: 'sidebar-navigation', name: 'SidebarNavigation', description: 'A vertical sidebar with active links.' },
  { slug: 'bubble-navigation', name: 'BubbleNavigation', description: 'A pill navigation with a moving active state.' },
  { slug: 'tab-bar', name: 'TabBar', description: 'An animated tab bar with pill, labeled, and action styles.' },
];

const CURSOR_COMPONENTS = [
  { slug: 'custom-cursor', name: 'CustomCursor', description: 'A custom ring follows the pointer.' },
  { slug: 'cursor-trail', name: 'CursorTrail', description: 'A fading trail follows pointer movement.' },
  { slug: 'cursor-follower', name: 'CursorFollower', description: 'A smooth follower tracks the pointer.' },
];

const IMAGE_COMPONENTS = [
  { slug: 'image-reveal', name: 'ImageReveal', description: 'A light sweep reveals an image on hover.' },
  { slug: 'parallax-image', name: 'ParallaxImage', description: 'An image shifts with pointer movement.' },
  { slug: 'image-compare', name: 'ImageCompare', description: 'Drag the slider to compare two images.' },
];

const LOADER_COMPONENTS = [
  { slug: 'morphing-loader', name: 'MorphingLoader', description: 'A soft shape morphs while loading.' },
  { slug: 'circular-loader', name: 'CircularLoader', description: 'A clear circular loading indicator.' },
  { slug: 'progress-bar', name: 'ProgressBar', description: 'A progress indicator with an adjustable value.' },
];

const FORM_COMPONENTS = [
  { slug: 'floating-input', name: 'FloatingInput', description: 'A label floats above the entered value.' },
  { slug: 'animated-input', name: 'AnimatedInput', description: 'An input animates its focus ring.' },
  { slug: 'toggle-switch', name: 'ToggleSwitch', description: 'A keyboard-accessible on/off switch.' },
  { slug: 'otp-input', name: 'OTPInput', description: 'A multi-digit verification code input.' },
];

const SCROLL_COMPONENTS = [
  { slug: 'scroll-reveal', name: 'ScrollReveal', description: 'Content reveals when it enters view.' },
  { slug: 'scroll-parallax', name: 'ScrollParallax', description: 'Content shifts gently as the page scrolls.' },
  { slug: 'sticky-scroll', name: 'StickyScroll', description: 'A sticky summary stays beside scrolling content.' },
];

const ALL_COMPONENTS = [
  ...BUTTON_COMPONENTS.map((component) => ({ ...component, category: 'Buttons' })),
  ...CARD_COMPONENTS.map((component) => ({ ...component, category: 'Cards' })),
  ...TEXT_COMPONENTS.map((component) => ({ ...component, category: 'Text' })),
  ...BACKGROUND_COMPONENTS.map((component) => ({ ...component, category: 'Backgrounds' })),
  ...NAVIGATION_COMPONENTS.map((component) => ({ ...component, category: 'Navigation' })),
  ...CURSOR_COMPONENTS.map((component) => ({ ...component, category: 'Cursor' })),
  ...IMAGE_COMPONENTS.map((component) => ({ ...component, category: 'Images' })),
  ...LOADER_COMPONENTS.map((component) => ({ ...component, category: 'Loaders' })),
  ...FORM_COMPONENTS.map((component) => ({ ...component, category: 'Forms' })),
  ...SCROLL_COMPONENTS.map((component) => ({ ...component, category: 'Scroll' })),
];

const COMPONENT_PREVIEWS = {
  ...BUTTON_PREVIEWS,
  ...Object.fromEntries(CARD_COMPONENTS.map((component) => [component.name, null])),
  TypewriterText,
  TextReveal,
  GradientText,
  SplitText,
  ScrambleText,
  AuroraBackground,
  ParticleBackground,
  GridBackground,
  SpotlightBackground,
  MeteorsBackground,
  FloatingNavbar,
  DockNavigation,
  SidebarNavigation,
  BubbleNavigation,
  TabBar,
  CustomCursor,
  CursorTrail,
  CursorFollower,
  ImageReveal,
  ParallaxImage,
  ImageCompare,
  MorphingLoader,
  CircularLoader,
  ProgressBar,
  FloatingInput,
  AnimatedInput,
  ToggleSwitch,
  OTPInput,
  ScrollReveal,
  ScrollParallax,
  StickyScroll,
};

export default function Components() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [billFilter, setBillFilter] = useState('All');

  useEffect(() => {
    const syncSearch = (event) => {
      const query =
        typeof event?.detail === 'string'
          ? event.detail
          : new URLSearchParams(window.location.search).get('search') ?? '';
      setSearchQuery(query);
    };

    syncSearch();
    window.addEventListener('popstate', syncSearch);
    window.addEventListener('novamotion:component-search', syncSearch);
    return () => {
      window.removeEventListener('popstate', syncSearch);
      window.removeEventListener('novamotion:component-search', syncSearch);
    };
  }, []);

  const activeCategoryObj =
    CATEGORIES.find((c) => c.name === selectedCategory) || CATEGORIES[0];
  const isGalleryCategory = selectedCategory === 'Galleries';
  const isCatalogCategory = [
    'All',
    'Buttons',
    'Cards',
    'Text',
    'Backgrounds',
    'Navigation',
    'Cursor',
    'Images',
    'Loaders',
    'Forms',
    'Scroll',
  ].includes(selectedCategory);
  const filteredComponents = ALL_COMPONENTS.filter(
    (component) =>
      (selectedCategory === 'All' || component.category === selectedCategory) &&
      component.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const totalInSelection =
    selectedCategory === 'All'
      ? ALL_COMPONENTS.length
      : ALL_COMPONENTS.filter((component) => component.category === selectedCategory)
          .length;

  const filteredBills =
    billFilter === 'Autopay'
      ? BILLS.filter((b) => b.autopay)
      : BILLS;

  const renderBillIcon = (type) => {
    switch (type) {
      case 'wifi':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        );
      case 'bolt':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 'phone':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      case 'cloud':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
        );
      case 'heart':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-white text-[#18181B] px-6 sm:px-10 py-8">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT SIDEBAR: Search + Category Filter Options */}
        <aside className="w-full lg:w-[235px] shrink-0 lg:sticky lg:top-6">
          {/* Search Input */}
          <div className="relative mb-5">
            <svg
              className="w-4 h-4 text-[#71717A] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="w-full pl-9 pr-3 py-2 text-[13.5px] bg-[#F4F4F5] text-[#18181B] placeholder:text-[#71717A] rounded-xl border border-transparent focus:border-[#E4E4E7] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-[#A1A1AA]">
              Categories
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-[10px] font-medium text-[#A1A1AA] transition-colors hover:text-[#18181B]"
            >
              Deselect all
            </button>
          </div>

          {/* Sidebar Filter List */}
          <nav
            aria-label="Component categories"
            className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2 rounded-full lg:rounded-xl text-[13.5px] whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#18181B] text-white font-medium shadow-xs'
                      : 'text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B] font-normal'
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`text-[12px] ${
                      isSelected ? 'text-[#A1A1AA]' : 'text-[#A1A1AA]'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <div className="flex-1 w-full">
          {/* Top Count Indicator */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-semibold text-[#18181B]">
              {selectedCategory} {isGalleryCategory ? 'Options' : 'Components'}
            </h2>
            <span className="text-[13px] text-[#71717A]">
              Showing {isGalleryCategory ? 4 : isCatalogCategory ? filteredComponents.length : activeCategoryObj.count} of{' '}
              {isGalleryCategory ? 4 : isCatalogCategory ? totalInSelection : 100}
            </span>
          </div>

          {/* 3-Column Component Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {isGalleryCategory ? (
              <GalleryDemos images={DUO_FLIP_IMAGES} />
            ) : isCatalogCategory ? (
              filteredComponents.length > 0 ? (
                filteredComponents.map((component) => {
                  const Preview = COMPONENT_PREVIEWS[component.name];

                  return (
                    <article
                      key={component.name}
                      className="min-h-[280px] rounded-[24px] border border-black/[0.03] bg-[#F6F6F6] p-5 flex flex-col"
                    >
                      <span className="self-start rounded-full bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#52525B] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                        {component.category}
                      </span>

                      <div className="flex flex-1 items-center justify-center py-8">
                        {component.category === 'Cards' ? (
                          <CardPreview componentName={component.name} />
                        ) : (
                          <Preview>
                            {component.category === 'Buttons' ? 'Try it' : undefined}
                          </Preview>
                        )}
                      </div>

                      <div>
                        <h3 className="text-[14px] font-semibold text-[#18181B]">
                          {component.name}
                        </h3>
                        <p className="mt-1 text-[12px] text-[#71717A]">
                          {component.description}
                        </p>
                        <Link
                          href={`/components/${component.slug}`}
                          className="mt-3 inline-flex text-[12px] font-semibold text-[#52525B] transition-colors hover:text-[#18181B]"
                        >
                          View details <span aria-hidden="true" className="ml-1">→</span>
                        </Link>
                      </div>
                    </article>
                  );
                })
              ) : (
                <p className="col-span-full rounded-2xl bg-[#F6F6F6] px-5 py-10 text-center text-[13px] text-[#71717A]">
                  No components match “{searchQuery}”.
                </p>
              )
            ) : (
              <>
            {/* CARD 1: Gallery / Poppies Carousel */}
            <div className="bg-[#F6F6F6] rounded-[24px] p-5 flex flex-col justify-between min-h-[470px] border border-black/[0.03]">
              {/* Top Pill */}
              <div>
                <span className="inline-block bg-white text-[#52525B] text-[11.5px] font-medium px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  New
                </span>
              </div>

              {/* DuoFlip gallery */}
              <div className="my-auto py-6">
                <DuoFlip
                  images={DUO_FLIP_IMAGES}
                  aspect={1.6}
                  radius={18}
                  interval={3.4}
                  className="mx-auto w-full max-w-[500px]"
                />
              </div>

              <Link
                href="/components/duo-flip"
                className="self-end text-[12px] font-semibold text-[#52525B] transition-colors hover:text-[#18181B]"
              >
                View details <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>

            {/* CARD 2: Designer Profile Card (Lena Hartmann) */}
            <div className="bg-[#F6F6F6] rounded-[24px] p-5 flex flex-col justify-between min-h-[470px] border border-black/[0.03]">
              {/* Top Pill */}
              <div className="mb-4">
                <span className="inline-block bg-white text-[#52525B] text-[11.5px] font-medium px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  New
                </span>
              </div>

              {/* Inner White Profile Card */}
              <div className="bg-white rounded-[22px] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/[0.04] mx-auto w-full max-w-[310px]">
                {/* Pastel Gradient Banner */}
                <div className="h-24 rounded-[16px] bg-gradient-to-r from-[#F9D8C9] via-[#E3D5FA] to-[#CBE8F8] relative p-2.5 flex justify-end items-start">
                  <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs text-[#18181B] text-[11px] font-medium px-2.5 py-1 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available
                  </span>
                </div>

                {/* Overlapping Avatar */}
                <div className="px-2.5 -mt-9 mb-2.5 relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                    alt="Lena Hartmann"
                    className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-sm"
                  />
                </div>

                {/* Name & Location */}
                <div className="px-2.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[16px] font-bold text-[#18181B] tracking-tight">
                      Lena Hartmann
                    </h3>
                    {/* Blue Verified Badge */}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#2563EB">
                      <path d="M12 2L14.8 4.2L18.4 4L19.6 7.4L22.5 9.5L21.4 13L22.5 16.5L19.6 18.6L18.4 22L14.8 21.8L12 24L9.2 21.8L5.6 22L4.4 18.6L1.5 16.5L2.6 13L1.5 9.5L4.4 7.4L5.6 4L9.2 4.2L12 2Z" />
                      <path
                        d="M9 12.2L11 14.2L15.2 10"
                        stroke="white"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <p className="text-[11.5px] text-[#71717A] mt-0.5">
                    Brand and motion designer · Lisbon
                  </p>

                  {/* Bio */}
                  <p className="text-[12px] leading-[1.5] text-[#52525B] mt-3">
                    I shape identities that move: logos with a heartbeat and
                    interfaces with a little joy in every tap.
                  </p>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3.5">
                    {['Motion', 'Branding', '3D', '+3'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-[#F4F4F5] text-[#52525B] text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats Box */}
                  <div className="grid grid-cols-3 bg-[#FAFAFA] border border-[#F4F4F5] rounded-2xl py-2.5 px-2 mt-4 text-center">
                    <div>
                      <div className="text-[13.5px] font-bold text-[#18181B]">
                        12,480
                      </div>
                      <div className="text-[10.5px] text-[#71717A]">
                        Followers
                      </div>
                    </div>
                    <div className="border-x border-[#E4E4E7]">
                      <div className="text-[13.5px] font-bold text-[#18181B]">
                        86
                      </div>
                      <div className="text-[10.5px] text-[#71717A]">
                        Projects
                      </div>
                    </div>
                    <div>
                      <div className="text-[13.5px] font-bold text-[#18181B]">
                        4.9
                      </div>
                      <div className="text-[10.5px] text-[#71717A]">Rating</div>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center gap-2 mt-3.5 pb-1">
                    <button
                      type="button"
                      onClick={() => setIsFollowing(!isFollowing)}
                      className={`flex-1 py-2.5 px-4 rounded-full text-[12.5px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isFollowing
                          ? 'bg-[#F4F4F5] text-[#18181B]'
                          : 'bg-[#18181B] text-white hover:bg-[#27272A]'
                      }`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                      </svg>
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>

                    <button
                      type="button"
                      aria-label="Message"
                      className="w-9 h-9 rounded-full border border-[#E4E4E7] hover:bg-[#F4F4F5] flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      aria-label="Bookmark"
                      className="w-9 h-9 rounded-full border border-[#E4E4E7] hover:bg-[#F4F4F5] flex items-center justify-center text-[#18181B] transition-colors cursor-pointer"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill={isBookmarked ? '#18181B' : 'none'}
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Coming Up Bills Card */}
            <div className="bg-[#F6F6F6] rounded-[24px] p-5 flex flex-col justify-between min-h-[470px] border border-black/[0.03]">
              {/* Top Pill */}
              <div className="mb-4">
                <span className="inline-block bg-white text-[#52525B] text-[11.5px] font-medium px-2.5 py-1 rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  Updated
                </span>
              </div>

              {/* Inner White Bills Card */}
              <div className="bg-white rounded-[22px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/[0.04] mx-auto w-full max-w-[330px] my-auto">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#18181B]">
                      Coming up
                    </h3>
                    <p className="text-[12px] text-[#71717A] mt-0.5">
                      <span className="font-semibold text-[#18181B]">
                        $212.48
                      </span>{' '}
                      still to pay
                    </p>
                  </div>

                  {/* Filter Dropdown Button */}
                  <button
                    type="button"
                    onClick={() =>
                      setBillFilter((prev) =>
                        prev === 'All' ? 'Autopay' : 'All'
                      )
                    }
                    className="inline-flex items-center gap-1 bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#18181B] text-[12px] font-medium px-3 py-1 rounded-full transition-colors cursor-pointer"
                  >
                    {billFilter}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* Bill Rows */}
                <div className="divide-y divide-[#F4F4F5]">
                  {filteredBills.map((bill) => (
                    <div
                      key={bill.id}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#F4F4F5] flex items-center justify-center text-[#52525B] shrink-0">
                          {renderBillIcon(bill.icon)}
                        </div>
                        <div>
                          <div className="text-[13px] font-semibold text-[#18181B]">
                            {bill.title}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {bill.isUrgent ? (
                              <span className="inline-flex items-center gap-1 bg-[#FEF3C7] text-[#B45309] text-[10.5px] font-medium px-2 py-0.5 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                                {bill.due}
                              </span>
                            ) : (
                              <span className="text-[11px] text-[#A1A1AA]">
                                {bill.due}
                              </span>
                            )}

                            {bill.autopay && (
                              <span className="bg-[#F4F4F5] text-[#71717A] text-[10px] font-medium px-1.5 py-0.5 rounded-md">
                                Autopay
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-[#F4F4F5] text-[#18181B] text-[12px] font-semibold px-2.5 py-1 rounded-lg">
                        {bill.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-2" />
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
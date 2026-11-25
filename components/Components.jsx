'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  AuthCard,
  AutocompleteSearch,
  AnimatedInput,
  AnimatedButton,
  AuroraBackground,
  BarChart,
  BentoDemo,
  BookingCard,
  BubbleNavigation,
  CanvasShadowLoader,
  CircularLoader,
  ClockSpinLoader,
  CursorFollower,
  CursorTrail,
  CourseCard,
  CustomCursor,
  DateRangeCalendar,
  DeviceFrame,
  DonutChart,
  DockNavigation,
  DualRingLoader,
  DynamicIsland,
  FloatingInput,
  FloatingNavbar,
  GradientButton,
  GlowButton,
  GsapInteractive,
  GradientText,
  GridBackground,
  HeartbeatLoader,
  HourglassLoader,
  ImageCompare,
  ImageReveal,
  LineChart,
  LiquidGlassButton,
  MonthCalendar,
  MorphingLoader,
  MeteorsBackground,
  NewtonCradleLoader,
  OTPInput,
  ParallaxImage,
  ParticleBackground,
  ProgressBar,
  ProgressRingLoader,
  ProUpgradeCard,
  ScrambleText,
  ScrollParallax,
  ScrollReveal,
  SkeletonLoader,
  SidebarNavigation,
  SpotlightBackground,
  SplitText,
  SquareGridLoader,
  StickyScroll,
  StripedBarLoader,
  TabBar,
  TextReveal,
  ToggleSwitch,
  ToastStack,
  TwinSquaresLoader,
  TypewriterText,
  MagneticButton,
  RippleButton,
  ShimmerButton,
  Social,
  RatingInput,
  SearchBar,
  Toast,
  WaveDotsLoader,
} from 'novamotion-ui';
import CardPreview from './CardPreview';
import GalleryDemos from './GalleryDemos';
import DUO_FLIP_IMAGES from './duoFlipImages';
import TravelSearch from './TravelSearch';

const CATEGORIES = [
  { name: 'All', count: 74 },
  { name: 'Buttons', count: 8 },
  { name: 'Cards', count: 8 },
  { name: 'Search', count: 3 },
  { name: 'Frames', count: 1 },
  { name: 'Text', count: 5 },
  { name: 'Backgrounds', count: 5 },
  { name: 'Navigation', count: 6 },
  { name: 'Calendar', count: 2 },
  { name: 'Cursor', count: 3 },
  { name: 'Images', count: 3 },
  { name: 'Loaders', count: 15 },
  { name: 'Forms', count: 5 },
  { name: 'Scroll', count: 3 },
  { name: 'Charts', count: 3 },
  { name: 'Galleries', count: 4 },
  { name: 'Feedback', count: 3 },
  { name: 'Layouts', count: 1 },
];

const LAYOUT_COMPONENTS = [
  { slug: 'bento-demo', name: 'BentoDemo', description: 'A responsive feature grid with animated file, notification, integration, and calendar previews.' },
];

const BUTTON_COMPONENTS = [
  { slug: 'animated-button', name: 'AnimatedButton', description: 'A crisp lift and scale on hover.' },
  { slug: 'magnetic-button', name: 'MagneticButton', description: 'Follows your pointer as you move.' },
  { slug: 'gradient-button', name: 'GradientButton', description: 'A vivid gradient with a smooth shift.' },
  { slug: 'glow-button', name: 'GlowButton', description: 'A soft glow that brightens on hover.' },
  { slug: 'shimmer-button', name: 'ShimmerButton', description: 'A light sweep passes across the surface.' },
  { slug: 'ripple-button', name: 'RippleButton', description: 'A ripple effect on press.' },
  { slug: 'liquid-glass-button', name: 'LiquidGlassButton', description: 'A translucent glass button with a pointer-following highlight.' },
  { slug: 'social', name: 'Social', description: 'Google, GitHub, and Apple sign-in buttons with provider callbacks.' },
];

const BUTTON_PREVIEWS = {
  AnimatedButton,
  MagneticButton,
  GradientButton,
  GlowButton,
  ShimmerButton,
  RippleButton,
  LiquidGlassButton,
  Social,
};

const CARD_COMPONENTS = [
  { slug: 'spotlight-card', name: 'SpotlightCard', description: 'A pointer-tracked glow illuminates the card.' },
  { slug: 'tilt-card', name: 'TiltCard', description: 'Tilts in 3D as you move your pointer.' },
  { slug: 'glass-card', name: 'GlassCard', description: 'A translucent glass surface with a soft blur.' },
  { slug: 'flip-card', name: 'FlipCard', description: 'Click to flip between the front and back.' },
  { slug: 'gradient-card', name: 'GradientCard', description: 'A vivid gradient edge frames the card.' },
  { slug: 'course-card', name: 'CourseCard', description: 'A responsive course card with a layered wave illustration.' },
  { slug: 'booking-card', name: 'BookingCard', description: 'An animated appointment card for choosing a date and time.' },
  { slug: 'pro-upgrade-card', name: 'ProUpgradeCard', description: 'A premium upgrade card with feature highlights and dual actions.' },
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
  { slug: 'dynamic-island', name: 'DynamicIsland', description: 'An always-on, animated island for music, calls, and live activities.' },
  { slug: 'bubble-navigation', name: 'BubbleNavigation', description: 'A pill navigation with a moving active state.' },
  { slug: 'tab-bar', name: 'TabBar', description: 'An animated tab bar with pill, labeled, and action styles.' },
];

const CALENDAR_COMPONENTS = [
  { slug: 'month-calendar', name: 'MonthCalendar', description: 'An interactive monthly calendar with event markers and keyboard navigation.' },
  { slug: 'date-range-calendar', name: 'DateRangeCalendar', description: 'An animated check-in and check-out date picker with a live night count.' },
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
  { slug: 'skeleton-loader', name: 'SkeletonLoader', description: 'A pulsing placeholder previews content while it loads.' },
  { slug: 'canvas-shadow-loader', name: 'CanvasShadowLoader', description: 'Colorful soft shadows drift while a creative canvas is prepared.' },
  { slug: 'dual-ring-loader', name: 'DualRingLoader', description: 'Two concentric rings spin in opposite directions.' },
  { slug: 'wave-dots-loader', name: 'WaveDotsLoader', description: 'Dots bounce in a smooth wave pattern.' },
  { slug: 'hourglass-loader', name: 'HourglassLoader', description: 'An hourglass flips as sand flows down.' },
  { slug: 'progress-ring-loader', name: 'ProgressRingLoader', description: 'A circular ring fills to show progress.' },
  { slug: 'striped-bar-loader', name: 'StripedBarLoader', description: 'An animated striped bar shows active loading.' },
  { slug: 'heartbeat-loader', name: 'HeartbeatLoader', description: 'A heart pulses with a steady heartbeat rhythm.' },
  { slug: 'square-grid-loader', name: 'SquareGridLoader', description: 'A 3x3 square grid fades in a rhythmic pattern.' },
  { slug: 'newton-cradle-loader', name: 'NewtonCradleLoader', description: 'Swinging balls animate like a Newton\'s cradle.' },
  { slug: 'clock-spin-loader', name: 'ClockSpinLoader', description: 'Clock hands spin at different speeds.' },
  { slug: 'twin-squares-loader', name: 'TwinSquaresLoader', description: 'Two squares orbit and rotate around each other.' },
];

const FORM_COMPONENTS = [
  { slug: 'auth-card', name: 'AuthCard', description: 'A responsive sign-in and sign-up form with backend-ready callbacks.' },
  { slug: 'floating-input', name: 'FloatingInput', description: 'A label floats above the entered value.' },
  { slug: 'animated-input', name: 'AnimatedInput', description: 'An input animates its focus ring.' },
  { slug: 'toggle-switch', name: 'ToggleSwitch', description: 'A keyboard-accessible on/off switch.' },
  { slug: 'otp-input', name: 'OTPInput', description: 'A multi-digit verification code input.' },
];

const SEARCH_COMPONENTS = [
  { slug: 'travel-search', name: 'TravelSearch', description: 'A responsive travel search with flight, visa, hotel, and holiday tabs.' },
  { slug: 'search-bar', name: 'SearchBar', description: 'A compact search field with clear and submit actions.' },
  { slug: 'autocomplete-search', name: 'AutocompleteSearch', description: 'A keyboard-friendly search input with selectable suggestions.' },
];

const FRAME_COMPONENTS = [
  { slug: 'device-frame', name: 'DeviceFrame', description: 'Responsive iOS, Android, and watch frames for custom screen content.' },
];

const CHART_COMPONENTS = [
  { slug: 'bar-chart', name: 'BarChart', description: 'Compare values at a glance with a clean, responsive bar chart.' },
  { slug: 'line-chart', name: 'LineChart', description: 'Show trends over time with an accessible, responsive line chart.' },
  { slug: 'donut-chart', name: 'DonutChart', description: 'Break down a total into clear, color-coded segments.' },
];

const FEEDBACK_COMPONENTS = [
  { slug: 'rating-input', name: 'RatingInput', description: 'Collect an interactive, accessible star rating.' },
  { slug: 'toast', name: 'Toast', description: 'Explore five animated notification styles: success, info, warning, error, and loading.' },
  { slug: 'toast-stack', name: 'ToastStack', description: 'A draggable animated toast stack with timers, actions, and a compact folded state.' },
];

const SCROLL_COMPONENTS = [
  { slug: 'scroll-reveal', name: 'ScrollReveal', description: 'Content reveals when it enters view.' },
  { slug: 'scroll-parallax', name: 'ScrollParallax', description: 'Content shifts gently as the page scrolls.' },
  { slug: 'sticky-scroll', name: 'StickyScroll', description: 'A sticky summary stays beside scrolling content.' },
];

const ALL_COMPONENTS = [
  ...BUTTON_COMPONENTS.map((component) => ({ ...component, category: 'Buttons' })),
  ...CARD_COMPONENTS.map((component) => ({ ...component, category: 'Cards' })),
  ...LAYOUT_COMPONENTS.map((component) => ({ ...component, category: 'Layouts' })),
  ...TEXT_COMPONENTS.map((component) => ({ ...component, category: 'Text' })),
  ...BACKGROUND_COMPONENTS.map((component) => ({ ...component, category: 'Backgrounds' })),
  ...NAVIGATION_COMPONENTS.map((component) => ({ ...component, category: 'Navigation' })),
  ...CALENDAR_COMPONENTS.map((component) => ({ ...component, category: 'Calendar' })),
  ...CURSOR_COMPONENTS.map((component) => ({ ...component, category: 'Cursor' })),
  ...IMAGE_COMPONENTS.map((component) => ({ ...component, category: 'Images' })),
  ...LOADER_COMPONENTS.map((component) => ({ ...component, category: 'Loaders' })),
  ...FORM_COMPONENTS.map((component) => ({ ...component, category: 'Forms' })),
  ...SEARCH_COMPONENTS.map((component) => ({ ...component, category: 'Search' })),
  ...FRAME_COMPONENTS.map((component) => ({ ...component, category: 'Frames' })),
  ...CHART_COMPONENTS.map((component) => ({ ...component, category: 'Charts' })),
  ...FEEDBACK_COMPONENTS.map((component) => ({ ...component, category: 'Feedback' })),
  ...SCROLL_COMPONENTS.map((component) => ({ ...component, category: 'Scroll' })),
];

const COMPONENT_PREVIEWS = {
  ...BUTTON_PREVIEWS,
  ...Object.fromEntries(CARD_COMPONENTS.map((component) => [component.name, null])),
  BentoDemo,
  BookingCard,
  ProUpgradeCard,
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
  MonthCalendar,
  DateRangeCalendar,
  FloatingNavbar,
  DockNavigation,
  SidebarNavigation,
  DynamicIsland,
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
  SkeletonLoader,
  CanvasShadowLoader,
  DualRingLoader,
  WaveDotsLoader,
  HourglassLoader,
  ProgressRingLoader,
  StripedBarLoader,
  HeartbeatLoader,
  SquareGridLoader,
  NewtonCradleLoader,
  ClockSpinLoader,
  TwinSquaresLoader,
  FloatingInput,
  AnimatedInput,
  ToggleSwitch,
  OTPInput,
  AuthCard,
  DeviceFrame,
  TravelSearch,
  SearchBar,
  AutocompleteSearch,
  BarChart,
  LineChart,
  DonutChart,
  RatingInput,
  Toast,
  ToastStack,
  ScrollReveal,
  ScrollParallax,
  StickyScroll,
  CourseCard,
};

export default function Components() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewRevisions, setPreviewRevisions] = useState({});
  const shouldAnimate = useReducedMotion() === false;

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
    'Calendar',
    'Cursor',
    'Images',
    'Loaders',
    'Forms',
    'Scroll',
    'Search',
    'Frames',
    'Charts',
    'Feedback',
    'Layouts',
  ].includes(selectedCategory);
  const filteredComponents = ALL_COMPONENTS.filter(
    (component) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesCategory =
        selectedCategory === 'All' || component.category === selectedCategory;
      const matchesQuery =
        !query ||
        `${component.name} ${component.description} ${component.category}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesQuery;
    }
  );
  const totalInSelection =
    selectedCategory === 'All'
      ? ALL_COMPONENTS.length
      : ALL_COMPONENTS.filter((component) => component.category === selectedCategory)
          .length;

  const clearSearch = () => {
    setSearchQuery('');
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    window.history.replaceState(null, '', url);
  };

  return (
    <section className="w-full bg-[#FAFAFA] px-5 py-10 text-[#18181B] sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-9 flex flex-col justify-between gap-6 border-b border-black/[0.06] pb-8 sm:flex-row sm:items-end lg:mb-10 lg:pb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#52525B] shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
              <span className="size-1.5 rounded-full bg-[#FFDD00]" />
              The NovaMotion library
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-[#18181B] sm:text-5xl lg:text-[60px] lg:leading-[1.05]">
              Small details.
              <br className="hidden sm:block" /> Big motion.
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#71717A] sm:text-base">
              Explore polished, interactive building blocks for interfaces
              that feel a little more alive. Preview each one, then make it
              yours.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.03)]">
            <div className="grid size-10 place-items-center rounded-xl bg-[#F4F4F5] text-[#18181B]">
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div>
              <p className="text-xl font-semibold leading-none tracking-tight">{ALL_COMPONENTS.length}</p>
              <p className="mt-1 text-[11px] font-medium text-[#71717A]">ready-to-use components</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-8">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-[238px]">
          <div className="rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.035)]">
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
              aria-label="Search components"
              placeholder="Search components..."
              className="w-full rounded-xl border border-transparent bg-[#F4F4F5] py-3 pl-10 pr-10 text-[13px] text-[#18181B] transition-all placeholder:text-[#71717A] focus:border-[#E4E4E7] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black/[0.03]"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear component search"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-lg text-[#71717A] transition-colors hover:bg-white hover:text-[#18181B]"
              >
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
              Categories
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                clearSearch();
              }}
              className="text-[11px] font-medium text-[#A1A1AA] transition-colors hover:text-[#18181B]"
            >
              Reset
            </button>
          </div>

          <nav
            aria-label="Component categories"
            className="flex gap-1.5 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.name;
              const categoryCount =
                category.name === 'All'
                  ? ALL_COMPONENTS.length
                  : category.name === 'Galleries'
                    ? category.count
                    : ALL_COMPONENTS.filter(
                        (component) => component.category === category.name
                      ).length;
              return (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  aria-pressed={isSelected}
                  className={`flex shrink-0 items-center justify-between gap-3 rounded-full px-3.5 py-2.5 text-[12px] whitespace-nowrap transition-all cursor-pointer lg:w-full lg:rounded-xl ${
                    isSelected
                      ? 'bg-[#18181B] font-medium text-white shadow-[0_4px_12px_rgba(24,24,27,0.16)]'
                      : 'font-normal text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]'
                  }`}
                >
                  <span>{category.name}</span>
                  <span
                    className={`min-w-6 rounded-full px-1.5 py-0.5 text-center text-[10px] ${
                      isSelected ? 'bg-white/10 text-white/70' : 'bg-[#F4F4F5] text-[#A1A1AA]'
                    }`}
                  >
                    {categoryCount}
                  </span>
                </button>
              );
            })}
          </nav>
          </div>
        </aside>

        <div className="min-w-0 w-full flex-1">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">Browse the collection</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#18181B]">
                {selectedCategory === 'All'
                  ? 'All components'
                  : `${selectedCategory} ${isGalleryCategory ? 'options' : 'components'}`}
              </h2>
            </div>
            <span className="rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-[11px] font-medium text-[#71717A]">
              Showing {isGalleryCategory ? 4 : isCatalogCategory ? filteredComponents.length : activeCategoryObj.count} of{' '}
              {isGalleryCategory ? 4 : isCatalogCategory ? totalInSelection : 100}
            </span>
          </div>

          <div
            className={
              isCatalogCategory
                ? 'grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 xl:gap-5 2xl:grid-cols-3'
                : 'grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'
            }
          >
            {isGalleryCategory ? (
              <GalleryDemos images={DUO_FLIP_IMAGES} />
            ) : isCatalogCategory ? (
              filteredComponents.length > 0 ? (
                filteredComponents.map((component, index) => {
                  const Preview = COMPONENT_PREVIEWS[component.name];

                  return (
                    <motion.div
                      key={component.slug}
                      initial={
                        shouldAnimate
                          ? { opacity: 0, y: 18, scale: 0.985 }
                          : false
                      }
                      whileInView={
                        shouldAnimate
                          ? { opacity: 1, y: 0, scale: 1 }
                          : undefined
                      }
                      viewport={{ once: true, amount: 0.12 }}
                      transition={
                        shouldAnimate
                          ? {
                              duration: 0.48,
                              delay: (index % 3) * 0.045,
                              ease: [0.22, 1, 0.36, 1],
                            }
                          : { duration: 0 }
                      }
                      className={`h-full ${
                        component.name === 'TravelSearch'
                          ? 'col-span-full w-full max-w-[960px] justify-self-center'
                          : component.name === 'BentoDemo'
                            ? 'col-span-full w-full'
                          : 'w-full'
                      }`}
                    >
                      <GsapInteractive
                        as="article"
                        className="group flex h-full flex-col rounded-[22px] border border-black/[0.06] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_18px_42px_rgba(0,0,0,0.08)] sm:p-5"
                      >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#F4F4F5] px-2.5 py-1 text-[10px] font-semibold text-[#52525B]">
                          {component.category}
                        </span>
                        <span className="text-[10px] font-medium text-[#A1A1AA]">Interactive preview</span>
                      </div>

                      <div
                        key={`${component.slug}-${previewRevisions[component.slug] ?? 0}`}
                        className={`my-4 flex min-h-[230px] flex-1 items-center justify-center overflow-hidden rounded-[17px] border border-black/[0.045] bg-[#F8F8F8] px-3 py-5 sm:my-5 sm:px-4 ${
                          component.name === 'BentoDemo'
                            ? '!min-h-0 !overflow-visible !rounded-none !border-0 !bg-transparent !px-0 !py-0'
                            : ''
                        }`}
                      >
                        {component.name === 'BookingCard' ? (
                          <BookingCard className="w-full" />
                        ) : component.name === 'BentoDemo' ? (
                          <BentoDemo className="w-full" />
                        ) : component.name === 'CourseCard' ? (
                          <CourseCard className="mx-auto" />
                        ) : component.name === 'AuthCard' ? (
                          <AuthCard
                            logo={
                              <Image
                                src="/fab.svg"
                                alt="NovaMotion logo"
                                width={48}
                                height={48}
                              />
                            }
                          />
                        ) : component.category === 'Cards' ? (
                          <CardPreview componentName={component.name} />
                        ) : component.name === 'TravelSearch' ? (
                          <Preview className="w-full max-w-[920px]" />
                        ) : component.name === 'DeviceFrame' ? (
                          <Preview device="ios">
                            <div className="space-y-3 p-4">
                              <p className="text-[11px] font-semibold text-[#18181B]">
                                Your screen, your design
                              </p>
                              <input
                                aria-label="Device frame preview content"
                                defaultValue="Edit this screen"
                                className="w-full rounded-lg border border-[#E4E4E7] px-2 py-2 text-[10px] text-[#18181B]"
                              />
                              <div className="h-20 rounded-xl bg-[#F4F4F5]" />
                            </div>
                          </Preview>
                        ) : (
                          <Preview>
                            {component.category === 'Buttons' ? 'Try it' : undefined}
                          </Preview>
                        )}
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-[14px] font-semibold tracking-tight text-[#18181B]">
                            {component.name}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-[#71717A]">
                            {component.description}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          aria-label={`Restart ${component.name} preview`}
                          title="Restart preview"
                          onClick={() =>
                            setPreviewRevisions((current) => ({
                              ...current,
                              [component.slug]: (current[component.slug] ?? 0) + 1,
                            }))
                          }
                          className="grid size-9 place-items-center rounded-xl border border-black/[0.07] bg-white text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
                        >
                          <svg
                            aria-hidden="true"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
                            <path d="M3 3v5h5" />
                          </svg>
                        </button>
                        <Link
                          href={`/components/${component.slug}`}
                          aria-label={`View ${component.name} details`}
                          title="View details"
                          className="inline-flex h-9 items-center gap-2 rounded-xl bg-[#18181B] px-3 text-[11px] font-semibold text-white transition-all hover:bg-[#3F3F46] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
                        >
                          Explore
                          <span aria-hidden="true">↗</span>
                        </Link>
                        </div>
                      </div>
                      </GsapInteractive>
                    </motion.div>
                  );
                })
              ) : (
                <p className="col-span-full rounded-2xl border border-black/[0.06] bg-white px-5 py-14 text-center text-[13px] text-[#71717A]">
                  No components match “{searchQuery}”.
                </p>
              )
            ) : null}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
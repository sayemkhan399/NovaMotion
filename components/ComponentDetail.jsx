'use client';

import Link from 'next/link';
import React, { useState } from 'react';
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
  FlipCard,
  GradientButton,
  GradientCard,
  GradientText,
  GridBackground,
  GlassCard,
  GlowButton,
  ImageCompare,
  ImageReveal,
  LiquidGlassButton,
  MagneticButton,
  MasonryGallery,
  MeteorsBackground,
  MorphingLoader,
  OTPInput,
  ParallaxImage,
  ParticleBackground,
  ProgressBar,
  RippleButton,
  ScrambleText,
  ScrollParallax,
  ScrollReveal,
  SidebarNavigation,
  ShimmerButton,
  SpotlightBackground,
  SpotlightCard,
  SplitText,
  StickyScroll,
  TabBar,
  ThumbnailCarousel,
  TextReveal,
  ToggleSwitch,
  TypewriterText,
  TiltCard,
} from 'novamotion-ui';
import CardPreview from './CardPreview';
import DUO_FLIP_IMAGES from './duoFlipImages';

const INSTALL_COMMAND = 'npm install novamotion-ui';

const COMPONENTS = {
  'animated-button': {
    name: 'AnimatedButton',
    description: 'A crisp lift, scale, and shadow transition on hover.',
    Component: AnimatedButton,
    type: 'button',
  },
  'magnetic-button': {
    name: 'MagneticButton',
    description: 'A playful button that follows your pointer.',
    Component: MagneticButton,
    type: 'button',
  },
  'gradient-button': {
    name: 'GradientButton',
    description: 'A vibrant gradient button with a smooth color shift.',
    Component: GradientButton,
    type: 'button',
  },
  'glow-button': {
    name: 'GlowButton',
    description: 'A dark button surrounded by a soft violet glow.',
    Component: GlowButton,
    type: 'button',
  },
  'shimmer-button': {
    name: 'ShimmerButton',
    description: 'A light sweep animates across the button on hover.',
    Component: ShimmerButton,
    type: 'button',
  },
  'ripple-button': {
    name: 'RippleButton',
    description: 'A ripple expands from the point where the button is pressed.',
    Component: RippleButton,
    type: 'button',
  },
  'liquid-glass-button': {
    name: 'LiquidGlassButton',
    description: 'A translucent glass surface with a glossy highlight that follows your pointer.',
    Component: LiquidGlassButton,
    type: 'button',
  },
  'spotlight-card': {
    name: 'SpotlightCard',
    description: 'A pointer-tracked glow illuminates the card surface.',
    Component: SpotlightCard,
    type: 'card',
  },
  'tilt-card': {
    name: 'TiltCard',
    description: 'A responsive 3D tilt follows your pointer.',
    Component: TiltCard,
    type: 'card',
  },
  'glass-card': {
    name: 'GlassCard',
    description: 'A translucent glass surface with a soft backdrop blur.',
    Component: GlassCard,
    type: 'card',
  },
  'flip-card': {
    name: 'FlipCard',
    description: 'Click or tap to flip between the front and back faces.',
    Component: FlipCard,
    type: 'card',
  },
  'gradient-card': {
    name: 'GradientCard',
    description: 'A vivid gradient edge frames the card content.',
    Component: GradientCard,
    type: 'card',
  },
  'typewriter-text': {
    name: 'TypewriterText',
    description: 'Types a message character by character, with an animated caret.',
    Component: TypewriterText,
    type: 'text',
  },
  'text-reveal': {
    name: 'TextReveal',
    description: 'Reveals clipped text when its container is hovered.',
    Component: TextReveal,
    type: 'text',
  },
  'gradient-text': {
    name: 'GradientText',
    description: 'Applies a vivid gradient fill to a text label.',
    Component: GradientText,
    type: 'text',
  },
  'split-text': {
    name: 'SplitText',
    description: 'Separates a phrase into individually interactive characters.',
    Component: SplitText,
    type: 'text',
  },
  'scramble-text': {
    name: 'ScrambleText',
    description: 'Cycles through random characters until the final message resolves.',
    Component: ScrambleText,
    type: 'text',
  },
  'aurora-background': {
    name: 'AuroraBackground',
    description: 'A layered, animated aurora background for hero content.',
    Component: AuroraBackground,
    type: 'background',
  },
  'particle-background': {
    name: 'ParticleBackground',
    description: 'A star field of gently twinkling particles.',
    Component: ParticleBackground,
    type: 'background',
  },
  'grid-background': {
    name: 'GridBackground',
    description: 'A subtle repeating grid behind your content.',
    Component: GridBackground,
    type: 'background',
  },
  'spotlight-background': {
    name: 'SpotlightBackground',
    description: 'A spotlight follows the pointer across the background.',
    Component: SpotlightBackground,
    type: 'background',
  },
  'meteors-background': {
    name: 'MeteorsBackground',
    description: 'A dark sky with animated meteor streaks.',
    Component: MeteorsBackground,
    type: 'background',
  },
  'floating-navbar': {
    name: 'FloatingNavbar',
    description: 'A floating navbar with working active-item selection.',
    Component: FloatingNavbar,
    type: 'navigation',
  },
  'dock-navigation': {
    name: 'DockNavigation',
    description: 'A compact dock-style navigation with active feedback.',
    Component: DockNavigation,
    type: 'navigation',
  },
  'sidebar-navigation': {
    name: 'SidebarNavigation',
    description: 'A vertical sidebar with selectable navigation links.',
    Component: SidebarNavigation,
    type: 'navigation',
  },
  'bubble-navigation': {
    name: 'BubbleNavigation',
    description: 'A pill-shaped navigation with a moving active state.',
    Component: BubbleNavigation,
    type: 'navigation',
  },
  'tab-bar': {
    name: 'TabBar',
    description: 'An animated, responsive tab bar with pill, labeled, and center-action styles.',
    Component: TabBar,
    type: 'navigation',
  },
  'custom-cursor': {
    name: 'CustomCursor',
    description: 'Replaces the pointer with a custom ring inside its stage.',
    Component: CustomCursor,
    type: 'cursor',
  },
  'cursor-trail': {
    name: 'CursorTrail',
    description: 'Leaves a fading trail behind the pointer.',
    Component: CursorTrail,
    type: 'cursor',
  },
  'cursor-follower': {
    name: 'CursorFollower',
    description: 'A softly animated ring follows pointer movement.',
    Component: CursorFollower,
    type: 'cursor',
  },
  'image-reveal': {
    name: 'ImageReveal',
    description: 'A light sweep animates across the image on hover.',
    Component: ImageReveal,
    type: 'image',
  },
  'parallax-image': {
    name: 'ParallaxImage',
    description: 'The image shifts gently in response to pointer movement.',
    Component: ParallaxImage,
    type: 'image',
  },
  'image-compare': {
    name: 'ImageCompare',
    description: 'Drag the range control to compare before and after images.',
    Component: ImageCompare,
    type: 'image',
  },
  'duo-flip': {
    name: 'DuoFlip',
    description: 'A WebGL image gallery with a liquid page-fold transition, autoplay, drag, and keyboard navigation.',
    Component: DuoFlip,
    type: 'gallery',
  },
  'masonry-gallery': {
    name: 'MasonryGallery',
    description: 'An interactive image mosaic with a click-to-enlarge lightbox.',
    Component: MasonryGallery,
    type: 'gallery',
  },
  'thumbnail-carousel': {
    name: 'ThumbnailCarousel',
    description: 'A featured-image carousel with working arrows and selectable thumbnails.',
    Component: ThumbnailCarousel,
    type: 'gallery',
  },
  'morphing-loader': {
    name: 'MorphingLoader',
    description: 'A soft gradient shape continuously changes form.',
    Component: MorphingLoader,
    type: 'loader',
  },
  'circular-loader': {
    name: 'CircularLoader',
    description: 'An animated circular progress indicator.',
    Component: CircularLoader,
    type: 'loader',
  },
  'progress-bar': {
    name: 'ProgressBar',
    description: 'An adjustable progress bar with an accessible value.',
    Component: ProgressBar,
    type: 'loader',
  },
  'floating-input': {
    name: 'FloatingInput',
    description: 'An accessible input with a label that floats on focus.',
    Component: FloatingInput,
    type: 'form',
  },
  'animated-input': {
    name: 'AnimatedInput',
    description: 'A clean input with a smoothly animated focus state.',
    Component: AnimatedInput,
    type: 'form',
  },
  'toggle-switch': {
    name: 'ToggleSwitch',
    description: 'An accessible switch with controlled and uncontrolled modes.',
    Component: ToggleSwitch,
    type: 'form',
  },
  'otp-input': {
    name: 'OTPInput',
    description: 'A multi-digit code input with automatic focus advance.',
    Component: OTPInput,
    type: 'form',
  },
  'scroll-reveal': {
    name: 'ScrollReveal',
    description: 'Content fades and slides into view when scrolled into the viewport.',
    Component: ScrollReveal,
    type: 'scroll',
  },
  'scroll-parallax': {
    name: 'ScrollParallax',
    description: 'Content moves at a different speed as the page scrolls.',
    Component: ScrollParallax,
    type: 'scroll',
  },
  'sticky-scroll': {
    name: 'StickyScroll',
    description: 'A sticky summary stays in place beside scrolling sections.',
    Component: StickyScroll,
    type: 'scroll',
  },
};

function getUsageCode(componentName, language, type) {
  const isButton = type === 'button';
  const isCard = type === 'card';
  const childrenByComponent = {
    SpotlightCard: 'Maya Chen · Product designer',
    TiltCard: 'Velocity Runner · $89',
    GlassCard: 'Lake Louise · 18° and sunny',
    FlipCard: 'A week in Kyoto',
    GradientCard: 'The Garden Table · Italian dining',
    AuroraBackground: 'Create beyond the ordinary.',
    ParticleBackground: 'Explore the night sky.',
    GridBackground: 'A clear space to create.',
    SpotlightBackground: 'Follow the light.',
    MeteorsBackground: 'Make a wish.',
    CustomCursor: 'Move your pointer here.',
    CursorTrail: 'Move your pointer here.',
    CursorFollower: 'Move your pointer here.',
    ScrollReveal: 'This section appears as you scroll.',
    ScrollParallax: 'Scroll to move this layer.',
  };
  const child = childrenByComponent[componentName];
  const propsByComponent = {
    TypewriterText: ' text="Ideas in motion."',
    TextReveal: ' text="Reveal the details."',
    GradientText: ' text="Color your ideas"',
    SplitText: ' text="Move with purpose"',
    ScrambleText: ' text="Signal found"',
    ImageReveal:
      ' src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" alt="Sunlit mountain landscape"',
    ParallaxImage:
      ' src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" alt="Sunlit mountain landscape"',
    ImageCompare:
      ' beforeSrc="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" afterSrc="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85"',
    ProgressBar: ' value={68} label="Upload progress"',
    FloatingInput: ' label="Email address" type="email"',
    AnimatedInput: ' label="Search projects"',
    ToggleSwitch: ' label="Enable notifications"',
    OTPInput: ' length={6}',
  };
  const extraProps =
    propsByComponent[componentName] ??
    (isCard ? ' className="w-full max-w-sm"' : '');
  const flipBackFace =
    componentName === 'FlipCard'
      ? ' backFace="5 days · 12 curated places"'
      : '';

  if (type === 'gallery') {
    const galleryProps =
      componentName === 'DuoFlip'
        ? ' aspect={1.6} autoplay'
        : ' className="w-full max-w-xl"';

    return `import { ${componentName} } from "novamotion-ui";

const images = [
  {
    src: "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?auto=format&fit=crop&w=900&q=80",
    alt: "Poppies",
    label: "Poppies",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    alt: "Sunlit Meadow",
    label: "Sunlit Meadow",
  },
];

export default function Example() {
  return <${componentName} images={images}${galleryProps} />;
}`;
  }

  if (type === 'navigation' && componentName === 'TabBar') {
    return `import { TabBar } from "novamotion-ui";

const tabs = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "history", label: "History", icon: "history", badge: 3 },
  { id: "profile", label: "Profile", icon: "profile" },
];

export default function Example() {
  return (
    <TabBar
      tabs={tabs}
      variant="pill"
      onChange={(id) => console.log("Selected:", id)}
    />
  );
}`;
  }

  if (isButton && language === 'TSX') {
    return `import { ${componentName} } from "novamotion-ui";

type ExampleProps = {
  label?: string;${card ? '' : '\n  disabled?: boolean;'}
};

export default function Example({ label = "${child}"${card ? '' : ', disabled = false'} }: ExampleProps) {
  return (
    <${componentName}${card ? ' className="w-full max-w-sm"' : ' disabled={disabled}'}${cardProps}>
      {label}
    </${componentName}>
  );
}`;
  }

  if (isButton) {
    return `import { ${componentName} } from "novamotion-ui";

export default function Example() {
  return (
    <${componentName} onClick={() => console.log("Clicked")}>
      Click me
    </${componentName}>
  );
}`;
  }

  if (isCard) {
    return `import { ${componentName} } from "novamotion-ui";

export default function Example() {
  return (
    <${componentName}${extraProps}${flipBackFace}>
      ${child}
    </${componentName}>
  );
}`;
  }

  const hasChildren = Boolean(child);
  const openingTag = `<${componentName}${extraProps}`;
  const code = hasChildren
    ? `${openingTag}>
      ${child}
    </${componentName}>`
    : `${openingTag} />`;

  if (language === 'TSX') {
    return `import { ${componentName} } from "novamotion-ui";

export default function Example() {
  return (
    ${code}
  );
}`;
  }

  return `import { ${componentName} } from "novamotion-ui";

export default function Example() {
  return (${code});
}`;
}

export default function ComponentDetail({ slug }) {
  const [language, setLanguage] = useState('JSX');
  const [disabled, setDisabled] = useState(false);
  const [notice, setNotice] = useState('');
  const detail = COMPONENTS[slug];

  const copyText = async (text, successMessage) => {
    if (!navigator.clipboard) {
      setNotice('Clipboard access is unavailable in this browser.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setNotice(successMessage);
    } catch {
      setNotice('Could not copy. Check your browser clipboard permissions.');
    }
  };

  if (!detail) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-[#18181B]">Component not found</h1>
        <p className="mt-2 text-sm text-[#71717A]">
          This component is not in the NovaMotion library yet.
        </p>
        <Link
          href="/components"
          className="mt-6 inline-flex rounded-full bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#27272A]"
        >
          Back to components
        </Link>
      </main>
    );
  }

  const Preview = detail.Component;
  const sourceCode = getUsageCode(detail.name, language, detail.type);

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#FAFAFA] px-5 py-8 text-[#18181B] sm:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-center justify-between">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#71717A] transition-colors hover:text-[#18181B]"
          >
            <span aria-hidden="true">←</span>
            All components
          </Link>
          <button
            type="button"
            onClick={() => copyText(window.location.href, 'Component link copied.')}
            className="rounded-full bg-white px-4 py-2 text-[12px] font-medium text-[#52525B] shadow-sm transition-colors hover:bg-[#F4F4F5]"
          >
            Share component
          </button>
        </div>

        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between border-b border-[#F4F4F5] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
                  Live preview
                </p>
                <h1 className="mt-1 text-[18px] font-bold tracking-tight">
                  {detail.name}
                </h1>
              </div>
              {detail.type === 'button' && (
                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#52525B]">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(event) => setDisabled(event.target.checked)}
                    className="accent-[#18181B]"
                  />
                  Disabled
                </label>
              )}
            </div>

            <div className="flex min-h-[340px] items-center justify-center bg-[#F6F6F6] p-8">
              {detail.type === 'card' ? (
                <CardPreview
                  componentName={detail.name}
                  onAction={setNotice}
                />
              ) : detail.type === 'gallery' ? (
                <Preview
                  images={DUO_FLIP_IMAGES}
                  {...(detail.name === 'DuoFlip' ? { aspect: 1.6 } : {})}
                  className="mx-auto w-full max-w-[500px]"
                />
              ) : detail.type === 'button' ? (
                <Preview
                  disabled={disabled}
                  onClick={() => setNotice(`${detail.name} is working.`)}
                >
                  {detail.name.replace(/Button$/, '')}
                </Preview>
              ) : detail.type === 'navigation' && detail.name === 'TabBar' ? (
                <div className="flex w-full flex-col items-center gap-8">
                  {['pill', 'labels', 'action'].map((variant) => (
                    <div key={variant} className="w-full">
                      <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-[#71717A]">
                        {variant} style
                      </p>
                      <Preview
                        variant={variant}
                        className="mx-auto"
                        onChange={(id) => setNotice(`${id} tab selected.`)}
                        onAction={() => setNotice('Create action selected.')}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Preview />
              )}
            </div>
            <p className="px-5 py-4 text-[13px] leading-relaxed text-[#71717A]">
              {detail.description}
            </p>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[24px] border border-black/[0.05] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
                    Install
                  </p>
                  <h2 className="mt-1 text-[15px] font-semibold">Add the library</h2>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(INSTALL_COMMAND, 'Install command copied.')}
                  className="rounded-full bg-[#F4F4F5] px-3 py-1.5 text-[12px] font-medium text-[#52525B] transition-colors hover:bg-[#E4E4E7]"
                >
                  Copy
                </button>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-[14px] bg-[#18181B] px-4 py-3 text-[12px] text-[#F4F4F5]">
                <code>{INSTALL_COMMAND}</code>
              </pre>
              <p className="mt-3 text-[11px] leading-relaxed text-[#A1A1AA]">
                NovaMotion UI is prepared for npm publishing, but is not published yet.
                Tailwind CSS is required; see the package README for setup.
              </p>
            </section>

            <section className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between border-b border-[#F4F4F5] px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
                    Usage code
                  </p>
                  <h2 className="mt-1 text-[15px] font-semibold">
                    Example.{language.toLowerCase()}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(sourceCode, `${language} source copied.`)}
                  className="rounded-full bg-[#18181B] px-3.5 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#27272A]"
                >
                  Copy code
                </button>
              </div>

              <div className="flex gap-1 border-b border-[#F4F4F5] px-4 py-2">
                {['JSX', 'TSX'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={language === option}
                    onClick={() => setLanguage(option)}
                    className={`rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                      language === option
                        ? 'bg-[#18181B] text-white'
                        : 'text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B]'
                    }`}
                  >
                    .{option.toLowerCase()}
                  </button>
                ))}
              </div>

              <pre className="max-h-[360px] min-h-[230px] overflow-auto bg-[#18181B] p-5 text-[12px] leading-[1.7] text-[#E4E4E7]">
                <code>{sourceCode}</code>
              </pre>
            </section>

            {notice && (
              <p role="status" className="px-1 text-[12px] text-[#52525B]">
                {notice}
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

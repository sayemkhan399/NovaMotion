'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Laptop, Monitor, Smartphone } from 'lucide-react';
import {
  AuthCard,
  AutocompleteSearch,
  AnimatedInput,
  AnimatedButton,
  AuroraBackground,
  BarChart,
  BookingCard,
  BubbleNavigation,
  CanvasShadowLoader,
  CircularLoader,
  CursorFollower,
  CursorTrail,
  CourseCard,
  CustomCursor,
  DateRangeCalendar,
  DeviceFrame,
  DonutChart,
  DockNavigation,
  DynamicIsland,
  DuoFlip,
  FloatingInput,
  FloatingNavbar,
  FlipCard,
  GradientButton,
  GradientCard,
  GradientText,
  GsapInteractive,
  GridBackground,
  GlassCard,
  GlowButton,
  ImageCompare,
  ImageReveal,
  LiquidGlassButton,
  LineChart,
  MagneticButton,
  MasonryGallery,
  MonthCalendar,
  MeteorsBackground,
  MorphingLoader,
  OTPInput,
  ParallaxImage,
  ParticleBackground,
  ProgressBar,
  RatingInput,
  RippleButton,
  SearchBar,
  ScrambleText,
  ScrollParallax,
  ScrollReveal,
  SkeletonLoader,
  SidebarNavigation,
  ShimmerButton,
  Social,
  SpotlightBackground,
  SpotlightCard,
  SplitText,
  StickyScroll,
  TabBar,
  ThumbnailCarousel,
  TextReveal,
  Toast,
  ToggleSwitch,
  TypewriterText,
  TiltCard,
} from 'novamotion-ui';
import CardPreview from './CardPreview';
import DUO_FLIP_IMAGES from './duoFlipImages';
import TravelSearch from './TravelSearch';
import { SidebarToastDemo, ToastPlayground } from './ToastExamples';
import { notifyDynamicIsland } from './dynamicIslandEvents';

const INSTALL_COMMAND = 'npm install novamotion-ui';
const DEVICE_PRESETS = {
  pc: { label: 'PC', width: 1440, height: 900, Icon: Monitor },
  laptop: { label: 'Laptop', width: 1024, height: 768, Icon: Laptop },
  mobile: { label: 'Mobile', width: 390, height: 844, Icon: Smartphone },
};

const CUSTOMIZATION_GUIDES = {
  AuthCard: {
    attributes: [
      ['defaultMode', 'Initial form view: "signin" or "signup".'],
      ['mode / onModeChange', 'Control the current form mode and observe changes.'],
      ['onSubmit', 'Async callback receiving { mode, email, password, name? }; connect your authentication API here. Throw an Error to show a form error.'],
      ['onSocial', 'Callback for Google, Apple, or GitHub authentication.'],
      ['onForgotPassword', 'Callback receiving the current email for password recovery.'],
      ['logo', 'Optional React node rendered as the card logo.'],
      ['className', 'Tailwind classes applied to the outer card.'],
    ],
    selectors: [
      ['The root section className', 'Change card width, padding, border, background, and shadow.'],
      ['.fieldClass', 'Change shared input height, radius, border, focus ring, and background.'],
      ['Submit button className', 'Change the primary action appearance.'],
    ],
    source: 'packages/novamotion-ui/src/AuthCard.tsx',
  },
  Social: {
    attributes: [
      ['onProviderClick', 'Callback receiving "google", "github", or "apple". Connect each provider to your backend or OAuth flow; rejected promises are displayed as errors.'],
      ['className', 'Tailwind classes applied to the button group.'],
    ],
    selectors: [
      ['The root div className', 'Change the button group width and spacing.'],
      ['Button className', 'Adjust button height, border, surface, typography, hover, and focus states.'],
    ],
    source: 'packages/novamotion-ui/src/Social.tsx',
  },
  BookingCard: {
    attributes: [
      ['title / subtitle', 'Heading and supporting text above the date picker.'],
      ['start / days', 'First date shown and number of days available.'],
      ['times', 'Time slots offered for each available date.'],
      ['isUnavailable', 'Callback that marks dates unavailable.'],
      ['takenTimes', 'Callback that returns reserved times for a date.'],
      ['onBook', 'Async callback receiving { date, time }; connect your booking API here. Rejected promises are shown as errors.'],
      ['onAddToCalendar', 'Callback receiving the confirmed date and time.'],
      ['className', 'Tailwind classes applied to the outer booking card.'],
    ],
    selectors: [
      ['The root div className', 'Change the card width, background, text color, radius, and shadow.'],
      ['The picker content className', 'Change inner padding and spacing.'],
      ['Date and time button className values', 'Adjust selection states, sizing, borders, and hover styles.'],
      ['The booking button className', 'Customize the primary action and focus ring.'],
    ],
    source: 'packages/novamotion-ui/src/BookingCard.tsx',
  },
  SearchBar: {
    attributes: [
      ['value / defaultValue', 'Set a controlled query or its initial value.'],
      ['onChange', 'Called with the current query string.'],
      ['onSearch', 'Called with the trimmed query when the form is submitted.'],
      ['placeholder / label', 'Set the prompt text and accessible search name.'],
      ['disabled', 'Disable editing and submit actions.'],
      ['className', 'Tailwind classes applied to the search form.'],
    ],
    selectors: [
      ['The root form className', 'Adjust the search field surface, border, shadow, and spacing.'],
      ['The input className', 'Customize input typography, padding, and focus appearance.'],
    ],
    source: 'packages/novamotion-ui/src/Search.tsx',
  },
  AutocompleteSearch: {
    attributes: [
      ['options', 'Suggestion objects with label, value, and optional description.'],
      ['value / defaultValue', 'Set a controlled query or its initial value.'],
      ['onChange', 'Called with each query string as it changes.'],
      ['onSelect', 'Called with the selected suggestion object.'],
      ['placeholder / label', 'Set the prompt text and accessible search name.'],
      ['className', 'Tailwind classes applied to the search wrapper.'],
    ],
    selectors: [
      ['The root div className', 'Adjust the autocomplete width and outer spacing.'],
      ['The listbox and option className values', 'Customize the suggestion panel and active result state.'],
    ],
    source: 'packages/novamotion-ui/src/Search.tsx',
  },
  SkeletonLoader: {
    attributes: [
      ['className', 'Tailwind classes applied to the skeleton card container.'],
    ],
    selectors: [
      ['The root div className', 'Change the skeleton card width, surface, padding, border, and shadow.'],
      ['Placeholder div className values', 'Adjust the avatar, image, text-line, and action placeholder shapes.'],
    ],
    source: 'packages/novamotion-ui/src/Loaders.tsx',
  },
  CanvasShadowLoader: {
    attributes: [
      ['label', 'Accessible loading status and visible preparation message.'],
      ['className', 'Tailwind classes applied to the loader container.'],
    ],
    selectors: [
      ['.novamotion-canvas-shadow', 'Adjust the moving shadow shapes and their colors.'],
      ['The root div className', 'Change the canvas loader size, surface, border, and shadow.'],
    ],
    source: 'packages/novamotion-ui/src/Loaders.tsx',
  },
  MonthCalendar: {
    attributes: [
      ['value / defaultValue', 'Control the selected date, or set its initial selection.'],
      ['onChange', 'Called with the selected Date when a day is picked.'],
      ['events', 'Dates marked with an event indicator.'],
      ['weekStartsOn', 'Set Sunday (0) or Monday (1) as the first day of the week.'],
      ['locale', 'Locale used for month, weekday, and accessible date labels.'],
      ['className', 'Tailwind classes applied to the calendar root.'],
    ],
    selectors: [
      ['The root div className', 'Change calendar width, surface, padding, text color, and shadow.'],
      ['The `arrow` class', 'Style the month navigation controls.'],
      ['The day button className', 'Adjust day size, selected/hover states, and focus ring.'],
    ],
    source: 'packages/novamotion-ui/src/MonthCalendar.tsx',
  },
  DateRangeCalendar: {
    attributes: [
      ['checkIn / checkOut', 'Control the selected stay dates; omit either prop to manage that side internally.'],
      ['defaultCheckIn / defaultCheckOut', 'Set initial check-in and check-out dates for an uncontrolled calendar.'],
      ['minDate / maxDate', 'Set the first and last selectable dates.'],
      ['disabledDates', 'Array of dates that cannot be selected.'],
      ['numberOfMonths', 'Show one or two consecutive months; defaults to two.'],
      ['weekStartsOn / locale', 'Choose Sunday or Monday as the first weekday and set date formatting locale.'],
      ['onChange', 'Called with { checkIn, checkOut } whenever the stay range changes.'],
      ['className', 'Additional Tailwind classes for the calendar.'],
    ],
    source: 'packages/novamotion-ui/src/DateRangeCalendar.tsx',
  },
  CourseCard: {
    attributes: [
      ['badge', 'Text shown in the top-right badge. Set to an empty string to hide it.'],
      ['lessonsCount', 'Lesson count shown in the lower-left label.'],
      ['title', 'Course heading.'],
      ['description', 'Course summary below the heading.'],
      ['onClick', 'Optional callback invoked when the card is clicked or activated by keyboard.'],
      ['className', 'Tailwind classes applied to the outer article for width, spacing, border, and other overrides.'],
    ],
    selectors: [
      ['article.course-card', 'Outer card surface, border, radius, shadow, and hover state.'],
      ['.course-card__stage', 'Illustration stage background and height.'],
      ['The SVG wave paths', 'Wave shape and fill colors (#AEEBFA, #83DFF6, #56CEEE, #32B9DF).'],
      ['The title and description className values', 'Typography, spacing, and text colors.'],
    ],
    source: 'packages/novamotion-ui/src/CourseCard.tsx',
  },
  DynamicIsland: {
    attributes: [
      ['activity', 'Control the active "music", "call", or "delivery" activity. Omit it to use internal state.'],
      ['autoCycle', 'Automatically rotate through activities when using internal state.'],
      ['cycleDuration', 'Milliseconds between automatic activity changes (minimum 1800ms).'],
      ['onActivityChange', 'Called when an activity is selected or changes during auto-cycle.'],
      ['className', 'Additional Tailwind classes for the component wrapper.'],
    ],
    source: 'packages/novamotion-ui/src/DynamicIsland.tsx',
  },
};

const ATTRIBUTES_BY_TYPE = {
  button: [
    ['children', 'Button label or content.'],
    ['disabled', 'Disables interaction where supported.'],
    ['onClick', 'Click handler.'],
    ['className', 'Additional Tailwind classes for the button.'],
  ],
  card: [
    ['children', 'Card content (FlipCard also accepts backFace).'],
    ['className', 'Additional Tailwind classes for the card.'],
    ['onClick', 'Click handler where supported.'],
  ],
  text: [
    ['text', 'Text content for text components.'],
    ['children', 'Content for components that render children.'],
    ['className', 'Additional Tailwind classes for the text.'],
  ],
  background: [
    ['children', 'Content displayed over the background.'],
    ['className', 'Additional Tailwind classes for the background wrapper.'],
  ],
  navigation: [
    ['items', 'Navigation entries.'],
    ['activeItem', 'Currently selected item.'],
    ['onSelect', 'Selection callback.'],
    ['className', 'Additional Tailwind classes for the navigation wrapper.'],
  ],
  calendar: [
    ['checkIn / checkOut', 'Controlled selected dates.'],
    ['minDate / maxDate / disabledDates', 'Limit which dates can be selected.'],
    ['numberOfMonths', 'Show one or two consecutive months.'],
    ['onChange', 'Called with the selected check-in and check-out dates.'],
    ['className', 'Additional Tailwind classes for the calendar.'],
  ],
  cursor: [
    ['children', 'Content shown in the cursor demo stage.'],
    ['className', 'Additional Tailwind classes for the stage.'],
  ],
  image: [
    ['src / beforeSrc / afterSrc', 'Image URL or comparison image URLs, depending on the component.'],
    ['alt', 'Accessible image description.'],
    ['className', 'Additional Tailwind classes for the image wrapper.'],
  ],
  gallery: [
    ['images', 'Array of image objects with src, alt, and label.'],
    ['className', 'Additional Tailwind classes for the gallery.'],
  ],
  loader: [
    ['value', 'Progress value for ProgressBar.'],
    ['label', 'Accessible progress label.'],
    ['className', 'Additional Tailwind classes for the loader.'],
  ],
  form: [
    ['label', 'Visible or accessible field label.'],
    ['value / onChange', 'Controlled field value and change handler, where supported.'],
    ['className', 'Additional Tailwind classes for the form control.'],
    ['onSubmit', 'Submit callback where supported. Use it to send validated form data to your backend.'],
  ],
  search: [
    ['onSearch', 'Called with the active travel search payload. Connect it to your flight, visa, hotel, or holiday search API.'],
    ['className', 'Additional Tailwind classes for the search component wrapper.'],
  ],
  frame: [
    ['device', 'Choose the iOS, Android, or watch frame.'],
    ['children', 'Custom React content displayed inside the device screen.'],
    ['className', 'Additional Tailwind classes for the frame wrapper.'],
  ],
  scroll: [
    ['children', 'Content affected by the scroll interaction.'],
    ['className', 'Additional Tailwind classes for the component.'],
  ],
  chart: [
    ['data', 'Array of { label, value } points used to render the chart.'],
    ['title', 'Chart heading.'],
    ['className', 'Additional Tailwind classes for the chart container.'],
  ],
  feedback: [
    ['value / defaultValue', 'Control the initial or selected rating.'],
    ['max', 'Number of stars available in the rating input.'],
    ['onChange', 'Called with the new rating when a star is selected.'],
    ['title / description', 'Toast heading and supporting message.'],
    ['variant', 'Choose success, info, warning, error, or loading toast styling.'],
    ['className', 'Additional Tailwind classes for the component.'],
  ],
};

function ResponsivePreview({ device, children }) {
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [frameRoot, setFrameRoot] = useState(null);
  const preset = DEVICE_PRESETS[device];

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const updateScale = (availableWidth) => {
      const maxFrameHeight = Math.max(220, window.innerHeight - 190);
      setScale(
        Math.min(
          1,
          availableWidth / preset.width,
          maxFrameHeight / preset.height,
        ),
      );
    };
    const observer = new ResizeObserver(([entry]) =>
      updateScale(entry.contentRect.width),
    );
    const handleWindowResize = () => {
      const styles = window.getComputedStyle(stage);
      const horizontalPadding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      updateScale(stage.clientWidth - horizontalPadding);
    };

    observer.observe(stage);
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [preset.height, preset.width]);

  const handleFrameLoad = (event) => {
    const frameDocument = event.currentTarget.contentDocument;
    if (!frameDocument) return;

    frameDocument.body.style.margin = '0';
    frameDocument.body.style.minHeight = '100vh';
    frameDocument.body.style.backgroundColor = '#fff';
    const previewStyles = frameDocument.createElement('style');
    previewStyles.textContent =
      '#preview-root{box-sizing:border-box;display:flex;min-height:100vh;width:100%;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:clamp(16px,4vw,48px)}';
    frameDocument.head.appendChild(previewStyles);
    document
      .querySelectorAll('link[rel="stylesheet"], style')
      .forEach((stylesheet) => {
        frameDocument.head.appendChild(stylesheet.cloneNode(true));
      });
    setFrameRoot(frameDocument.getElementById('preview-root'));
  };

  return (
    <div ref={stageRef} className="flex min-h-[360px] w-full justify-center overflow-hidden bg-[#F6F6F6] p-3 sm:p-6">
      <div
        className="shrink-0"
        style={{
          width: preset.width * scale,
          height: preset.height * scale,
        }}
      >
        <iframe
          title={`${preset.label} responsive preview`}
          srcDoc="<!doctype html><html><head><meta name='viewport' content='width=device-width, initial-scale=1'></head><body><div id='preview-root'></div></body></html>"
          onLoad={handleFrameLoad}
          className="origin-top-left overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
          style={{
            width: preset.width,
            height: preset.height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
        {frameRoot && createPortal(children, frameRoot)}
      </div>
    </div>
  );
}

const COMPONENTS = {
  'animated-button': {
    name: 'AnimatedButton',
    description: 'A crisp lift, scale, and shadow transition on hover.',
    Component: AnimatedButton,
    type: 'button',
  },
  social: {
    name: 'Social',
    description: 'Google, GitHub, and Apple sign-in buttons with provider callbacks.',
    Component: Social,
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
  'course-card': {
    name: 'CourseCard',
    description: 'A responsive course card with a layered cyan-wave illustration, lesson badge, and customizable course content.',
    Component: CourseCard,
    type: 'card',
  },
  'booking-card': {
    name: 'BookingCard',
    description: 'An animated booking flow for selecting an available date and time, with an async callback for submitting reservations.',
    Component: BookingCard,
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
  'date-range-calendar': {
    name: 'DateRangeCalendar',
    description: 'An animated hotel date picker for choosing check-in and check-out dates, with disabled dates and an automatic nights summary.',
    Component: DateRangeCalendar,
    type: 'calendar',
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
  'dynamic-island': {
    name: 'DynamicIsland',
    description: 'A premium, animated Dynamic Island with always-on music, call, and live-delivery activity states.',
    Component: DynamicIsland,
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
    styleOptions: ['pill', 'labels', 'action'],
  },
  'month-calendar': {
    name: 'MonthCalendar',
    description: 'An interactive month view with selectable dates, event markers, keyboard navigation, and animated month transitions.',
    Component: MonthCalendar,
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
  'skeleton-loader': {
    name: 'SkeletonLoader',
    description: 'A content-shaped placeholder that gently pulses while data loads.',
    Component: SkeletonLoader,
    type: 'loader',
  },
  'canvas-shadow-loader': {
    name: 'CanvasShadowLoader',
    description: 'Soft, colorful shadows move behind a canvas preview while a creative workspace is prepared.',
    Component: CanvasShadowLoader,
    type: 'loader',
  },
  'floating-input': {
    name: 'FloatingInput',
    description: 'An accessible input with a label that floats on focus.',
    Component: FloatingInput,
    type: 'form',
  },
  'auth-card': {
    name: 'AuthCard',
    description: 'An animated sign-in and sign-up form with validation and callbacks for authentication, social login, and password recovery.',
    Component: AuthCard,
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
  'travel-search': {
    name: 'TravelSearch',
    description: 'A responsive travel booking search for flights, visas, hotels, and holiday packages, with animated tab transitions and a callback-ready search action.',
    Component: TravelSearch,
    type: 'search',
  },
  'search-bar': {
    name: 'SearchBar',
    description: 'A clean, accessible search field with clear and submit actions.',
    Component: SearchBar,
    type: 'search',
  },
  'autocomplete-search': {
    name: 'AutocompleteSearch',
    description: 'A keyboard-friendly search input with filtered, selectable suggestions.',
    Component: AutocompleteSearch,
    type: 'search',
  },
  'device-frame': {
    name: 'DeviceFrame',
    description: 'A responsive device mockup with selectable iOS, Android, and watch frames. Supply any React content as children to customize the screen.',
    Component: DeviceFrame,
    type: 'frame',
    styleOptions: ['ios', 'android', 'watch'],
  },
  'bar-chart': {
    name: 'BarChart',
    description: 'A responsive bar chart for comparing values across categories.',
    Component: BarChart,
    type: 'chart',
  },
  'line-chart': {
    name: 'LineChart',
    description: 'An accessible line chart for showing changes over time.',
    Component: LineChart,
    type: 'chart',
  },
  'donut-chart': {
    name: 'DonutChart',
    description: 'A compact donut chart for visualizing parts of a whole.',
    Component: DonutChart,
    type: 'chart',
  },
  'rating-input': {
    name: 'RatingInput',
    description: 'An interactive, accessible star rating input.',
    Component: RatingInput,
    type: 'feedback',
  },
  toast: {
    name: 'Toast',
    description: 'An animated, dismissible status notification with success, info, warning, error, and loading styles.',
    Component: Toast,
    type: 'feedback',
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
    devicePreview: true,
  },
};

function getUsageCode(componentName, language, type, previewStyle = 'pill') {
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

  if (componentName === 'Social') {
    if (language === 'TSX') {
      return `'use client';

import { Social, type SocialProvider } from "novamotion-ui";

function handleProviderClick(provider: SocialProvider) {
  window.location.assign(\`/api/auth/\${provider}\`);
}

export default function Example() {
  return <Social onProviderClick={handleProviderClick} />;
}`;
    }

    return `'use client';

import { Social } from "novamotion-ui";

function handleProviderClick(provider) {
  window.location.assign(\`/api/auth/\${provider}\`);
}

export default function Example() {
  return <Social onProviderClick={handleProviderClick} />;
}`;
  }
  if (componentName === 'TravelSearch') {
    return language === 'TSX'
      ? `'use client';

import TravelSearch from "@/components/TravelSearch";

type TravelSearchPayload = {
  tab: string;
  [key: string]: string | number | null;
};

export default function Example() {
  function handleSearch(payload: TravelSearchPayload) {
    console.log("Search request:", payload);
  }

  return <TravelSearch onSearch={handleSearch} />;
}`
      : `'use client';

import TravelSearch from "@/components/TravelSearch";

export default function Example() {
  function handleSearch(payload) {
    console.log("Search request:", payload);
  }

  return <TravelSearch onSearch={handleSearch} />;
}`;
  }
  if (componentName === 'DeviceFrame') {
    return language === 'TSX'
      ? `'use client';

import { useState } from "react";
import { DeviceFrame, type DeviceFrameKind } from "novamotion-ui";

function isDeviceFrameKind(value: string): value is DeviceFrameKind {
  return value === "ios" || value === "android" || value === "watch";
}

export default function Example() {
  const [device, setDevice] = useState<DeviceFrameKind>("ios");
  const [message, setMessage] = useState("Hello from my app");

  return (
    <div>
      <select
        value={device}
        onChange={(event) => {
          if (isDeviceFrameKind(event.target.value)) {
            setDevice(event.target.value);
          }
        }}
      >
        <option value="ios">iOS</option>
        <option value="android">Android</option>
        <option value="watch">Watch</option>
      </select>
      <DeviceFrame device={device}>
        <main className="space-y-3 p-4">
          <h1>{message}</h1>
          <input value={message} onChange={(event) => setMessage(event.target.value)} />
        </main>
      </DeviceFrame>
    </div>
  );
}`
      : `'use client';

import { useState } from "react";
import { DeviceFrame } from "novamotion-ui";

export default function Example() {
  const [device, setDevice] = useState("ios");
  const [message, setMessage] = useState("Hello from my app");

  return (
    <div>
      <select value={device} onChange={(event) => setDevice(event.target.value)}>
        <option value="ios">iOS</option>
        <option value="android">Android</option>
        <option value="watch">Watch</option>
      </select>
      <DeviceFrame device={device}>
        <main className="space-y-3 p-4">
          <h1>{message}</h1>
          <input value={message} onChange={(event) => setMessage(event.target.value)} />
        </main>
      </DeviceFrame>
    </div>
  );
}`;
  }
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
    MonthCalendar: ' weekStartsOn={1} onChange={(date) => console.log("Selected:", date)}',
    DateRangeCalendar: ' numberOfMonths={2} onChange={(range) => console.log("Stay dates:", range)}',
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

  if (componentName === 'BookingCard') {
    if (language === 'TSX') {
      return `import { BookingCard, type BookingSlot } from "novamotion-ui";

async function handleBooking(slot: BookingSlot) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: slot.date.toISOString(),
      time: slot.time,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? "Booking failed");
  return result;
}

export default function BookingPage() {
  return <BookingCard onBook={handleBooking} />;
}`;
    }

    return `import { BookingCard } from "novamotion-ui";

async function handleBooking(slot) {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: slot.date.toISOString(),
      time: slot.time,
    }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? "Booking failed");
  return result;
}

export default function BookingPage() {
  return <BookingCard onBook={handleBooking} />;
}`;
  }

  if (componentName === 'AuthCard') {
    if (language === 'TSX') {
      return `import {
  AuthCard,
  type AuthDetails,
  type AuthProvider,
} from "novamotion-ui";

async function handleAuth(details: AuthDetails) {
  const response = await fetch(\`/api/auth/\${details.mode}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: details.email,
      password: details.password,
      name: details.name,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message ?? "Authentication failed");
  }
  return result;
}

async function handleForgotPassword(email: string) {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message ?? "Password recovery failed");
  }
}

function handleSocial(provider: AuthProvider) {
  window.location.assign(\`/api/auth/\${provider}\`);
}

export default function Example() {
  return (
    <AuthCard
      onSubmit={handleAuth}
      onForgotPassword={handleForgotPassword}
      onSocial={handleSocial}
    />
  );
}`;
    }

    return `import { AuthCard } from "novamotion-ui";

async function handleAuth(details) {
  const response = await fetch(\`/api/auth/\${details.mode}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: details.email,
      password: details.password,
      name: details.name,
    }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message ?? "Authentication failed");
  }
  return result;
}

async function handleForgotPassword(email) {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message ?? "Password recovery failed");
  }
}

function handleSocial(provider) {
  window.location.assign(\`/api/auth/\${provider}\`);
}

export default function Example() {
  return (
    <AuthCard
      onSubmit={handleAuth}
      onForgotPassword={handleForgotPassword}
      onSocial={handleSocial}
    />
  );
}`;
  }

  if (componentName === 'CourseCard') {
    return `import { CourseCard } from "novamotion-ui";

export default function Example() {
  return (
    <CourseCard
      badge="New"
      lessonsCount="39 LESSONS"
      title="React for Interviews"
      description="React for interviews, from components and state to effects, forms and testing."
      onClick={() => console.log("Course selected")}
    />
  );
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
      variant="${previewStyle}"
      onChange={(id) => console.log("Selected:", id)}
    />
  );
}`;
  }

  if (isButton && language === 'TSX') {
    return `import { ${componentName} } from "novamotion-ui";

type ExampleProps = {
  label?: string;
  disabled?: boolean;
};

export default function Example({ label = "${componentName.replace(/Button$/, '')}", disabled = false }: ExampleProps) {
  return (
    <${componentName} disabled={disabled}>
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
  const [device, setDevice] = useState('pc');
  const [previewStyle, setPreviewStyle] = useState('pill');
  const [previewRevision, setPreviewRevision] = useState(0);
  const detail = COMPONENTS[slug];

  const setDetailNotice = (message) => setNotice(message);

  const copyText = async (text, successMessage, showIslandNotice = false) => {
    const notifyCopy = (title, description, variant) => {
      if (showIslandNotice) {
        notifyDynamicIsland({ title, description, variant });
      }
    };

    if (!navigator.clipboard) {
      const message = 'Clipboard access is unavailable in this browser.';
      setNotice(message);
      notifyCopy('Could not copy source code', message, 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setNotice(successMessage);
      notifyCopy('Source code copied', successMessage, 'success');
    } catch {
      const message = 'Could not copy. Check your browser clipboard permissions.';
      setNotice(message);
      notifyCopy('Could not copy source code', message, 'error');
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
  const activePreviewStyle = detail.styleOptions?.includes(previewStyle)
    ? previewStyle
    : detail.styleOptions?.[0] ?? previewStyle;
  const sourceCode = getUsageCode(
    detail.name,
    language,
    detail.type,
    activePreviewStyle,
  );
  const customization = CUSTOMIZATION_GUIDES[detail.name];
  const attributes =
    customization?.attributes ?? ATTRIBUTES_BY_TYPE[detail.type] ?? [];
  const sourcePath =
    customization?.source ??
    (detail.name === 'TabBar'
      ? 'packages/novamotion-ui/src/TabBar.tsx'
      : detail.name === 'AuthCard'
        ? 'packages/novamotion-ui/src/AuthCard.tsx'
        : detail.name === 'TravelSearch'
          ? 'components/TravelSearch.jsx'
          : detail.name === 'DeviceFrame'
            ? 'packages/novamotion-ui/src/DeviceFrame.tsx'
            : detail.type === 'calendar'
              ? 'packages/novamotion-ui/src/DateRangeCalendar.tsx'
              : detail.type === 'chart'
              ? 'packages/novamotion-ui/src/Charts.tsx'
              : detail.type === 'feedback'
                ? 'packages/novamotion-ui/src/Feedback.tsx'
                : detail.type === 'gallery'
                  ? 'packages/novamotion-ui/src/Galleries.tsx or DuoFlip.tsx'
                  : 'packages/novamotion-ui/src/index.tsx');
  const categoryName =
    detail.name === 'MonthCalendar'
      ? 'Calendar'
      : {
            button: 'Buttons',
            card: 'Cards',
            text: 'Text',
            background: 'Backgrounds',
            navigation: 'Navigation',
            calendar: 'Calendar',
            cursor: 'Cursor',
            image: 'Images',
            gallery: 'Galleries',
            loader: 'Loaders',
            form: 'Forms',
            search: 'Search',
            frame: 'Frames',
            chart: 'Charts',
            feedback: 'Feedback',
            scroll: 'Scroll',
          }[detail.type] ?? 'Components';
  const renderComponent = () =>
    detail.name === 'TravelSearch' ? (
      <Preview
        className="mx-auto"
        onSearch={(payload) =>
          setDetailNotice(`${payload.tab} search is ready.`)
        }
      />
    ) : detail.name === 'DeviceFrame' ? (
      <Preview device={activePreviewStyle}>
        <div className="space-y-4 p-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#71717A]">
              NovaMotion
            </p>
            <h2 className="mt-1 text-[16px] font-semibold text-[#18181B]">
              Your screen, your design
            </h2>
          </div>
          <label className="block text-[10px] font-medium text-[#52525B]">
            Edit the screen content
            <input
              defaultValue="Hello from my app"
              className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] bg-white px-2.5 py-2 text-[11px] text-[#18181B] outline-none focus:border-[#71717A]"
            />
          </label>
          <button
            type="button"
            className="w-full rounded-lg bg-[#18181B] px-3 py-2 text-[10px] font-semibold text-white"
          >
            Continue
          </button>
        </div>
      </Preview>
    ) : detail.name === 'BookingCard' ? (
      <Preview
        className="mx-auto w-full max-w-[400px]"
        onBook={({ date, time }) =>
          setDetailNotice(
            `Demo booking request: ${date.toLocaleDateString()} at ${time}.`,
          )
        }
        onAddToCalendar={() =>
          setDetailNotice('Connect onAddToCalendar to your calendar flow.')
        }
      />
    ) : detail.name === 'CourseCard' ? (
      <Preview
        className="mx-auto"
        onClick={() => setDetailNotice('Course card selected.')}
      />
    ) : detail.name === 'AuthCard' ? (
      <Preview
        logo={
          <Image
            src="/fab.svg"
            alt="NovaMotion logo"
            width={48}
            height={48}
          />
        }
      />
    ) : detail.name === 'Toast' ? (
      <ToastPlayground />
    ) : detail.name === 'SidebarNavigation' ? (
      <SidebarToastDemo />
    ) : detail.type === 'card' ? (
      <CardPreview componentName={detail.name} onAction={setDetailNotice} />
    ) : detail.type === 'gallery' ? (
      <Preview
        images={DUO_FLIP_IMAGES}
        {...(detail.name === 'DuoFlip' ? { aspect: 1.6 } : {})}
        className="mx-auto w-full max-w-[500px]"
      />
    ) : detail.name === 'Social' ? (
      <Preview
        className="mx-auto"
        onProviderClick={(provider) =>
          setDetailNotice(`${provider} sign-in selected.`)
        }
      />
    ) : detail.type === 'button' ? (
      <Preview
        disabled={disabled}
        className="mx-auto"
        onClick={() => setDetailNotice(`${detail.name} is working.`)}
      >
        {detail.name.replace(/Button$/, '')}
      </Preview>
    ) : detail.type === 'navigation' && detail.name === 'TabBar' ? (
      <Preview
        variant={previewStyle}
        className="mx-auto"
        onChange={(id) => setDetailNotice(`${id} tab selected.`)}
        onAction={() => setDetailNotice('Create action selected.')}
      />
    ) : detail.name === 'DateRangeCalendar' ? (
      <Preview
        className="mx-auto"
        numberOfMonths={2}
        onChange={({ checkIn, checkOut }) => {
          if (checkIn && checkOut) {
            const nights = Math.round(
              (checkOut.getTime() - checkIn.getTime()) / 86400000,
            );
            setDetailNotice(
              `${nights} ${nights === 1 ? 'night' : 'nights'} selected.`,
            );
          } else if (checkIn) {
            setDetailNotice(
              `Check-in set for ${checkIn.toLocaleDateString()}. Choose your check-out date.`,
            );
          }
        }}
      />
    ) : detail.name === 'MonthCalendar' ? (
      <Preview
        className="mx-auto"
        onChange={(date) =>
          setDetailNotice(`Selected ${date.toLocaleDateString()}.`)
        }
      />
    ) : (
      <Preview />
    );

  return (
    <main className="min-h-[calc(100vh-88px)] bg-[#FAFAFA] px-5 py-8 text-[#18181B] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/components"
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2.5 text-[12px] font-medium text-[#52525B] shadow-[0_3px_12px_rgba(0,0,0,0.025)] transition-all hover:border-black/[0.12] hover:text-[#18181B]"
          >
            <span aria-hidden="true" className="text-base leading-none">←</span>
            All components
          </Link>
          <button
            type="button"
            onClick={() => copyText(window.location.href, 'Component link copied.')}
            className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-2.5 text-[12px] font-medium text-[#52525B] shadow-[0_3px_12px_rgba(0,0,0,0.025)] transition-all hover:border-black/[0.12] hover:bg-[#F8F8F8] hover:text-[#18181B]"
          >
            <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16V4" />
              <path d="m7 9 5-5 5 5" />
              <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
            </svg>
            Share component
          </button>
        </div>

        <div className="mb-8 mt-9 flex flex-col gap-5 border-b border-black/[0.06] pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#52525B] shadow-[0_2px_8px_rgba(0,0,0,0.025)]">
              <span className="size-1.5 rounded-full bg-[#FFDD00]" />
              {categoryName} · NovaMotion UI
            </span>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#18181B] sm:text-5xl lg:text-[56px] lg:leading-[1.05]">
              {detail.name}
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-7 text-[#71717A] sm:text-[15px]">
              {detail.description}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-black/[0.06] bg-white px-3.5 py-3 shadow-[0_4px_18px_rgba(0,0,0,0.025)]">
            <span className="grid size-8 place-items-center rounded-xl bg-[#F4F4F5] text-[#52525B]">
              <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v3" />
                <path d="M18.4 5.6 16.3 7.7" />
                <path d="M21 12h-3" />
                <path d="M18.4 18.4 16.3 16.3" />
                <path d="M12 21v-3" />
                <path d="m5.6 18.4 2.1-2.1" />
                <path d="M3 12h3" />
                <path d="m5.6 5.6 2.1 2.1" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            <span className="text-[11px] font-medium text-[#71717A]">Live demo</span>
            <span className="size-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)] lg:gap-6">
          <section className="min-w-0 overflow-hidden rounded-[26px] border border-black/[0.06] bg-white shadow-[0_12px_42px_rgba(0,0,0,0.045)] lg:sticky lg:top-6 lg:self-start">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.055] px-4 py-4 sm:px-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#A1A1AA]">
                  Playground
                </p>
                <h2 className="mt-1 text-[15px] font-semibold tracking-tight">
                  Try it out
                </h2>
              </div>
              <button
                type="button"
                aria-label={`Restart ${detail.name} preview`}
                title="Restart preview"
                onClick={() => {
                  setPreviewRevision((revision) => revision + 1);
                  setDetailNotice('Preview restarted.');
                }}
                className="grid size-9 place-items-center rounded-xl border border-black/[0.07] bg-white text-[#52525B] transition-colors hover:bg-[#F4F4F5] hover:text-[#18181B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18181B]"
              >
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              {detail.type === 'button' && (
                <label className="flex cursor-pointer items-center gap-2 text-[12px] text-[#52525B]">
                  <input
                    type="checkbox"
                    checked={disabled}
                    onChange={(event) => {
                      setDisabled(event.target.checked);
                      setDetailNotice(
                        event.target.checked
                          ? 'The preview button is disabled.'
                          : 'The preview button is enabled.',
                      );
                    }}
                    className="accent-[#18181B]"
                  />
                  Disabled
                </label>
              )}
              {detail.styleOptions?.length > 1 && (
                <label className="flex items-center gap-2 text-[12px] font-medium text-[#52525B]">
                  <span>{detail.name === 'DeviceFrame' ? 'Device' : 'Style'}</span>
                  <select
                    aria-label={`${detail.name} preview style`}
                    value={activePreviewStyle}
                    onChange={(event) => {
                      setPreviewStyle(event.target.value);
                      setDetailNotice(`${event.target.value} preview selected.`);
                    }}
                    className="rounded-lg border border-[#E4E4E7] bg-white px-2.5 py-2 text-[12px] text-[#18181B] outline-none focus:border-[#A1A1AA]"
                  >
                    {detail.styleOptions.map((option) => (
                      <option key={option} value={option}>
                        {option === 'ios'
                          ? 'iOS'
                          : option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {detail.devicePreview && (
                <div
                  role="group"
                  aria-label="Preview device size"
                  className="flex items-center gap-1 rounded-full bg-[#F4F4F5] p-1"
                >
                  {Object.entries(DEVICE_PRESETS).map(([key, preset]) => {
                    const Icon = preset.Icon;
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-label={`${preset.label} preview (${preset.width}px)`}
                        aria-pressed={device === key}
                        title={`${preset.label} preview`}
                        onClick={() => {
                          setDevice(key);
                          setDetailNotice(`${preset.label} preview selected.`);
                        }}
                        className={`grid size-9 place-items-center rounded-full transition-colors ${
                          device === key
                            ? 'bg-[#18181B] text-white shadow-sm'
                            : 'text-[#71717A] hover:bg-white hover:text-[#18181B]'
                        }`}
                      >
                        <Icon aria-hidden="true" size={17} strokeWidth={2} />
                        <span className="sr-only">{preset.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <GsapInteractive key={previewRevision} className="w-full">
              {detail.devicePreview ? (
                <ResponsivePreview device={device}>
                  {renderComponent()}
                </ResponsivePreview>
              ) : (
                <div className="flex min-h-[360px] w-full items-center justify-center bg-[#F8F8F8] p-5 sm:p-8">
                  {renderComponent()}
                </div>
              )}
            </GsapInteractive>
            <div className="flex items-center justify-between gap-4 border-t border-black/[0.055] px-5 py-4">
              <p className="text-[11px] font-medium text-[#71717A]">
                Interactive preview
              </p>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#A1A1AA]">
                <span className="size-1.5 rounded-full bg-[#FFDD00]" />
                Click, hover or type to explore
              </span>
            </div>
          </section>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:overscroll-contain lg:pr-1">
            <section className="rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.035)] sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#A1A1AA]">
                Customization guide
              </p>
              <h2 className="mt-1 text-[15px] font-semibold">
                Change content and styles
              </h2>
              <p className="mt-3 text-[12px] leading-relaxed text-[#71717A]">
                Set the component props to change its content and behavior.
                Use <code className="rounded bg-[#F4F4F5] px-1">className</code>{' '}
                for supported Tailwind overrides. To change internal colors,
                spacing, or markup, edit the indicated source component and its
                utility classes.
              </p>
              <h3 className="mt-5 text-[12px] font-semibold text-[#18181B]">
                Common attributes
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#71717A]">
                Component-specific inputs are shown in the usage example.
              </p>
              <dl className="mt-2 space-y-3">
                {attributes.map(([name, description]) => (
                  <div key={name}>
                    <dt className="font-mono text-[11px] font-semibold text-[#52525B]">
                      {name}
                    </dt>
                    <dd className="mt-0.5 text-[11px] leading-relaxed text-[#71717A]">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-5 text-[12px] font-semibold text-[#18181B]">
                CSS targets
              </h3>
              <ul className="mt-2 space-y-2">
                {(customization?.selectors ?? [
                  [`${detail.name} root element`, `Search for the ${detail.name} export in ${sourcePath} and change its root className.`],
                  ['Nested elements', 'Edit the relevant child tag className values in the same source component.'],
                ]).map(([target, description]) => (
                  <li key={target} className="text-[11px] leading-relaxed text-[#71717A]">
                    <code className="font-mono font-semibold text-[#52525B]">{target}</code>
                    <span> — {description}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-[#F4F4F5] pt-3 text-[11px] text-[#71717A]">
                Source: <code className="break-all font-mono">{sourcePath}</code>
              </p>
            </section>

            <section className="rounded-[24px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.035)] sm:p-6">
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

            {notice && (
              <p role="status" className="px-1 text-[12px] text-[#52525B]">
                {notice}
              </p>
            )}
            <section className="overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.035)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4F4F5] px-4 py-4 sm:px-5">
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
                  onClick={() =>
                    copyText(sourceCode, `${language} source copied.`, true)
                  }
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
                    onClick={() => {
                      setLanguage(option);
                      setDetailNotice(
                        `Usage example switched to ${option}.`,
                      );
                    }}
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

              <pre className="max-h-[420px] min-h-[230px] overflow-auto bg-[#18181B] p-4 text-[11px] leading-[1.7] text-[#E4E4E7] sm:p-5 sm:text-[12px]">
                <code>{sourceCode}</code>
              </pre>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

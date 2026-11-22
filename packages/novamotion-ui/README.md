# novamotion-ui

Animated React UI components styled with Tailwind CSS.

## Install

```bash
npm install novamotion-ui
```

The package is not published yet. After publishing it, install it with the command above.

## Tailwind setup

Tailwind CSS is a peer requirement. With Tailwind CSS v4, include the package as a source in your CSS:

```css
@source "../node_modules/novamotion-ui";
```

With Tailwind CSS v3, add the package to the `content` paths in `tailwind.config.js`:

```js
content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/novamotion-ui/dist/**/*.{js,mjs}"]
```

## Usage

```jsx
import { AnimatedButton } from "novamotion-ui";

export function Example() {
  return <AnimatedButton onClick={() => alert("Hello!")}>Click me</AnimatedButton>;
}
```

Available buttons: `AnimatedButton`, `MagneticButton`, `GradientButton`, `GlowButton`, `ShimmerButton`, `RippleButton`, `LiquidGlassButton`, and `Social`.
`Social` renders Google, GitHub, and Apple sign-in buttons. Use `onProviderClick` to connect your provider flow; rejected promises are displayed as errors.

Available cards: `SpotlightCard`, `TiltCard`, `GlassCard`, `FlipCard`, `GradientCard`, `CourseCard`, and `BookingCard`.
Layouts: `BentoDemo` is a responsive animated feature grid; compose your own with `BentoGrid` and `BentoCard`. Each BentoCard icon animates its SVG stroke with GSAP DrawSVG on hover and keyboard focus.
`CourseCard` is a responsive course tile with customizable badge, lesson count, title, description, click handler, and root `className`.
`BookingCard` lets users choose an available date and time, then calls `onBook` with `{ date, time }`. Rejected promises are displayed as booking errors. Use `onAddToCalendar` to connect the confirmation action to your calendar flow.
`GsapInteractive` adds GSAP-powered hover, press, and keyboard-focus feedback to a wrapper and respects the user's reduced-motion preference.
Buttons accept standard button attributes. Cards accept standard div attributes; `FlipCard` accepts `children` and an optional `backFace`. `ProUpgradeCard` provides a customizable badge, title, description, feature list, and upgrade/compare callbacks.

Text: `TypewriterText`, `TextReveal`, `GradientText`, `SplitText`, `ScrambleText`.
Backgrounds: `AuroraBackground`, `ParticleBackground`, `GridBackground`, `SpotlightBackground`, `MeteorsBackground`.
Navigation: `FloatingNavbar`, `DockNavigation`, `SidebarNavigation`, `DynamicIsland`, `BubbleNavigation`.
`DynamicIsland` cycles through animated music, call, and delivery activities by default. Set `activity` to control the visible state, or set `autoCycle={false}` to keep the interactive activity selector manual.
Calendar: `MonthCalendar` and `DateRangeCalendar`. The range picker supports controlled or default check-in/check-out dates, min/max and disabled dates, one- or two-month layouts, and an `onChange` callback that reports the selected stay.
`MonthCalendar` supports controlled or default date selection, locale and week-start options, event markers, and keyboard navigation. Use `onChange` to receive the selected `Date`.
Cursor: `CustomCursor`, `CursorTrail`, `CursorFollower`.
Images: `ImageReveal`, `ParallaxImage`, `ImageCompare`.
Loaders: `MorphingLoader`, `CircularLoader`, `ProgressBar`, `SkeletonLoader`, `CanvasShadowLoader`.
Search: `SearchBar` and `AutocompleteSearch`.
`SearchBar` supports controlled or default input values, clear and submit actions, and an `onSearch` callback. `AutocompleteSearch` filters typed options and supports keyboard navigation and `onSelect`.
Forms: `AuthCard`, `FloatingInput`, `AnimatedInput`, `ToggleSwitch`, `OTPInput`.
Charts: `BarChart`, `LineChart`, and `DonutChart` accept optional `{ label, value }` data points and a title.
Feedback: `RatingInput` supports controlled or default ratings; `Toast` provides animated, dismissible success, info, warning, error, and loading styles, and can be reopened after dismissal. `ToastStack` adds a draggable, expandable notification stack with optional timers, actions, sample triggers, and an imperative `push`/`dismiss`/`clear` ref API.
Frames: `DeviceFrame` renders custom children inside iOS, Android, or watch device frames. Pass your app screen as `children` and select the frame with the `device` prop.
Scroll: `ScrollReveal`, `ScrollParallax`, `StickyScroll`.
Gallery: `DuoFlip`, `MasonryGallery`, `ThumbnailCarousel`.
`TabBar` provides pill, labels, and action variants; it accepts typed tab items, controlled or default selection, and selection/action callbacks.
`AuthCard` supports sign-in and sign-up modes. Connect it to your backend with `onSubmit`, which receives `{ mode, email, password, name? }`; rejected promises are displayed as form errors. `onSocial` and `onForgotPassword` let you connect OAuth and recovery endpoints.

```jsx
import { AuthCard } from "novamotion-ui";

async function handleAuth(details) {
  const response = await fetch(`/api/auth/${details.mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(details),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message ?? "Authentication failed");
  return result;
}

export function LoginPage() {
  return <AuthCard onSubmit={handleAuth} />;
}
```

`DuoFlip` accepts an `images` array of `{ src, alt, label? }` objects and supports autoplay, drag navigation, keyboard controls, and reduced-motion preferences.
`MasonryGallery` opens selected images in a lightbox, and `ThumbnailCarousel` supports arrow and thumbnail navigation. Both accept the same `images` array shape.

```jsx
import { DeviceFrame } from "novamotion-ui";

export function DevicePreview() {
  return (
    <DeviceFrame device="android">
      <main className="space-y-3 p-4">
        <h1>My app screen</h1>
        <p>Put any React content here.</p>
      </main>
    </DeviceFrame>
  );
}
```

## Build

Run `npm run build` in the package directory to emit JavaScript and TypeScript declarations in `dist/`.

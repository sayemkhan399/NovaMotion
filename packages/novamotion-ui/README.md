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

Available buttons: `AnimatedButton`, `MagneticButton`, `GradientButton`, `GlowButton`, `ShimmerButton`, `RippleButton`, and `LiquidGlassButton`.

Available cards: `SpotlightCard`, `TiltCard`, `GlassCard`, `FlipCard`, and `GradientCard`.
Buttons accept standard button attributes. Cards accept standard div attributes; `FlipCard` accepts `children` and an optional `backFace`.

Text: `TypewriterText`, `TextReveal`, `GradientText`, `SplitText`, `ScrambleText`.
Backgrounds: `AuroraBackground`, `ParticleBackground`, `GridBackground`, `SpotlightBackground`, `MeteorsBackground`.
Navigation: `FloatingNavbar`, `DockNavigation`, `SidebarNavigation`, `BubbleNavigation`.
Cursor: `CustomCursor`, `CursorTrail`, `CursorFollower`.
Images: `ImageReveal`, `ParallaxImage`, `ImageCompare`.
Loaders: `MorphingLoader`, `CircularLoader`, `ProgressBar`.
Forms: `FloatingInput`, `AnimatedInput`, `ToggleSwitch`, `OTPInput`.
Scroll: `ScrollReveal`, `ScrollParallax`, `StickyScroll`.
Gallery: `DuoFlip`, `MasonryGallery`, `ThumbnailCarousel`.

`DuoFlip` accepts an `images` array of `{ src, alt, label? }` objects and supports autoplay, drag navigation, keyboard controls, and reduced-motion preferences.
`MasonryGallery` opens selected images in a lightbox, and `ThumbnailCarousel` supports arrow and thumbnail navigation. Both accept the same `images` array shape.

## Build

Run `npm run build` in the package directory to emit JavaScript and TypeScript declarations in `dist/`.

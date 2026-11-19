export const COMPONENT_SLUGS = [
  'animated-button',
  'magnetic-button',
  'gradient-button',
  'glow-button',
  'shimmer-button',
  'ripple-button',
  'liquid-glass-button',
  'duo-flip',
  'masonry-gallery',
  'thumbnail-carousel',
  'spotlight-card',
  'tilt-card',
  'glass-card',
  'flip-card',
  'gradient-card',
  'typewriter-text',
  'text-reveal',
  'gradient-text',
  'split-text',
  'scramble-text',
  'aurora-background',
  'particle-background',
  'grid-background',
  'spotlight-background',
  'meteors-background',
  'floating-navbar',
  'dock-navigation',
  'sidebar-navigation',
  'bubble-navigation',
  'tab-bar',
  'custom-cursor',
  'cursor-trail',
  'cursor-follower',
  'image-reveal',
  'parallax-image',
  'image-compare',
  'morphing-loader',
  'circular-loader',
  'progress-bar',
  'floating-input',
  'animated-input',
  'toggle-switch',
  'otp-input',
  'scroll-reveal',
  'scroll-parallax',
  'sticky-scroll',
];

const categoryForSlug = (slug) => {
  if (slug.endsWith('-button')) return 'Buttons';
  if (slug.endsWith('-card')) return 'Cards';
  if (slug.endsWith('-text')) return 'Text';
  if (slug.endsWith('-background')) return 'Backgrounds';
  if (slug.includes('navigation') || slug === 'tab-bar') return 'Navigation';
  if (slug.startsWith('floating-nav') || slug.startsWith('dock-') || slug.startsWith('bubble-') || slug.startsWith('sidebar-')) return 'Navigation';
  if (slug.startsWith('custom-cursor') || slug.startsWith('cursor-')) return 'Cursor';
  if (slug.includes('gallery') || slug === 'duo-flip' || slug === 'thumbnail-carousel') return 'Galleries';
  if (slug.includes('image')) return 'Images';
  if (slug.includes('loader') || slug === 'progress-bar') return 'Loaders';
  if (slug.includes('input') || slug === 'toggle-switch' || slug === 'otp-input') return 'Forms';
  if (slug.startsWith('scroll-') || slug === 'sticky-scroll') return 'Scroll';
  return 'Components';
};

const componentNameFromSlug = (slug) =>
  slug
    .split('-')
    .map((word) => (word.length <= 3 ? word.toUpperCase() : word[0].toUpperCase() + word.slice(1)))
    .join('');

export const SEARCH_ITEMS = [
  {
    title: 'About NovaMotion',
    href: '/',
    category: 'Page',
    keywords: 'home about company',
  },
  {
    title: 'Components',
    href: '/components',
    category: 'Page',
    keywords: 'browse library ui',
  },
  {
    title: 'MCP',
    href: '/mcp',
    category: 'Page',
    keywords: 'model context protocol',
  },
  ...COMPONENT_SLUGS.map((slug) => ({
    title: componentNameFromSlug(slug),
    href: `/components/${slug}`,
    category: categoryForSlug(slug),
    keywords: slug.replaceAll('-', ' '),
  })),
];

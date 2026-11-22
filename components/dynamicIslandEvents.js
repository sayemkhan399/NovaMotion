export const DYNAMIC_ISLAND_EVENT = 'novamotion:dynamic-island-notification';

export function notifyDynamicIsland({
  title,
  description,
  variant = 'info',
}) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent(DYNAMIC_ISLAND_EVENT, {
      detail: { title, description, variant },
    }),
  );
}

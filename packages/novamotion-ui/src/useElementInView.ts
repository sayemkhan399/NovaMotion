import { useEffect, useState, type RefObject } from "react";

interface InViewOptions {
  amount?: number;
  once?: boolean;
}

export function useElementInView(
  ref: RefObject<Element | null>,
  { amount = 0, once = false }: InViewOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const view = element?.ownerDocument.defaultView;
    const Observer = view?.IntersectionObserver;

    if (!element || !Observer) {
      setInView(true);
      return;
    }

    const observer = new Observer(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: amount },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [amount, once, ref]);

  return inView;
}

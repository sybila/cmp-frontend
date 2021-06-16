import { RefObject, useEffect } from "react";

const HANDLERS_PROPERTY = "__click-outside";
const IS_TOUCH =
  typeof window !== "undefined" &&
  ("ontouchstart" in window ||
    (typeof navigator !== "undefined" && navigator.msMaxTouchPoints > 0));

const EVENTS = IS_TOUCH ? ["touchstart"] : ["click"];

const clickHandler = (
  e: MouseEvent | TouchEvent,
  el: Element,
  callback: Function
) => {
  if (el.contains(e.target as any)) return;
  callback();
};

const unbind = (el: Element) => {
  const handlers = (el as any)[HANDLERS_PROPERTY] || [];

  handlers.forEach(({ event, handler }: any) =>
    document.documentElement.removeEventListener(event, handler, false)
  );

  delete (el as any)[HANDLERS_PROPERTY];
};

const useClickOutside = (ref: RefObject<any>, handler: () => void) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element[HANDLERS_PROPERTY] = EVENTS.map((name) => ({
      event: name,
      handler: (e: MouseEvent | TouchEvent) =>
        clickHandler(e, element, handler),
    }));

    element[HANDLERS_PROPERTY].forEach(({ event, handler }: any) => {
      setTimeout(() => {
        if (!element[HANDLERS_PROPERTY]) return;
        document.documentElement.addEventListener(event, handler, false);
      }, 0);
    });

    return () => unbind(element);
  }, [ref, handler]);
};

export default useClickOutside;

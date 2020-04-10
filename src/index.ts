import { RefObject, useRef, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

export const DEFAULT_IGNORE_CLASS = 'ignore-onclickoutside';

const hasIgnoreClass = (e: any, ignoreClass: string): boolean => {
  let el = e.target;

  while (el) {
    if (el.classList.contains(ignoreClass)) return true;
    el = el.parentElement;
  }

  return false;
};

const clickedOnScrollbar = (e: MouseEvent): boolean =>
  document.documentElement.clientWidth <= e.clientX ||
  document.documentElement.clientHeight <= e.clientY;

const getEventOptions = (type: string): { passive: boolean } | boolean =>
  type.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

type Ref = RefObject<HTMLElement>;
export interface Callback<T extends Event = Event> {
  (event?: T): void;
}
export interface Options {
  disabled?: boolean;
  eventTypes?: string[];
  excludeScrollbar?: boolean;
  ignoreClass?: string;
}

const useOnclickOutside = (
  ref: Ref | Ref[],
  callback: Callback,
  {
    disabled = false,
    eventTypes = ['mousedown', 'touchstart'],
    excludeScrollbar = false,
    ignoreClass = DEFAULT_IGNORE_CLASS,
  }: Options = {}
): void => {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref) return;

    const handler = (e: any): void => {
      if (hasIgnoreClass(e, ignoreClass)) return;

      const refs = Array.isArray(ref) ? ref : [ref];
      const els: HTMLElement[] = [];
      refs.forEach(({ current }) => {
        if (current) els.push(current);
      });

      if (excludeScrollbar && clickedOnScrollbar(e)) return;
      if (!els.length || !els.every((el) => !el.contains(e.target))) return;

      callbackRef.current(e);
    };

    const removeEventListener = (): void => {
      eventTypes.forEach((type) => {
        // @ts-ignore
        document.removeEventListener(type, handler, getEventOptions(type));
      });
    };

    if (disabled) {
      removeEventListener();
      return;
    }

    eventTypes.forEach((type) => {
      document.addEventListener(type, handler, getEventOptions(type));
    });

    // eslint-disable-next-line consistent-return
    return (): void => {
      removeEventListener();
    };
  }, [ref, ignoreClass, excludeScrollbar, disabled, eventTypes]);
};

export default useOnclickOutside;

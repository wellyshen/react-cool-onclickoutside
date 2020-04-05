import { RefObject, useRef, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

type Ref = RefObject<HTMLElement>;
export interface Callback<T extends Event = Event> {
  (event?: T): void;
}
export interface Options {
  disabled?: boolean;
  eventTypes?: string[];
  excludeScrollbar?: boolean;
}

const clickedOnScrollbar = (e: MouseEvent): boolean =>
  document.documentElement.clientWidth <= e.clientX ||
  document.documentElement.clientHeight <= e.clientY;

const getEventOptions = (type: string): { passive: boolean } | boolean =>
  type.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

const useOnclickOutside = (
  ref: Ref | Ref[],
  callback: Callback,
  {
    disabled = false,
    eventTypes = ['mousedown', 'touchstart'],
    excludeScrollbar = false,
  }: Options = {}
): void => {
  const callbackRef = useRef<Callback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref) return;

    const handler = (e: any): void => {
      const refs = Array.isArray(ref) ? ref : [ref];
      const els: HTMLElement[] = [];
      refs.forEach(({ current }) => {
        if (current) els.push(current);
      });

      if (!els.length) return;
      if (excludeScrollbar && clickedOnScrollbar(e)) return;
      if (!els.every((el) => !el.contains(e.target))) return;

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
  }, [ref, excludeScrollbar, disabled, eventTypes]);
};

export default useOnclickOutside;

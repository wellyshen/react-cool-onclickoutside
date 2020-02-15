/* eslint-disable react-hooks/rules-of-hooks */

import { useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

export interface Callback {
  (event?: MouseEvent | TouchEvent): void;
}
export interface Options {
  disabled?: boolean;
  eventTypes?: string[];
  excludeScrollbar?: boolean;
}
interface SetRef {
  (el: HTMLElement | null): void;
}

const clickedOnScrollbar = (e: MouseEvent): boolean =>
  document.documentElement.clientWidth <= e.clientX ||
  document.documentElement.clientHeight <= e.clientY;

const getEventOptions = (type: string): { passive: boolean } | boolean =>
  type.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

const useOnclickOutside = (
  callback: Callback,
  {
    disabled = false,
    eventTypes = ['mousedown', 'touchstart'],
    excludeScrollbar = false
  }: Options = {}
): SetRef => {
  if (typeof document === 'undefined' || !document.createElement) return null;

  const refs = useRef([]);

  const setRef: SetRef = useCallback(el => {
    if (el) refs.current.push(el);
  }, []);

  const handler = useCallback(
    e => {
      const { current } = refs;

      if (!current.length || !callback) return;
      if (excludeScrollbar && clickedOnScrollbar(e)) return;
      if (!current.every(ref => !ref.contains(e.target))) return;

      callback(e);
    },
    [excludeScrollbar, callback]
  );

  useEffect(() => {
    if (!callback) return;

    const removeEventListener = (): void => {
      eventTypes.forEach(type => {
        // @ts-ignore
        document.removeEventListener(type, handler, getEventOptions(type));
      });
    };

    if (disabled) {
      removeEventListener();
      return;
    }

    eventTypes.forEach(type => {
      document.addEventListener(type, handler, getEventOptions(type));
    });

    // eslint-disable-next-line consistent-return
    return (): void => {
      removeEventListener();
    };
  }, [callback, disabled, eventTypes, handler]);

  return setRef;
};

export default useOnclickOutside;

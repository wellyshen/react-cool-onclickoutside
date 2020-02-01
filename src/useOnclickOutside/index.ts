/* eslint-disable react-hooks/rules-of-hooks */

import { useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

export interface Callback {
  (event?: MouseEvent | TouchEvent): void;
}
export interface Options {
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
    [refs, excludeScrollbar, callback]
  );

  useEffect(() => {
    if (!callback) return null;

    eventTypes.forEach(type => {
      document.addEventListener(type, handler, getEventOptions(type));
    });

    return (): void => {
      eventTypes.forEach(type => {
        // @ts-ignore
        document.removeEventListener(type, handler, getEventOptions(type));
      });
    };
  }, [callback, eventTypes, handler]);

  return setRef;
};

export default useOnclickOutside;

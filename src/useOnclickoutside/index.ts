/* eslint-disable consistent-return */

import { useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

type SetRef = (el: HTMLElement | null) => void;

const getOpts = (type: string): { passive: boolean } | boolean =>
  type.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

export default (
  callback: (event?: MouseEvent | TouchEvent) => void,
  eventTypes: string[] = ['mousedown', 'touchstart']
): SetRef | void => {
  if (typeof document === 'undefined' || !document.createElement) return;

  const refs = useRef([]);

  const setRef: SetRef = useCallback((el: HTMLElement | null) => {
    if (el) refs.current.push(el);
  }, []);

  const listener = useCallback(
    e => {
      const { current } = refs;

      if (!current.length || !callback) return;
      // eslint-disable-next-line no-restricted-syntax
      for (const ref of current) if (ref.contains(e.target)) return;

      callback(e);
    },
    [refs, callback]
  );

  useEffect(() => {
    if (!callback) return;

    eventTypes.forEach(type => {
      document.addEventListener(type, listener, getOpts(type));
    });

    return (): void => {
      eventTypes.forEach(type => {
        // @ts-ignore
        document.removeEventListener(type, listener, getOpts(type));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, eventTypes]);

  return setRef;
};

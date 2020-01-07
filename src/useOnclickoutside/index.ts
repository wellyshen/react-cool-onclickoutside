/* eslint-disable consistent-return */

import { useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

type SetRef = (el: HTMLElement | null) => void;

const getOpts = (t: string): { passive: boolean } | boolean =>
  t.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

export default (
  cb: (event?: MouseEvent | TouchEvent) => void,
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

      if (!current.length || !cb) return;
      // eslint-disable-next-line no-restricted-syntax
      for (const ref of current) if (ref.contains(e.target)) return;

      cb(e);
    },
    [refs, cb]
  );

  useEffect(() => {
    if (!cb) return;

    eventTypes.forEach(t => {
      document.addEventListener(t, listener, getOpts(t));
    });

    return (): void => {
      eventTypes.forEach(t => {
        // @ts-ignore
        document.removeEventListener(t, listener, getOpts(t));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, eventTypes]);

  return setRef;
};

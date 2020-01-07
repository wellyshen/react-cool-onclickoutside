/* eslint-disable consistent-return */

import { RefObject, useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

const getOptions = (t: string): { passive: boolean } | boolean =>
  t.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

export default (
  cb: (event?: MouseEvent | TouchEvent) => void,
  eventTypes: string[] = ['mousedown', 'touchstart']
): RefObject<HTMLElement | null> | void => {
  if (typeof document === 'undefined' || !document.createElement) return;

  const ref = useRef();

  const listener = useCallback(
    e => {
      const { current } = ref;

      // @ts-ignore
      if (current && !current.contains(e.target) && cb) cb(e);
    },
    [ref, cb]
  );

  useEffect(() => {
    if (!cb) return;

    eventTypes.forEach(t => {
      document.addEventListener(t, listener, getOptions(t));
    });

    return (): void => {
      eventTypes.forEach(t => {
        // @ts-ignore
        document.removeEventListener(t, listener, getOptions(t));
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, eventTypes]);

  return ref;
};

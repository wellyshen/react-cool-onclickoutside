/* eslint-disable consistent-return */

import { RefObject, useRef, useCallback, useEffect } from 'react';

import canUsePassiveEvents from './canUsePassiveEvents';

const getOptions = (e: string): { passive: boolean } | boolean =>
  e.includes('touch') && canUsePassiveEvents() ? { passive: true } : false;

export default (
  cb: (event?: MouseEvent | TouchEvent) => void,
  events: string[] = ['mousedown', 'touchstart']
): RefObject<HTMLElement | null> | void => {
  if (typeof document === 'undefined' || !document.createElement) return;

  const ref = useRef();

  const handler = useCallback(
    e => {
      const { current } = ref;

      // @ts-ignore
      if (current && !current.contains(e.target) && cb) cb(e);
    },
    [ref, cb]
  );

  useEffect(() => {
    if (!cb) return;

    events.forEach(e => {
      document.addEventListener(e, handler, getOptions(e));
    });

    return (): void => {
      events.forEach(e => {
        document.removeEventListener(
          e,
          handler,
          getOptions(e) as EventListenerOptions
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cb, events]);

  return ref;
};

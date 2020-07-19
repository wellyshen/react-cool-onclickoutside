import { RefObject, useRef, useState, useEffect, useCallback } from "react";

import canUsePassiveEvents from "./canUsePassiveEvents";

export const DEFAULT_IGNORE_CLASS = "ignore-onclickoutside";

export interface Callback<T extends Event = Event> {
  (event: T): void;
}
type El = HTMLElement;
type Refs = RefObject<El>[];
export interface Options {
  refs?: Refs;
  disabled?: boolean;
  eventTypes?: string[];
  excludeScrollbar?: boolean;
  ignoreClass?: string;
}
interface Return {
  (element: El | null): void;
}

const hasIgnoreClass = (e: any, ignoreClass: string): boolean => {
  let el = e.target;

  while (el) {
    if (el.classList?.contains(ignoreClass)) return true;
    el = el.parentElement;
  }

  return false;
};

const clickedOnScrollbar = (e: MouseEvent): boolean =>
  document.documentElement.clientWidth <= e.clientX ||
  document.documentElement.clientHeight <= e.clientY;

const getEventOptions = (type: string): { passive: boolean } | boolean =>
  type.includes("touch") && canUsePassiveEvents() ? { passive: true } : false;

const useOnclickOutside = (
  callback: Callback,
  {
    refs: refsOpt,
    disabled = false,
    eventTypes = ["mousedown", "touchstart"],
    excludeScrollbar = false,
    ignoreClass = DEFAULT_IGNORE_CLASS,
  }: Options = {}
): Return => {
  const callbackRef = useRef<Callback>(callback);
  const [refsState, setRefsState] = useState<Refs>([]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const ref: Return = useCallback((el) => {
    setRefsState((prevState) => [...prevState, { current: el }]);
  }, []);

  useEffect(
    () => {
      if (!refsOpt?.length && !refsState.length) return;

      const listener = (e: any): void => {
        if (hasIgnoreClass(e, ignoreClass)) return;

        const refs = refsOpt || refsState;
        const els: El[] = [];
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
          document.removeEventListener(type, listener, getEventOptions(type));
        });
      };

      if (disabled) {
        removeEventListener();
        return;
      }

      eventTypes.forEach((type) => {
        document.addEventListener(type, listener, getEventOptions(type));
      });

      // eslint-disable-next-line consistent-return
      return (): void => {
        removeEventListener();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      refsState,
      ignoreClass,
      excludeScrollbar,
      disabled,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(eventTypes),
    ]
  );

  return ref;
};

export default useOnclickOutside;

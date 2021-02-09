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
  detectIFrame?: boolean;
}
interface Return {
  (element: El | null): void;
}

const hasIgnoreClass = (e: any, ignoreClass: string): boolean => {
  let el = e.target || e;

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
    detectIFrame = true,
  }: Options = {}
): Return => {
  const callbackRef = useRef(callback);
  const [refsState, setRefsState] = useState<Refs>([]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const ref: Return = useCallback(
    (el) => setRefsState((prevState) => [...prevState, { current: el }]),
    []
  );

  useEffect(
    () => {
      if (!refsOpt?.length && !refsState.length) return;

      const els: El[] = [];
      (refsOpt || refsState).forEach(
        ({ current }) => current && els.push(current)
      );

      const handler = (e: any) => {
        if (
          !hasIgnoreClass(e, ignoreClass) &&
          !(excludeScrollbar && clickedOnScrollbar(e)) &&
          els.every((el) => !el.contains(e.target))
        )
          callbackRef.current(e);
      };

      const blurHandler = (e: FocusEvent) =>
        // On firefox the iframe becomes document.activeElement in the next event loop
        setTimeout(() => {
          const { activeElement } = document;

          if (
            activeElement?.tagName === "IFRAME" &&
            !hasIgnoreClass(activeElement, ignoreClass) &&
            !els.includes(activeElement as HTMLIFrameElement)
          )
            callbackRef.current(e);
        }, 0);

      const removeEventListener = () => {
        eventTypes.forEach((type) =>
          // @ts-expect-error
          document.removeEventListener(type, handler, getEventOptions(type))
        );

        if (detectIFrame) window.removeEventListener("blur", blurHandler);
      };

      if (disabled) {
        removeEventListener();
        return;
      }

      eventTypes.forEach((type) =>
        document.addEventListener(type, handler, getEventOptions(type))
      );

      if (detectIFrame) window.addEventListener("blur", blurHandler);

      // eslint-disable-next-line consistent-return
      return () => removeEventListener();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      refsState,
      ignoreClass,
      excludeScrollbar,
      disabled,
      detectIFrame,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      JSON.stringify(eventTypes),
    ]
  );

  return ref;
};

export default useOnclickOutside;

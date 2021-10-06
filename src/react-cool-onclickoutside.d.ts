declare module "react-cool-onclickoutside" {
  import { RefObject } from "react";

  export interface Callback<T extends Event = Event> {
    (event: T): void;
  }

  export interface Options {
    refs?: RefObject<HTMLElement>[];
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
    ignoreClass?: string | string[];
    detectIFrame?: boolean;
  }

  export interface Return {
    (element: HTMLElement | null): void;
  }

  const useOnclickOutside: (callback: Callback, options?: Options) => Return;

  export default useOnclickOutside;
}

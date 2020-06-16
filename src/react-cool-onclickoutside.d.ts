declare module "react-cool-onclickoutside" {
  import { RefObject } from "react";

  export interface Callback<T extends Event = Event> {
    (event: T): void;
  }

  interface Options {
    refs?: RefObject<HTMLElement>[];
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
    ignoreClass?: string;
  }

  interface Return {
    (element: HTMLElement): void;
  }

  const useOnclickOutside: (callback: Callback, options?: Options) => Return;

  export default useOnclickOutside;
}

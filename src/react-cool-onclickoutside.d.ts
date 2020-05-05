declare module "react-cool-onclickoutside" {
  import { RefObject } from "react";

  type Ref = RefObject<HTMLElement>;

  export interface Callback<T extends Event = Event> {
    (event?: T): void;
  }

  interface Options {
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
    ignoreClass?: string;
  }

  const useOnclickOutside: (
    ref: Ref | Ref[],
    callback: Callback,
    options?: Options
  ) => void;

  export default useOnclickOutside;
}

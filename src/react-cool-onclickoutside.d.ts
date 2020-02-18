declare module 'react-cool-onclickoutside' {
  import { RefObject } from 'react';

  type Ref = RefObject<HTMLElement>;

  type Callback = (event?: Event) => void;

  interface Options {
    disabled?: boolean;
    eventTypes?: string[];
    excludeScrollbar?: boolean;
  }

  const useOnclickOutside: (
    ref: Ref | Ref[],
    callback: Callback,
    options?: Options
  ) => void;

  export default useOnclickOutside;
}

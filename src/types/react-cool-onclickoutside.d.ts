declare module 'react-cool-onclickoutside' {
  interface Callback {
    (event?: MouseEvent | TouchEvent): void;
  }

  interface Options {
    eventTypes?: string[];
    excludeScrollbar?: boolean;
  }

  interface SetRef {
    (el: HTMLElement | null): void;
  }

  const useOnclickoutside: (callback: Callback, options?: Options) => SetRef;

  export default useOnclickoutside;
}

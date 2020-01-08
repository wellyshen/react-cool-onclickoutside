declare module 'react-cool-onclickoutside' {
  export interface Callback {
    (event?: MouseEvent | TouchEvent): void;
  }

  export interface Options {
    eventTypes?: string[];
    excludeScrollbar?: boolean;
  }

  export interface SetRef {
    (el: HTMLElement | null): void;
  }
}

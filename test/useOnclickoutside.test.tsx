import React, { SFC } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useOnclickoutside, {
  Callback,
  EventTypes,
  ExcludeScrollbar
} from '../src/useOnclickoutside';

interface Props {
  callback: Callback;
  eventTypes?: EventTypes;
  excludeScrollbar?: ExcludeScrollbar;
}

const Compo: SFC<Props> = ({
  callback,
  eventTypes,
  excludeScrollbar
}: Props) => {
  const registerRef = useOnclickoutside(callback, {
    eventTypes,
    excludeScrollbar
  });

  return (
    <>
      <div data-testid="ref-1" ref={registerRef} />
      <div data-testid="ref-2" ref={registerRef} />
    </>
  );
};

describe('useOnclickoutside', () => {
  interface Params {
    eventTypes?: EventTypes;
    excludeScrollbar?: ExcludeScrollbar;
  }
  interface Return {
    cb: Function;
    getByTestId: Function;
  }

  const renderHelper = ({
    eventTypes = ['mousedown', 'touchstart'],
    excludeScrollbar = false
  }: Params = {}): Return => {
    const cb = jest.fn();
    const { getByTestId } = render(
      <Compo
        callback={cb}
        eventTypes={eventTypes}
        excludeScrollbar={excludeScrollbar}
      />
    );

    return { cb, getByTestId };
  };

  it('should not trigger callback when clicks (touches) inside of the target refs', () => {
    Object.defineProperties(window.HTMLHtmlElement.prototype, {
      clientWidth: { value: 100 },
      clientHeight: { value: 100 }
    });

    const { cb, getByTestId } = renderHelper();
    const ref1 = getByTestId('ref-1');
    const ref2 = getByTestId('ref-2');

    fireEvent.mouseDown(ref1);
    fireEvent.touchStart(ref1);

    expect(cb).not.toBeCalled();

    fireEvent.mouseDown(ref2);
    fireEvent.touchStart(ref2);

    expect(cb).not.toBeCalled();
  });

  it('should trigger callback when clicks outside (touches) of the target refs', () => {
    const { cb } = renderHelper();

    fireEvent.mouseDown(document);
    fireEvent.touchStart(document);

    expect(cb).toBeCalledTimes(2);
  });

  it('should trigger callback by the assign event type', () => {
    const { cb } = renderHelper({ eventTypes: ['mouseup'] });

    fireEvent.mouseDown(document);

    expect(cb).not.toBeCalled();

    fireEvent.mouseUp(document);

    expect(cb).toBeCalled();
  });

  it('should not trigger callback when clicks inside of the scrollbar', () => {
    const { cb } = renderHelper({ excludeScrollbar: true });

    fireEvent.mouseDown(document, { clientX: 110 });
    fireEvent.mouseDown(document, { clientY: 110 });

    expect(cb).not.toBeCalled();
  });

  it('should trigger callback when clicks outside of the scrollbar', () => {
    const { cb } = renderHelper({ excludeScrollbar: true });

    fireEvent.mouseDown(document, { clientX: 90 });
    fireEvent.mouseDown(document, { clientY: 90 });

    expect(cb).toBeCalledTimes(2);
  });

  it('should return null from the beginning in ssr', () => {
    document.createElement = null;

    const { result } = renderHook(() => useOnclickoutside(() => null));

    expect(result.current).toBeNull();
  });
});

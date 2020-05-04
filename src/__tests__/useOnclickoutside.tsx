import React, { FC, useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import useOnclickOutside, { DEFAULT_IGNORE_CLASS, Callback, Options } from '..';

interface Props extends Options {
  className: string;
  callback: Callback;
}

const Compo: FC<Props> = ({ className, callback, ...options }: Props) => {
  const ref1 = useRef<HTMLDivElement>();
  const ref2 = useRef<HTMLDivElement>();

  useOnclickOutside([ref1, ref2], callback, options);

  return (
    <>
      <div data-testid="ref-1" ref={ref1} />
      <div data-testid="ref-2" ref={ref2} />
      <div data-testid="out-1" />
      <div className={className || DEFAULT_IGNORE_CLASS} data-testid="out-2">
        <div data-testid="out-3" />
      </div>
    </>
  );
};

describe('useOnclickOutside', () => {
  Object.defineProperties(window.HTMLHtmlElement.prototype, {
    clientWidth: { value: 100 },
    clientHeight: { value: 100 },
  });

  interface Args extends Options {
    className?: string;
  }
  interface Return {
    cb: Function;
    getByTestId: Function;
  }

  const renderHelper = ({
    className,
    disabled = false,
    eventTypes = ['mousedown', 'touchstart'],
    excludeScrollbar = false,
  }: Args = {}): Return => {
    const cb = jest.fn();
    const { getByTestId } = render(
      <Compo
        className={className}
        callback={cb}
        disabled={disabled}
        eventTypes={eventTypes}
        excludeScrollbar={excludeScrollbar}
      />
    );

    return { cb, getByTestId };
  };

  it('should not trigger callback when clicks (touches) inside of the target refs', () => {
    const { cb, getByTestId } = renderHelper();
    const ref1 = getByTestId('ref-1');
    const ref2 = getByTestId('ref-2');

    fireEvent.mouseDown(ref1);
    fireEvent.touchStart(ref1);

    expect(cb).not.toHaveBeenCalled();

    fireEvent.mouseDown(ref2);
    fireEvent.touchStart(ref2);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should not trigger callback when clicks an element with default ignore class', () => {
    const { cb, getByTestId } = renderHelper();
    const out2 = getByTestId('out-2');
    const out3 = getByTestId('out-2');

    fireEvent.mouseDown(out2);
    fireEvent.mouseDown(out3);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should not trigger callback when clicks an element with specified ignore class', () => {
    const { cb, getByTestId } = renderHelper({
      ignoreClass: 'my-ignore-class',
    });
    const out2 = getByTestId('out-2');
    const out3 = getByTestId('out-2');

    fireEvent.mouseDown(out2);
    fireEvent.mouseDown(out3);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should trigger callback when clicks outside (touches) of the target refs', () => {
    const { cb, getByTestId } = renderHelper();
    const out = getByTestId('out-1');

    fireEvent.mouseDown(out);
    fireEvent.touchStart(out);

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('should trigger callback by the assign event type', () => {
    const { cb, getByTestId } = renderHelper({ eventTypes: ['mouseup'] });
    const out = getByTestId('out-1');

    fireEvent.mouseDown(out);

    expect(cb).not.toHaveBeenCalled();

    fireEvent.mouseUp(out);

    expect(cb).toHaveBeenCalled();
  });

  it('should not trigger callback when event listener is disabled', () => {
    const { cb, getByTestId } = renderHelper({ disabled: true });
    const out = getByTestId('out-1');

    fireEvent.mouseDown(out);
    fireEvent.touchStart(out);

    expect(cb).not.toHaveBeenCalled();
  });

  it('should not trigger callback when clicks inside of the scrollbar', () => {
    const { cb, getByTestId } = renderHelper({ excludeScrollbar: true });
    const out = getByTestId('out-1');

    fireEvent.mouseDown(out, { clientX: 110 });
    fireEvent.mouseDown(out, { clientY: 110 });

    expect(cb).not.toHaveBeenCalled();
  });

  it('should trigger callback when clicks outside of the scrollbar', () => {
    const { cb, getByTestId } = renderHelper({ excludeScrollbar: true });
    const out = getByTestId('out-1');

    fireEvent.mouseDown(out, { clientX: 90 });
    fireEvent.mouseDown(out, { clientY: 90 });

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it('should return null from the beginning in ssr', () => {
    document.createElement = null;

    const { result } = renderHook(() => useOnclickOutside(null, () => null));

    expect(result.current).toBeUndefined();
  });
});

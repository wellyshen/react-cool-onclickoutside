import React, { SFC } from 'react';
import { render, fireEvent } from '@testing-library/react';

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

const WrapCompo: SFC<Props> = ({
  callback,
  eventTypes,
  excludeScrollbar
}: Props) => {
  const registerRef = useOnclickoutside(callback, {
    eventTypes,
    excludeScrollbar
  });

  return (
    <div data-testid="container">
      <div data-testid="ref-1" ref={registerRef} />
      <div data-testid="ref-2" ref={registerRef} />
    </div>
  );
};

describe('useOnclickoutside', () => {
  interface Params {
    types?: EventTypes;
    scrollbar?: ExcludeScrollbar;
  }
  interface Return {
    cb: Function;
    getByTestId: Function;
  }

  const renderCompo = ({
    types = ['mousedown', 'touchstart'],
    scrollbar = false
  }: Params = {}): Return => {
    const cb = jest.fn();
    const { getByTestId } = render(
      <WrapCompo
        callback={cb}
        eventTypes={types}
        excludeScrollbar={scrollbar}
      />
    );

    return { cb, getByTestId };
  };

  it('should not trigger callback when clicks (touches) inside of the target refs', () => {
    const { cb, getByTestId } = renderCompo();
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
    const { cb, getByTestId } = renderCompo();
    const container = getByTestId('container');

    fireEvent.mouseDown(container);
    fireEvent.touchStart(container);

    expect(cb).toBeCalledTimes(2);
  });

  it('should trigger callback by the assign event type', () => {
    const { cb, getByTestId } = renderCompo({ types: ['mouseup'] });
    const container = getByTestId('container');

    fireEvent.mouseDown(container);

    expect(cb).not.toBeCalled();

    fireEvent.mouseUp(container);

    expect(cb).toBeCalled();
  });

  it.todo('ssr');
  it.todo('ignore scrollbar clicks');
});

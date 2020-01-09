import canUsePassiveEvents from '../src/useOnclickoutside/canUsePassiveEvents';

describe('canUsePassiveEvents', () => {
  it('should return false in ssr', () => {
    window.addEventListener = undefined;

    expect(canUsePassiveEvents()).toBeFalsy();
  });

  it('should return false when passive events are unavailable', () => {
    expect(canUsePassiveEvents()).toBeFalsy();
  });

  it('should return true when passive events are available', () => {
    // @ts-ignore
    window.addEventListener = jest.fn((e, cb, { passive }) => null);

    expect(canUsePassiveEvents()).toBeTruthy();
  });
});

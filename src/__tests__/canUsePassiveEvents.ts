import canUsePassiveEvents from "../canUsePassiveEvents";

describe("canUsePassiveEvents", () => {
  it("should get false in ssr", () => {
    // @ts-ignore
    window.addEventListener = undefined;

    expect(canUsePassiveEvents()).toBeFalsy();
  });

  it("should get false when not support passive events", () => {
    expect(canUsePassiveEvents()).toBeFalsy();
  });

  it("should get true when support passive events", () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    window.addEventListener = jest.fn((e, cb, { passive }) => null);

    expect(canUsePassiveEvents()).toBeTruthy();
  });
});

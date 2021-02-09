import { FC, useRef } from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import useOnclickOutside, { DEFAULT_IGNORE_CLASS, Callback, Options } from "..";

interface Props extends Options {
  refOpt: boolean;
  className: string;
  callback: Callback;
}

const Compo: FC<Props> = ({
  refOpt,
  className,
  callback,
  ...options
}: Props) => {
  const ref1 = useRef<HTMLDivElement>();
  const ref2 = useRef<HTMLDivElement>();
  const ref = useOnclickOutside(callback, {
    ...options,
    // @ts-expect-error
    refs: refOpt && [ref1, ref2],
  });

  return (
    <>
      {/* @ts-expect-error */}
      <div data-testid="ref-1" ref={refOpt ? ref1 : ref} />
      {/* @ts-expect-error */}
      <div data-testid="ref-2" ref={refOpt ? ref2 : ref}>
        <div data-testid="in-1" />
      </div>
      <div data-testid="out-1" />
      <div data-testid="out-2" className={className || DEFAULT_IGNORE_CLASS}>
        <div data-testid="out-3" />
      </div>
      <iframe data-testid="iframe-1" src="url" title="iframe-1" ref={ref} />
      <iframe
        data-testid="iframe-2"
        src="url"
        title="iframe-2"
        className={DEFAULT_IGNORE_CLASS}
      />
      <iframe data-testid="iframe-3" src="url" title="iframe-3" />
    </>
  );
};

interface Args extends Options {
  refOpt?: boolean;
  className?: string;
}

const renderHelper = ({
  refOpt = false,
  className,
  disabled = false,
  eventTypes = ["mousedown", "touchstart"],
  excludeScrollbar = false,
  detectIFrame = true,
}: Args = {}): (() => void) => {
  const cb = jest.fn();
  render(
    <Compo
      refOpt={refOpt}
      className={className || ""}
      callback={cb}
      disabled={disabled}
      eventTypes={eventTypes}
      excludeScrollbar={excludeScrollbar}
      detectIFrame={detectIFrame}
    />
  );

  return cb;
};

describe("useOnclickOutside", () => {
  Object.defineProperties(window.HTMLHtmlElement.prototype, {
    clientWidth: { value: 100 },
    clientHeight: { value: 100 },
  });
  const { getByTestId } = screen;

  it.each(["method", "option"])(
    "should not trigger callback when clicking/touching inside of the target with ref(s) %s",
    (type) => {
      const cb = renderHelper({ refOpt: type === "option" });
      const ref1 = getByTestId("ref-1");
      const ref2 = getByTestId("ref-2");
      const in1 = getByTestId("in-1");

      fireEvent.mouseDown(ref1);
      fireEvent.touchStart(ref1);
      fireEvent.touchStart(in1);

      expect(cb).not.toHaveBeenCalled();

      fireEvent.mouseDown(ref2);
      fireEvent.touchStart(ref2);
      fireEvent.touchStart(in1);

      expect(cb).not.toHaveBeenCalled();
    }
  );

  it.each(["default", "specified"])(
    "should not trigger callback when clicking an element with %s ignore class",
    (type) => {
      const cb = renderHelper({
        ignoreClass: type === "specified" ? "my-ignore-class" : undefined,
      });
      const out2 = getByTestId("out-2");
      const out3 = getByTestId("out-3");

      fireEvent.mouseDown(out2);
      fireEvent.mouseDown(out3);

      expect(cb).not.toHaveBeenCalled();
    }
  );

  it("should trigger callback when clicking/touching outside of the targets", () => {
    const cb = renderHelper();
    const out = getByTestId("out-1");

    fireEvent.mouseDown(out);
    fireEvent.touchStart(out);

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it("should trigger callback by the assign event type", () => {
    const cb = renderHelper({ eventTypes: ["mouseup"] });
    const out = getByTestId("out-1");

    fireEvent.mouseDown(out);

    expect(cb).not.toHaveBeenCalled();

    fireEvent.mouseUp(out);

    expect(cb).toHaveBeenCalled();
  });

  it("should not trigger callback when event listener is disabled", () => {
    const cb = renderHelper({ disabled: true });
    const out = getByTestId("out-1");

    fireEvent.mouseDown(out);
    fireEvent.touchStart(out);

    expect(cb).not.toHaveBeenCalled();
  });

  it("should not trigger callback when clicking inside of the scrollbar", () => {
    const cb = renderHelper({ excludeScrollbar: true });
    const out = getByTestId("out-1");

    fireEvent.mouseDown(out, { clientX: 110 });
    fireEvent.mouseDown(out, { clientY: 110 });

    expect(cb).not.toHaveBeenCalled();
  });

  it("should trigger callback when clicking outside of the scrollbar", () => {
    const cb = renderHelper({ excludeScrollbar: true });
    const out = getByTestId("out-1");

    fireEvent.mouseDown(out, { clientX: 90 });
    fireEvent.mouseDown(out, { clientY: 90 });

    expect(cb).toHaveBeenCalledTimes(2);
  });

  it("should trigger callback when clicking on the iframe correctly", () => {
    jest.useFakeTimers();

    const cb = renderHelper();
    fireEvent(window, new Event("blur"));
    jest.runAllTimers();

    expect(cb).not.toHaveBeenCalled();

    getByTestId("iframe-1").focus();
    fireEvent(window, new Event("blur"));
    jest.runAllTimers();

    expect(cb).not.toHaveBeenCalled();

    getByTestId("iframe-2").focus();
    fireEvent(window, new Event("blur"));
    jest.runAllTimers();

    expect(cb).not.toHaveBeenCalled();

    getByTestId("iframe-3").focus();
    fireEvent(window, new Event("blur"));
    jest.runAllTimers();

    expect(cb).toHaveBeenCalled();
  });

  it('should disable "detectIFrame"', () => {
    window.addEventListener = jest.fn();
    renderHelper({ detectIFrame: false });
    const iframe = getByTestId("iframe-1");
    fireEvent.mouseDown(iframe);

    expect(window.addEventListener).not.toHaveBeenCalledWith(
      "blur",
      expect.any(Function)
    );

    renderHelper();
    fireEvent.mouseDown(iframe);

    expect(window.addEventListener).toHaveBeenCalledWith(
      "blur",
      expect.any(Function)
    );
  });
});

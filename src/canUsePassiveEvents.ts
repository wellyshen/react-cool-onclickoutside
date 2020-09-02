export default (): boolean => {
  if (
    typeof window === "undefined" ||
    typeof window.addEventListener !== "function"
  )
    return false;

  let passive = false;
  const options = Object.defineProperty({}, "passive", {
    // eslint-disable-next-line getter-return
    get() {
      passive = true;
    },
  });
  const noop = () => null;

  window.addEventListener("test", noop, options);
  window.removeEventListener("test", noop, options);

  return passive;
};

# React Cool Onclickoutside

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) to execute callback when user clicks outside of the target component(s) area. It's a useful logic for UI interaction design (IxD) like hide a dropdown menu or tooltip etc. Hop you guys ❤️ it!

⚡️ Live demo: https://react-cool-onclickoutside.netlify.com

> 🚧 This package is still under development, API may changed frequently. **Please don't use it now ✋🏼**. The milestone as below:

- [x] Triggers callback when clicks outside target area
- [x] Uses passive touch event listener to improve scrolling performance
- [x] Support multiple refs
- [ ] Clicks on the scrollbar can be ignored
- [ ] Unit testing
- [ ] Typescript type definition
- [ ] Demo website
- [ ] CI/CD
- [ ] Documentation

## Usage

General use case.

```js
import useOnclickoutside from 'react-use-onclickoutside';

const App = () => {
  const ref = useOnclickoutside(() => {
    // Handle outside clicked...
  });

  return <div ref={ref}>{'Dropdown'}</div>;
};
```

Support multiple refs. Callback only be triggered when user clicks outside of both.

```js
import useOnclickoutside from 'react-use-onclickoutside';

const App = () => {
  const ref = useOnclickoutside(() => {
    // Handle outside clicked...
  });

  return (
    <>
      <div ref={ref}>{'Dropdown 1'}</div>
      <div ref={ref}>{'Dropdown 2'}</div>
    </>
  );
};
```

## Reference

```js
type UseOnclickoutside = (
  callback: (event?: MouseEvent | TouchEvent) => void,
  eventTypes: string[] = ['mousedown', 'touchstart']
): (el: HTMLElement | null) => void
```

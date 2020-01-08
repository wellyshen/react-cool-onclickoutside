# React Cool Onclickoutside

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) to execute callback when user clicks outside of the target component(s) area. It's a useful logic for UI interaction design (IxD) like dismiss a dropdown menu, modal or tooltip etc. Hop you guys ❤️ it!

⚡️ Live demo: https://react-cool-onclickoutside.netlify.com

> 🚧 This package is still under development, API may changed frequently. **Please don't use it now ✋🏼**. The milestone as below:

- [x] Triggers callback when clicks outside target area
- [x] Uses passive touch event listener to improve scrolling performance
- [x] Support multiple refs
- [x] Clicks on the scrollbar can be ignored
- [ ] Unit testing
- [ ] Typescript type definition
- [ ] Demo website
- [ ] Demo code
- [ ] CI/CD
- [ ] Documentation

## Requirement

To use `react-cool-onclickoutside`, you must use `react@16.8.0` or greater which includes hooks.

## Installation

This package is distributed via [npm](https://www.npmjs.com/package/react-cool-onclickoutside).

```sh
$ yarn add react-cool-onclickoutside
# or
$ npm install --save react-cool-onclickoutside
```

## Usage

Common use case.

```js
import useOnclickoutside from 'react-cool-onclickoutside';

const Dropdown = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const rigisterRef = useOnclickoutside(() => {
    setOpenMenu(false);
  });

  const handleClickBtn = () => {
    setOpenMenu(true);
  };

  return (
    <div>
      <div onClick={handleClickBtn}>Button</div>
      {openMenu && <div ref={rigisterRef}>Menu</div>}
    </div>
  );
};
```

Support multiple refs. Callback only be triggered when user clicks outside of both.

```js
import useOnclickoutside from 'react-cool-onclickoutside';

const App = () => {
  const [showTips, setShowTips] = useState(true);
  const rigisterRef = useOnclickoutside(() => {
    setShowTips(false);
  });

  return (
    <div>
      {showTips && (
        <>
          <Tooltip ref={rigisterRef} />
          <Tooltip ref={rigisterRef} />
        </>
      )}
    </div>
  );
};
```

## API

```js
const rigisterRef = useOnclickoutside(callback[, options]);
```

### Parameters

You must pass the `callback` for using this hook and you can access the [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) or [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) via the `event` parameter as below:

```js
const callback = event => {
  console.log('Event: ', event);
};
```

The `options` object may contain the following keys.

| Key                | Type    | Default                       | Description                                            |
| ------------------ | ------- | ----------------------------- | ------------------------------------------------------ |
| `eventTypes`       | Array   | `['mousedown', 'touchstart']` | Which events to listen for.                            |
| `excludeScrollbar` | boolean | `false`                       | Whether or not to listen (ignore) to scrollbar clicks. |

### Return

A function to register the component(s) that `useOnclickoutside` hook should target to.

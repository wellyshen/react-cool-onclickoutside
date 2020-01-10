# React Cool Onclickoutside

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) to trigger callback when user clicks outside of the target component(s) area. It's a useful logic for UI interaction design (IxD) like dismiss a dropdown menu, modal or tooltip etc. You can explore the [features](#features) section to learn more.

⚡️ Live demo: https://react-cool-onclickoutside.netlify.com

❤️ it? ⭐️ it on [GitHub](https://github.com/wellyshen/react-cool-onclickoutside/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=With%20@react-cool-onclickoutside,%20I%20can%20build%20UI%20components%20efficiently.%20Thanks,%20@Welly%20Shen%20🤩) about it.

[![build status](https://img.shields.io/travis/wellyshen/react-cool-onclickoutside/master?style=flat-square)](https://travis-ci.org/wellyshen/react-cool-onclickoutside)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-onclickoutside?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-onclickoutside?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-onclickoutside?style=flat-square)](https://www.npmjs.com/package/react-cool-onclickoutside)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-onclickoutside?style=flat-square)](https://www.npmtrends.com/react-cool-onclickoutside)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-onclickoutside?style=flat-square)](https://www.npmtrends.com/react-cool-onclickoutside)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-cool-onclickoutside?style=flat-square)](https://bundlephobia.com/result?p=react-cool-onclickoutside)
[![MIT licensed](https://img.shields.io/github/license/wellyshen/react-cool-onclickoutside?style=flat-square)](https://raw.githubusercontent.com/wellyshen/react-cool-onclickoutside/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/wellyshen/react-cool-onclickoutside/blob/master/CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-onclickoutside)](https://twitter.com/intent/tweet?text=With%20@react-cool-onclickoutside,%20I%20can%20build%20UI%20components%20efficiently.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🎣 Listen for clicks outside based on React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).
- 👯‍♀️ Support multiple [refs](https://reactjs.org/docs/refs-and-the-dom.html) to cover more use cases.
- 🧻 Uses [passive event listeners](https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners) to improve scrolling performance.
- ⛔️ Scrollbar can be excluded from clicks outside callback.
- 📜 Support [TypeScript](https://www.typescriptlang.org) type definition.
- 🗄️ Server-side rendering friendly.
- 🦠 Tiny size ([~ 741B gzipped](https://bundlephobia.com/result?p=react-cool-onclickoutside)). No external dependencies, aside for the `react`.

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
  const registerRef = useOnclickoutside(() => {
    setOpenMenu(false);
  });

  const handleClickBtn = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <div onClick={handleClickBtn}>Button</div>
      {openMenu && <div ref={registerRef}>Menu</div>}
    </div>
  );
};
```

[![Edit useOnclickoutside demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useonclickoutside-demo-g185l?fontsize=14&hidenavigation=1&theme=dark)

Support multiple refs. Callback only be triggered when user clicks outside of the registered components.

```js
import useOnclickoutside from 'react-cool-onclickoutside';

const App = () => {
  const [showTips, setShowTips] = useState(true);
  const registerRef = useOnclickoutside(() => {
    setShowTips(false);
  });

  return (
    <div>
      {showTips && (
        <>
          <Tooltip ref={registerRef} />
          <Tooltip ref={registerRef} />
        </>
      )}
    </div>
  );
};
```

## API

```js
const registerRef = useOnclickoutside(callback[, options]);
```

### Parameters

You must pass the `callback` to use this hook and you can access the [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) or [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) via the `event` parameter as below:

```js
const callback = event => {
  console.log('Event: ', event);
};
```

The `options` object may contain the following keys.

| Key                | Type    | Default                       | Description                                                    |
| ------------------ | ------- | ----------------------------- | -------------------------------------------------------------- |
| `eventTypes`       | Array   | `['mousedown', 'touchstart']` | Which events to listen for.                                    |
| `excludeScrollbar` | boolean | `false`                       | Whether or not to listen (ignore) to browser scrollbar clicks. |

### Return

A function to register the component(s) that `useOnclickoutside` hook should target to.

## Inspiration

- [react-onclickoutside](https://github.com/Pomax/react-onclickoutside)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://www.linkedin.com/in/welly-shen-8b43287a/"><img src="https://avatars1.githubusercontent.com/u/21308003?v=4" width="100px;" alt=""/><br /><sub><b>Welly</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-onclickoutside/commits?author=wellyshen" title="Code">💻</a> <a href="https://github.com/wellyshen/react-cool-onclickoutside/commits?author=wellyshen" title="Documentation">📖</a> <a href="#maintenance-wellyshen" title="Maintenance">🚧</a></td>
  </tr>
</table>
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

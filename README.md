# <em><b>REACT COOL ONCLICKOUTSIDE</b></em>

This is a React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook) to trigger callback when user clicks outside of the target component(s) area. It's a useful logic for UI interaction design (IxD) like dismiss a dropdown menu, modal or tooltip etc. You can check the [features](#features) section to learn more.

⚡️ Live demo: https://react-cool-onclickoutside.netlify.app

❤️ it? ⭐️ it on [GitHub](https://github.com/wellyshen/react-cool-onclickoutside/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=With%20@react-cool-onclickoutside,%20I%20can%20build%20UI%20components%20efficiently.%20Thanks,%20@Welly%20Shen%20🤩) about it.

[![build status](https://img.shields.io/github/workflow/status/wellyshen/react-cool-onclickoutside/CI?style=flat-square)](https://github.com/wellyshen/react-cool-onclickoutside/actions?query=workflow%3ACI)
[![coverage status](https://img.shields.io/coveralls/github/wellyshen/react-cool-onclickoutside?style=flat-square)](https://coveralls.io/github/wellyshen/react-cool-onclickoutside?branch=master)
[![npm version](https://img.shields.io/npm/v/react-cool-onclickoutside?style=flat-square)](https://www.npmjs.com/package/react-cool-onclickoutside)
[![npm downloads](https://img.shields.io/npm/dm/react-cool-onclickoutside?style=flat-square)](https://www.npmtrends.com/react-cool-onclickoutside)
[![npm downloads](https://img.shields.io/npm/dt/react-cool-onclickoutside?style=flat-square)](https://www.npmtrends.com/react-cool-onclickoutside)
[![gzip size](https://badgen.net/bundlephobia/minzip/react-cool-onclickoutside?label=gzip%20size&style=flat-square)](https://bundlephobia.com/result?p=react-cool-onclickoutside)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange?style=flat-square)](#contributors-)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fwellyshen%2Freact-cool-onclickoutside)](https://twitter.com/intent/tweet?text=With%20@react-cool-onclickoutside,%20I%20can%20build%20UI%20components%20efficiently.%20Thanks,%20@Welly%20Shen%20🤩)

## Features

- 🎣 Listens for clicks outside based on React [hook](https://reactjs.org/docs/hooks-custom.html#using-a-custom-hook).
- 👯‍♀️ Supports multiple [refs](https://reactjs.org/docs/refs-and-the-dom.html) to cover more use cases.
- 🧻 Uses [passive event listeners](https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners) to improve scrolling performance.
- ⛔ Scrollbar can be excluded from the callback of outside clicks.
- 🙈 [Ignores certain elements](#ignore-elements-by-css-class-name) during the event loop.
- 🙉 Enables you to [stop listening for outside clicks](#disabling-the-event-listener) when needed.
- 🪟 [Detects iframe clicks](#detecting-iframe-clicks) for better DX.
- 🔩 Supports custom `refs` for [some reasons](#use-your-own-ref).
- 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition.
- 🗄️ Server-side rendering compatibility.
- 🦔 Tiny size ([< 1kB gzipped](https://bundlephobia.com/result?p=react-cool-onclickoutside)). No external dependencies, aside for the `react`.

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
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

const Dropdown = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setOpenMenu(false);
  });

  const handleClickBtn = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div>
      <button onClick={handleClickBtn}>Button</button>
      {openMenu && <div ref={ref}>Menu</div>}
    </div>
  );
};
```

[![Edit useOnclickOutside demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/useonclickoutside-demo-g185l?fontsize=14&hidenavigation=1&theme=dark)

Support multiple refs. Callback only be triggered when user clicks outside of the registered components.

```js
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

const App = () => {
  const [showTips, setShowTips] = useState(true);
  const ref = useOnclickOutside(() => {
    setShowTips(false);
  });

  return (
    <div>
      {showTips && (
        <>
          <div ref={ref}>Tooltip 1</div>
          <div ref={ref}>Tooltip 2</div>
        </>
      )}
    </div>
  );
};
```

## Ignore Elements by CSS Class Name

You can tell `react-cool-onclickoutside` to ignore certain elements during the event loop by the `ignore-onclickoutside` CSS class name. If you want explicit control over the class name, use the `ignoreClass` option.

```js
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

// Use the default CSS class name
const App = () => {
  const ref = useOnclickOutside(() => {
    // Do something...
  });

  return (
    <div>
      <div ref={ref}>I'm a 🍕</div>
      <div>Click me will trigger the event's callback</div>
      <div className="ignore-onclickoutside">
        Click me won't trigger the event's callback
      </div>
    </div>
  );
};

// Use your own CSS class name
const App = () => {
  const ref = useOnclickOutside(
    () => {
      // Do something...
    },
    {
      ignoreClass: "my-ignore-class", // Or ["class-1", "class-2"]
    }
  );

  return (
    <div>
      <div ref={ref}>I'm a 🍕</div>
      <div>Click me will trigger the event's callback</div>
      <div className="my-ignore-class">
        Click me won't trigger the event's callback
      </div>
    </div>
  );
};
```

## Disabling the Event Listener

In case you want to disable the event listener for performance reasons or fulfill some use cases. We provide the `disabled` option for you. Once you set it to `true`, the callback won’t be triggered.

```js
import { useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

const App = () => {
  const [disabled, setDisabled] = useState(false);
  const ref = useOnclickOutside(
    () => {
      // Do something...
    },
    { disabled }
  );

  const handleBtnClick = () => {
    setDisabled(true);
  };

  return (
    <div>
      <button onClick={handleBtnClick}>
        Stop listening for outside clicks
      </button>
      <div ref={ref}>I'm a 🍎</div>
    </div>
  );
};
```

## Use Your Own `ref`

In case of you had a ref already or you want to share a ref for other purposes. You can pass in the ref instead of using the one provided by this hook.

```js
const ref = useRef();

useOnclickOutside(
  () => {
    // Do something...
  },
  { refs: [ref] }
);
```

## Detecting Iframe Clicks

Clicks on an `<iframe>` element won't trigger `document.documentElement` listeners, because it's literally different page with different security domain. However, when clicking on an iframe moves `focus` to its content's window that triggers the main [window.blur](https://developer.mozilla.org/en-US/docs/Web/API/Window/blur_event) event. `react-cool-onclickoutside` in conjunction the `blur` event with [document.activeElement](https://developer.mozilla.org/en-US/docs/Web/API/DocumentOrShadowRoot/activeElement) to detect if an iframe is clicked, and execute the provided callback.

The above-mentioned workaround has its caveats:

- Clicks on an iframe will only trigger the provided callback once. Subsequent clicks on iframe will not trigger the callback until focus has been moved back to main window.
- Move focus to iframe via keyboard navigation also triggers the provided callback.

For our convenience, this feature is enabled by default. You can optionally disable it by setting the `detectIFrame` to `false` if you find it conflicting with your use-case.

## API

```js
const ref = useOnclickOutside(callback: (event: Event) => void, options?: object);
```

You must register the `ref` and pass the `callback` to use this hook. Moreover you can access the `event` object via the callback's parameter, default will be [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) or [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent).

```js
const callback = (event) => {
  console.log("Event: ", event);
};
```

The `options` object contains the following keys.

| Key                | Type               | Default                       | Description                                                                                             |
| ------------------ | ------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `refs`             | Array              |                               | For [some reasons](#use-your-own-ref), you can pass in your own `ref(s)` instead of using the built-in. |
| `disabled`         | boolean            | `false`                       | Enable/disable the event listener.                                                                      |
| `eventTypes`       | Array              | `['mousedown', 'touchstart']` | Which events to listen for.                                                                             |
| `excludeScrollbar` | boolean            | `false`                       | Whether or not to listen (ignore) to browser scrollbar clicks.                                          |
| `ignoreClass`      | string \| string[] | `ignore-onclickoutside`       | To ignore certain elements during the event loop by the CSS class name that you defined.                |
| `detectIFrame`     | boolean            | `true`                        | To disable the feature of [detecting iframe clicks](#detecting-iframe-clicks).                          |

## Articles / Blog Posts

> 💡 If you have written any blog post or article about `react-cool-onclickoutside`, please open a PR to add it here.

- Featured on [React Status #172](https://react.statuscode.com/issues/172).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://wellyshen.com"><img src="https://avatars1.githubusercontent.com/u/21308003?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Welly</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-onclickoutside/commits?author=wellyshen" title="Code">💻</a> <a href="https://github.com/wellyshen/react-cool-onclickoutside/commits?author=wellyshen" title="Documentation">📖</a> <a href="#maintenance-wellyshen" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/DmitryScaletta"><img src="https://avatars1.githubusercontent.com/u/5096735?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DmitryScaletta</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-onclickoutside/issues?q=author%3ADmitryScaletta" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/vardani"><img src="https://avatars2.githubusercontent.com/u/58708973?v=4?s=100" width="100px;" alt=""/><br /><sub><b>vardani</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-onclickoutside/issues?q=author%3Avardani" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/cherepanov"><img src="https://avatars.githubusercontent.com/u/876145?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexey Cherepanov</b></sub></a><br /><a href="https://github.com/wellyshen/react-cool-onclickoutside/commits?author=cherepanov" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

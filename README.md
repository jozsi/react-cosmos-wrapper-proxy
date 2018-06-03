# react-cosmos-wrapper-proxy

Easily wrap components using [react-cosmos](https://github.com/react-cosmos/react-cosmos)

Supports both [Wrapper Components](#wrapper) and [HOCs (Higher Order Components)](#hoc)

## Examples

### Wrapper

#### Using Material-UI

```js
// cosmos.proxies.js
import createWrapperProxy from "react-cosmos-wrapper-proxy";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const muiProxy = createWrapperProxy({
  // Required
  component: MuiThemeProvider, // The wrapper component
  fixtureKey: "mui", // Key

  // Optional
  // Props to pass to the wrapper component
  // Note: can be passed from the fixture as well
  props: {
    muiTheme: {
      /* ... */
    },
    someOtherProp: "hello"
  }
});

export default [muiProxy];
```

```js
// __fixtures__/example.js
export default {
  component: MyComponent,
  // Pass an object of props or `true` to enable the proxy
  mui: true
};
```

### HOC

#### Using Redux-Form

```js
// cosmos.proxies.js
import createWrapperProxy from "react-cosmos-wrapper-proxy";
import { reduxForm } from "redux-form";

const reduxFormProxy = createWrapperProxy({
  // Required
  component: reduxForm, // The wrapper function
  hoc: true, // Differentiate it from a simple wrapper
  fixtureKey: "rf" // Key
});

export default [reduxFormProxy];
```

```js
// __fixtures__/example.js
export default {
  component: MyComponent,
  // If HOC looks like myHoc(arg1, arg2)(Component)
  // Then pass an array of arguments
  rf: [
    {
      form: "formName"
    }
  ]
  // If the HOC is simply myHoc(Component)
  // Then just pass true
  // rf: true
};
```

_Contributions are more than welcome! :beers:_

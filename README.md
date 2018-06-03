# react-cosmos-wrapper-proxy

Easily wrap components using [react-cosmos](https://github.com/react-cosmos/react-cosmos)

## Example (using Material-UI)

### Proxy configuration

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

### Fixture configuration

```js
// __fixtures__/example.js
export default {
  component: MyComponent,
  // Pass an object of props or `true` to enable the proxy
  mui: true
};
```

_Contributions are more than welcome! :beers:_

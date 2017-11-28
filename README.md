# react-cosmos-wrapper-proxy
Easily wrap components using react-cosmos

## Example (using Material-UI)
### Configuration
```js
// cosmos.proxies.js
import createWrapperProxy from 'react-cosmos-wrapper-proxy';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiProxy = createWrapperProxy({
  // Required
  component: MuiThemeProvider, // The wrapper component
  fixtureKey: 'mui', // Used for toggling (or passing props)

  // Optional
  // Props to pass to the wrapper component
  props: {
    muiTheme: {/* ... */},
    someOtherProp: 'hello',
  },
});

export default [
  muiProxy,
];
```

### Activation
```js
// __fixtures__/example.js
export default {
  component: MyComponent,

  // Option 1
  // Setting it to `true` will enable the proxy and wrap your component
  mui: true,

  // Option 2
  // Pass in an object of props
  // This will be merged into the ones defined in `createWrapperProxy`
  mui: { //
    muiTheme: {/* ... */}, // a. will override previously defined `muiTheme` prop
    newProp: 'aloha', // b. will be added
  },

  // Option 3
  // Omitting the `fixtureKey` (`mui` in our case) will skip this proxy
}
```

## TODO
- [ ] Tests

*Contributions are more than welcome! :beers:*

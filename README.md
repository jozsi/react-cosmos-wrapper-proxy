# react-cosmos-wrapper-proxy
Easily wrap components using react-cosmos

## Example (using Material-UI)
### Configuration
```js
// cosmos.proxies.js
import createWrapperProxy from 'react-cosmos-wrapper-proxy';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiProxy = createWrapperProxy({
  component: MuiThemeProvider,
  props: {}, // Optional, you can use `muiTheme` in this case
  fixtureKey: 'mui', // Used for toggling proxy in fixtures
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
  mui: true, // You can omit this if it's not a Material-UI component
}
```

## TODO
- [ ] Tests

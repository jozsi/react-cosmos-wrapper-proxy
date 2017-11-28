function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';

export default (function (_ref) {
  var Component = _ref.component,
      props = _ref.props,
      fixtureKey = _ref.fixtureKey;
  return function (_ref2) {
    var _ref2$nextProxy = _ref2.nextProxy,
        NextProxy = _ref2$nextProxy.value,
        next = _ref2$nextProxy.next,
        nextProps = _objectWithoutProperties(_ref2, ['nextProxy']);

    var nextProxyEl = React.createElement(NextProxy, Object.assign({}, nextProps, { nextProxy: next() }));
    var fixtureProps = nextProps.fixture[fixtureKey];
    var fixtureEnabled = !!fixtureProps;

    return fixtureEnabled ? React.createElement(
      Component,
      Object.assign({}, props, fixtureProps),
      nextProxyEl
    ) : nextProxyEl;
  };
});
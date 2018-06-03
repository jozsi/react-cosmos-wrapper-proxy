"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (_ref) {
  var Component = _ref.component,
      props = _ref.props,
      fixtureKey = _ref.fixtureKey;
  return function WrapperProxy(_ref2) {
    var _ref2$nextProxy = _ref2.nextProxy,
        NextProxy = _ref2$nextProxy.value,
        next = _ref2$nextProxy.next,
        nextProps = _objectWithoutProperties(_ref2, ["nextProxy"]);

    var nextProxyEl = _react2.default.createElement(NextProxy, Object.assign({}, nextProps, { nextProxy: next() }));
    var fixtureProps = nextProps.fixture[fixtureKey];
    var fixtureEnabled = !!fixtureProps;

    return fixtureEnabled ? _react2.default.createElement(
      Component,
      Object.assign({}, props, fixtureProps),
      nextProxyEl
    ) : nextProxyEl;
  };
};

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var HOCPropsProxy = function HOCPropsProxy(props) {
  var nextProxy = props.nextProxy,
      fixture = props.fixture,
      onComponentRef = props.onComponentRef,
      onFixtureUpdate = props.onFixtureUpdate,
      rest = _objectWithoutProperties(props, ["nextProxy", "fixture", "onComponentRef", "onFixtureUpdate"]);

  var NextProxy = nextProxy.value,
      next = nextProxy.next;

  fixture.props = Object.assign({}, rest, fixture.props);

  return _react2.default.createElement(NextProxy, {
    fixture: fixture,
    onComponentRef: onComponentRef,
    onFixtureUpdate: onFixtureUpdate,
    nextProxy: next()
  });
};

exports.default = function (_ref) {
  var Component = _ref.component,
      props = _ref.props,
      fixtureKey = _ref.fixtureKey,
      hoc = _ref.hoc,
      _ref$defaultEnabled = _ref.defaultEnabled,
      defaultEnabled = _ref$defaultEnabled === undefined ? false : _ref$defaultEnabled;
  return function WrapperProxy(_ref2) {
    var nextProxy = _ref2.nextProxy,
        nextProps = _objectWithoutProperties(_ref2, ["nextProxy"]);

    var fixtureProps = nextProps.fixture[fixtureKey];
    var fixtureEnabled = defaultEnabled || !!fixtureProps;

    if (fixtureEnabled && hoc) {
      var HOComponent = fixtureProps[Symbol.iterator] ? Component.apply(undefined, _toConsumableArray(fixtureProps))(HOCPropsProxy) : Component(HOCPropsProxy);

      return _react2.default.createElement(HOComponent, Object.assign({}, nextProps, { nextProxy: nextProxy }));
    }

    var NextProxy = nextProxy.value,
        next = nextProxy.next;

    var nextProxyEl = _react2.default.createElement(NextProxy, Object.assign({}, nextProps, { nextProxy: next() }));

    return fixtureEnabled ? _react2.default.createElement(
      Component,
      Object.assign({}, props, fixtureProps),
      nextProxyEl
    ) : nextProxyEl;
  };
};

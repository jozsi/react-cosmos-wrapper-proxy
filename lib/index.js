"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var HOCPropsProxy = function HOCPropsProxy(props) {
  var nextProxy = props.nextProxy,
      fixture = props.fixture,
      onComponentRef = props.onComponentRef,
      onFixtureUpdate = props.onFixtureUpdate,
      rest = _objectWithoutProperties(props, ["nextProxy", "fixture", "onComponentRef", "onFixtureUpdate"]);

  var NextProxy = nextProxy.value,
      next = nextProxy.next;
  fixture.props = _objectSpread({}, rest, {}, fixture.props);
  return _react["default"].createElement(NextProxy, {
    fixture: fixture,
    onComponentRef: onComponentRef,
    onFixtureUpdate: onFixtureUpdate,
    nextProxy: next()
  });
};

var _default = function _default(_ref) {
  var Component = _ref.component,
      props = _ref.props,
      fixtureKey = _ref.fixtureKey,
      hoc = _ref.hoc,
      defaultEnabled = _ref.defaultEnabled;
  return function WrapperProxy(_ref2) {
    var nextProxy = _ref2.nextProxy,
        nextProps = _objectWithoutProperties(_ref2, ["nextProxy"]);

    var fixtureProps = nextProps.fixture[fixtureKey];
    var fixtureEnabled = fixtureProps !== undefined ? fixtureProps : defaultEnabled;

    if (fixtureEnabled && hoc) {
      var HOComponent = fixtureProps[Symbol.iterator] ? Component.apply(void 0, _toConsumableArray(fixtureProps))(HOCPropsProxy) : Component(HOCPropsProxy);
      return _react["default"].createElement(HOComponent, _extends({}, nextProps, {
        nextProxy: nextProxy
      }));
    }

    var NextProxy = nextProxy.value,
        next = nextProxy.next;

    var nextProxyEl = _react["default"].createElement(NextProxy, _extends({}, nextProps, {
      nextProxy: next()
    }));

    return fixtureEnabled ? _react["default"].createElement(Component, _extends({}, props, fixtureProps), nextProxyEl) : nextProxyEl;
  };
};

exports["default"] = _default;

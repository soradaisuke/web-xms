"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = modelExtend;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _immutable = _interopRequireDefault(require("immutable"));

function modelExtend() {
  var base = {
    state: null,
    subscriptions: {},
    effects: {},
    reducers: {}
  };

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(function (acc, extend) {
    var state = acc.state;

    if ((0, _isPlainObject2.default)(state) && (0, _isPlainObject2.default)(extend.state)) {
      state = (0, _objectSpread2.default)({}, state, extend.state);
    } else if ((0, _isArray2.default)(acc.state) && (0, _isArray2.default)(extend.state)) {
      state = (0, _toConsumableArray2.default)(state).concat((0, _toConsumableArray2.default)(extend.state));
    } else if (state instanceof _immutable.default.Map && extend.state instanceof _immutable.default.Map) {
      state = state.merge(extend.state);
    } else if ('state' in extend) {
      state = extend.state;
    }

    return {
      state: state,
      namespace: extend.namespace || acc.namespace,
      reducers: (0, _objectSpread2.default)({}, acc.reducers, extend.reducers || {}),
      effects: (0, _objectSpread2.default)({}, acc.effects, extend.effects || {}),
      subscriptions: (0, _objectSpread2.default)({}, acc.subscriptions, extend.subscriptions || {})
    };
  }, base);
}
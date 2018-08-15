"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = valiadateRoute;

var _startsWith2 = _interopRequireDefault(require("lodash/startsWith"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function valiadateRoute(_ref) {
  var path = _ref.path,
      component = _ref.component,
      routes = _ref.routes;
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!path) {
    throw new Error('route: path is required');
  }

  if (!(0, _startsWith2.default)(path, '/')) {
    throw new Error("route ".concat(path, " : path must start with /"));
  }

  if (!component && (!routes || routes.length === 0)) {
    throw new Error("route ".concat(path, " : component or routes is required"));
  }

  (0, _forEach2.default)(routes, function (route) {
    return valiadateRoute(route, level + 1);
  });
  return true;
}
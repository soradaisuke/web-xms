"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasPermission;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

function hasPermission(_ref) {
  var configPermissions = _ref.configPermissions,
      userPermissions = _ref.userPermissions;

  if (!configPermissions) {
    return true;
  }

  if (!userPermissions || !userPermissions.size) {
    return false;
  }

  var permissions = (0, _isString2.default)(configPermissions) ? [configPermissions] : configPermissions;

  if ((0, _isFunction2.default)(permissions) && !permissions(userPermissions) || (0, _isArray2.default)(permissions) && !(0, _find2.default)(permissions, function (p) {
    return userPermissions === null || userPermissions === void 0 ? void 0 : userPermissions.get(p);
  })) {
    return false;
  }

  return true;
}
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatColumnsSubmitValues;

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var generatePaths = function generatePaths(object) {
  var paths = (0, _keys2.default)(object);
  return (0, _reduce2.default)(paths, function (result, key) {
    var keyArray = (0, _isArray2.default)(key) ? key : [key];
    var value = (0, _get2.default)(object, keyArray);

    if ((0, _isPlainObject2.default)(value)) {
      return (0, _concat2.default)(result, (0, _map2.default)(generatePaths(value), function (k) {
        return (0, _concat2.default)(keyArray, k);
      }));
    }

    return (0, _concat2.default)(result, [keyArray]);
  }, []);
};

function formatColumnsSubmitValues(_ref) {
  var columns = _ref.columns,
      values = _ref.values;
  var newValues = {};
  (0, _forEach2.default)(generatePaths(values), function (key) {
    var value = (0, _get2.default)(values, key);
    var column = columns.find(function (c) {
      var k = (0, _isArray2.default)(c.getFormKey()) ? c.getFormKey() : [c.getFormKey()];
      return (0, _isEqual2.default)(k, key);
    });

    if (column) {
      var generateSubmitValue = column.getFormGenerateSubmitValue();

      if (generateSubmitValue && (0, _isFunction2.default)(generateSubmitValue)) {
        (0, _set2.default)(newValues, key, generateSubmitValue(value));
      } else {
        (0, _set2.default)(newValues, key, column.formatFormSubmitValue(value));
      }
    }
  });
  return newValues;
}
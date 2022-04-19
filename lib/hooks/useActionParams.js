"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActionParams;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = require("react");

var _dva = require("dva");

var _useUser = _interopRequireDefault(require("./useUser"));

var _usePageData2 = _interopRequireDefault(require("./usePageData"));

var _useForm = _interopRequireDefault(require("./useForm"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useParams = _dva.router.useParams;

function useActionParams() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      record = _ref.record,
      records = _ref.records,
      action = _ref.action;

  var _usePageData = (0, _usePageData2.default)(),
      parentPageData = _usePageData.parentPageData,
      pageData = (0, _objectWithoutProperties2.default)(_usePageData, ["parentPageData"]);

  var user = (0, _useUser.default)();
  var matchParams = useParams();
  var form = (0, _useForm.default)();
  return (0, _react.useMemo)(function () {
    var params = {
      record: record,
      records: records,
      user: user,
      matchParams: matchParams,
      pageData: pageData,
      parentPageData: parentPageData
    };

    if (action === null || action === void 0 ? void 0 : action.isFormAction()) {
      params = _objectSpread(_objectSpread({}, params), {}, {
        form: form
      });
    }

    return params;
  }, [record, records, user, matchParams, pageData, parentPageData, action, form]);
}
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActionParams;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = require("react");

var _dva = require("dva");

var _useUser = _interopRequireDefault(require("./useUser"));

var _usePageData2 = _interopRequireDefault(require("./usePageData"));

var useParams = _dva.router.useParams;

function useActionParams() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      record = _ref.record,
      records = _ref.records;

  var _usePageData = (0, _usePageData2.default)(),
      parentPageData = _usePageData.parentPageData,
      pageData = (0, _objectWithoutProperties2.default)(_usePageData, ["parentPageData"]);

  var user = (0, _useUser.default)();
  var matchParams = useParams();
  return (0, _react.useMemo)(function () {
    return {
      record: record,
      records: records,
      user: user,
      matchParams: matchParams,
      pageData: pageData,
      parentPageData: parentPageData
    };
  }, [record, records, user, matchParams, pageData, parentPageData]);
}
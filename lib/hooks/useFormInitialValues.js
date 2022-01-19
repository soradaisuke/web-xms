"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useFormInitialValues;

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _react = require("react");

var _dva = require("dva");

var _useUser = _interopRequireDefault(require("./useUser"));

var _usePageConfig2 = _interopRequireDefault(require("./usePageConfig"));

var useParams = _dva.router.useParams;

function useFormInitialValues(_ref) {
  var record = _ref.record,
      c = _ref.columns;

  var _usePageConfig = (0, _usePageConfig2.default)(),
      table = _usePageConfig.table,
      _usePageConfig$formPr = _usePageConfig.formProps,
      formProps = _usePageConfig$formPr === void 0 ? {} : _usePageConfig$formPr;

  var user = (0, _useUser.default)();
  var matchParams = useParams();
  var columns = (0, _react.useMemo)(function () {
    return c || table.getColumns().filter(function (column) {
      return column.canShowInForm({
        user: user,
        record: record
      });
    });
  }, [table, user, record, c]);
  return (0, _react.useMemo)(function () {
    if (formProps.initialValues) {
      if ((0, _isFunction2.default)(formProps.initialValues)) {
        return formProps.initialValues({
          record: record,
          matchParams: matchParams
        });
      }

      return formProps.initialValues;
    }

    var isEdit = !!record;
    return columns === null || columns === void 0 ? void 0 : columns.reduce(function (iv, column) {
      if (!isEdit) {
        var initialValue = column.getFormItemInitialValue();
        return (0, _set2.default)(iv, column.getFormItemName(), (0, _isFunction2.default)(initialValue) ? initialValue({
          matchParams: matchParams
        }) : initialValue);
      }

      var editValue = (0, _get2.default)(record, column.getKey());
      var normalizeInitialValue = column.getFormItemNormalizeInitialValue();
      return (0, _set2.default)(iv, column.getFormItemName(), (0, _isFunction2.default)(normalizeInitialValue) ? normalizeInitialValue({
        record: record,
        value: editValue,
        matchParams: matchParams
      }) : editValue);
    }, {});
  }, [formProps.initialValues, record, columns, matchParams]);
}
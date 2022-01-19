"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/es/tree-select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isNil2 = _interopRequireDefault(require("lodash/isNil"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _generateTreeData = _interopRequireDefault(require("../../utils/generateTreeData"));

var _useColumnValueOptions = _interopRequireDefault(require("../../hooks/useColumnValueOptions"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _usePageFilterForm = _interopRequireDefault(require("../../hooks/usePageFilterForm"));

require("./Tree.less");

var FilterTreeSelect = _react.default.forwardRef(function (_ref, ref) {
  var column = _ref.column,
      forForm = _ref.forForm,
      initialValueOptions = _ref.initialValueOptions,
      className = _ref.className,
      isEdit = _ref.isEdit,
      onChange = _ref.onChange,
      value = _ref.value,
      props = (0, _objectWithoutProperties2.default)(_ref, ["column", "forForm", "initialValueOptions", "className", "isEdit", "onChange", "value"]);
  var filterForm = (0, _usePageFilterForm.default)();
  var onLoadOptions = (0, _useEventCallback2.default)(function (os) {
    var option = (0, _find2.default)(os, function (_ref2) {
      var defaultSelect = _ref2.default;
      return defaultSelect;
    });

    if (option && (0, _isNil2.default)(value) && (!forForm || !isEdit)) {
      onChange(option.value);

      if (!forForm) {
        filterForm === null || filterForm === void 0 ? void 0 : filterForm.submit();
      }
    }
  });

  var _useColumnValueOption = (0, _useColumnValueOptions.default)(column, _generateTreeData.default, forForm, initialValueOptions, isEdit, onLoadOptions),
      _useColumnValueOption2 = (0, _slicedToArray2.default)(_useColumnValueOption, 2),
      options = _useColumnValueOption2[0],
      onSearch = _useColumnValueOption2[1];

  return _react.default.createElement(_treeSelect.default, (0, _extends2.default)({}, props, {
    value: value,
    onChange: onChange,
    className: (0, _classnames.default)('treeselect', className),
    ref: ref,
    allowClear: true,
    showSearch: true,
    treeData: options,
    treeCheckable: forForm ? column.isArray() : column.canFilterMultiple(),
    treeNodeFilterProp: "title",
    filterTreeNode: column.getValueOptionsSearchRequest() ? false : null,
    onSearch: onSearch
  }));
});

FilterTreeSelect.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.any,
  isEdit: _propTypes.default.bool,
  className: _propTypes.default.string,
  forForm: _propTypes.default.bool,
  initialValueOptions: _propTypes.default.array
};
FilterTreeSelect.defaultProps = {
  value: undefined,
  isEdit: false,
  className: '',
  forForm: false,
  initialValueOptions: null
};

var _default = _react.default.memo(FilterTreeSelect);

exports.default = _default;
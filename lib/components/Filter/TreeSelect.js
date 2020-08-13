"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/lib/tree-select"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _generateTreeData = _interopRequireDefault(require("../../utils/generateTreeData"));

var _useColumnValueOptions = _interopRequireDefault(require("../../hooks/useColumnValueOptions"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

require("./Tree.less");

var FilterTreeSelect = _react.default.forwardRef(function (_ref, ref) {
  var column = _ref.column,
      forForm = _ref.forForm,
      initialValueOptions = _ref.initialValueOptions,
      className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["column", "forForm", "initialValueOptions", "className"]);

  var _useColumnValueOption = (0, _useColumnValueOptions.default)(column, _generateTreeData.default, forForm, initialValueOptions),
      _useColumnValueOption2 = (0, _slicedToArray2.default)(_useColumnValueOption, 2),
      options = _useColumnValueOption2[0],
      onSearch = _useColumnValueOption2[1];

  return _react.default.createElement(_treeSelect.default, (0, _extends2.default)({}, props, {
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
  className: _propTypes.default.string,
  forForm: _propTypes.default.bool,
  initialValueOptions: _propTypes.default.array
};
FilterTreeSelect.defaultProps = {
  className: '',
  forForm: false,
  initialValueOptions: null
};

var _default = _react.default.memo(FilterTreeSelect);

exports.default = _default;
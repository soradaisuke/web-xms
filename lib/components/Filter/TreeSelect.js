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

var _generateTreeData = _interopRequireDefault(require("../../utils/generateTreeData"));

var _useColumnValueOptions = _interopRequireDefault(require("../../hooks/useColumnValueOptions"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

require("./Tree.less");

function FilterTreeSelect(_ref) {
  var column = _ref.column,
      forForm = _ref.forForm,
      props = (0, _objectWithoutProperties2.default)(_ref, ["column", "forForm"]);

  var _useColumnValueOption = (0, _useColumnValueOptions.default)(column, _generateTreeData.default, forForm),
      _useColumnValueOption2 = (0, _slicedToArray2.default)(_useColumnValueOption, 2),
      options = _useColumnValueOption2[0],
      onSearch = _useColumnValueOption2[1];

  return _react.default.createElement(_treeSelect.default, (0, _extends2.default)({}, props, {
    allowClear: true,
    showSearch: true,
    treeData: options,
    treeCheckable: forForm ? column.isArray() : column.canFilterMultiple(),
    treeNodeFilterProp: "title",
    filterTreeNode: column.getValueOptionsSearchRequest() ? false : null,
    onSearch: onSearch
  }));
}

FilterTreeSelect.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  forForm: _propTypes.default.bool
};
FilterTreeSelect.defaultProps = {
  forForm: false
};

var _default = _react.default.memo(FilterTreeSelect);

exports.default = _default;
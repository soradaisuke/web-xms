"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/tree/style");

var _tree = _interopRequireDefault(require("antd/lib/tree"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/spin/style");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generateTreeData = _interopRequireDefault(require("../../utils/generateTreeData"));

var _useColumnValueOptions = _interopRequireDefault(require("../../hooks/useColumnValueOptions"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

require("./Tree.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Search = _input.default.Search;

function FilterTree(_ref) {
  var column = _ref.column,
      setSelectedKeys = _ref.setSelectedKeys,
      selectedKeys = _ref.selectedKeys,
      props = (0, _objectWithoutProperties2.default)(_ref, ["column", "setSelectedKeys", "selectedKeys"]);

  var _useColumnValueOption = (0, _useColumnValueOptions.default)(column, _generateTreeData.default),
      _useColumnValueOption2 = (0, _slicedToArray2.default)(_useColumnValueOption, 2),
      options = _useColumnValueOption2[0],
      onSearch = _useColumnValueOption2[1];

  var onCheck = (0, _useEventCallback2.default)(function (checkedKeys) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$node = _ref2.node;

    _ref2$node = _ref2$node === void 0 ? {} : _ref2$node;
    var key = _ref2$node.key;

    if (column.canFilterMultiple()) {
      setSelectedKeys(checkedKeys);
    } else {
      setSelectedKeys([key]);
    }
  });

  if (!options) {
    return _react.default.createElement(_spin.default, {
      style: {
        width: '100%'
      }
    });
  }

  var treeProps = _objectSpread(_objectSpread({}, props), {}, {
    treeData: options,
    className: 'tree-filter',
    multiple: column.canFilterMultiple(),
    checkable: true,
    checkedKeys: selectedKeys,
    onCheck: onCheck
  });

  if (column.getValueOptionsSearchRequest()) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(Search, {
      enterButton: true,
      placeholder: "\u8BF7\u8F93\u5165".concat(column.getTitle()),
      onSearch: onSearch,
      style: {
        width: 188,
        marginBottom: 8,
        display: 'block'
      }
    }), _react.default.createElement(_tree.default, treeProps));
  }

  return _react.default.createElement(_tree.default, treeProps);
}

FilterTree.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  selectedKeys: _propTypes.default.array.isRequired,
  setSelectedKeys: _propTypes.default.func.isRequired
};

var _default = _react.default.memo(FilterTree);

exports.default = _default;
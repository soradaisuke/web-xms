"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FilterOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/FilterOutlined"));

var _SearchOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/SearchOutlined"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _NumberColumn = _interopRequireDefault(require("../../schema/NumberColumn"));

var _StringColumn = _interopRequireDefault(require("../../schema/StringColumn"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

require("./FilterDropDown.less");

function FilterIcon(_ref) {
  var column = _ref.column,
      filtered = _ref.filtered;
  var style = (0, _react.useMemo)(function () {
    return {
      color: filtered ? '#1890ff' : undefined
    };
  }, [filtered]);

  if (column instanceof _StringColumn.default) {
    return _react.default.createElement(_SearchOutlined2.default, {
      style: style
    });
  }

  if (column instanceof _NumberColumn.default) {
    return column.canFilterRange() ? _react.default.createElement(_FilterOutlined2.default, {
      style: style
    }) : _react.default.createElement(_SearchOutlined2.default, {
      style: style
    });
  }

  return _react.default.createElement(_FilterOutlined2.default, {
    style: style
  });
}

FilterIcon.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  filtered: _propTypes.default.bool.isRequired
};

var _default = _react.default.memo(FilterIcon);

exports.default = _default;
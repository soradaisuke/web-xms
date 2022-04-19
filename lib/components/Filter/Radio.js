"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _generateRadioOrCheckboxOptions = _interopRequireDefault(require("../../utils/generateRadioOrCheckboxOptions"));

var _useColumnValueOptions = _interopRequireDefault(require("../../hooks/useColumnValueOptions"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

function FilterRadio(_ref) {
  var column = _ref.column,
      forForm = _ref.forForm,
      props = (0, _objectWithoutProperties2.default)(_ref, ["column", "forForm"]);

  var _useColumnValueOption = (0, _useColumnValueOptions.default)(column, _generateRadioOrCheckboxOptions.default, forForm),
      _useColumnValueOption2 = (0, _slicedToArray2.default)(_useColumnValueOption, 1),
      options = _useColumnValueOption2[0];

  return _react.default.createElement(_radio.default.Group, (0, _extends2.default)({}, props, {
    options: options
  }));
}

FilterRadio.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  forForm: _propTypes.default.bool
};
FilterRadio.defaultProps = {
  forForm: false
};

var _default = _react.default.memo(FilterRadio);

exports.default = _default;
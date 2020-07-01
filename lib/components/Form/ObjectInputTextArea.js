"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function ObjectInputTextArea(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      props = (0, _objectWithoutProperties2.default)(_ref, ["value", "onChange"]);
  var onChangeTime = (0, _useEventCallback2.default)(function (e) {
    console.log(e.target.value);

    try {
      onChange(JSON.parse(e.target.value));
      console.log('success');
    } catch (error) {
      onChange(e.target.value);
      console.log('error');
    }
  });
  return _react.default.createElement(_input.default.TextArea, (0, _extends2.default)({}, props, {
    value: (0, _isPlainObject2.default)(value) ? JSON.stringify(value) : value,
    onChange: onChangeTime
  }));
}

ObjectInputTextArea.propTypes = {
  onChange: _propTypes.default.func.isRequired,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};
ObjectInputTextArea.defaultProps = {
  value: undefined
};

var _default = _react.default.memo(ObjectInputTextArea);

exports.default = _default;
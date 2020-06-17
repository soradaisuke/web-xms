"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/modal/style");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function ConfirmButton(_ref) {
  var title = _ref.title,
      content = _ref.content,
      onOk = _ref.onOk,
      onCancel = _ref.onCancel,
      props = (0, _objectWithoutProperties2.default)(_ref, ["title", "content", "onOk", "onCancel"]);
  var onClick = (0, _useEventCallback2.default)(function () {
    _modal.default.confirm({
      title: title,
      content: content,
      onOk: onOk,
      onCancel: onCancel
    });
  }, [title, content, onOk, onCancel]);
  return _react.default.createElement(_button.default, (0, _extends2.default)({}, props, {
    onClick: onClick
  }));
}

ConfirmButton.propTypes = {
  title: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  content: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.node]),
  onOk: _propTypes.default.func,
  onCancel: _propTypes.default.func
};
ConfirmButton.defaultProps = {
  title: '',
  content: null,
  onOk: null,
  onCancel: null
};

var _default = _react.default.memo(ConfirmButton);

exports.default = _default;
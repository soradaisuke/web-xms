"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./Group.less");

function Group(_ref) {
  var title = _ref.title,
      children = _ref.children,
      className = _ref.className;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('xms-group', className)
  }, _react.default.createElement("div", {
    className: "xms-group-title"
  }, title), _react.default.createElement("div", {
    className: "xms-group-content"
  }, children));
}

Group.propTypes = {
  children: _propTypes.default.node.isRequired,
  title: _propTypes.default.string.isRequired,
  className: _propTypes.default.string
};
Group.defaultProps = {
  className: ''
};

var _default = _react.default.memo(Group);

exports.default = _default;
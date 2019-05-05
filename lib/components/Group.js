"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./Group.less");

function Group(_ref) {
  var title = _ref.title,
      children = _ref.children;
  return _react.default.createElement("div", {
    className: "xms-group"
  }, _react.default.createElement("div", {
    className: "xms-group-title"
  }, title), _react.default.createElement("div", {
    className: "xms-group-content"
  }, children));
}

Group.propTypes = {
  children: _propTypes.default.node.isRequired,
  title: _propTypes.default.string.isRequired
};

var _default = _react.default.memo(Group);

exports.default = _default;
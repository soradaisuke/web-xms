"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/layout/style");

var _layout = _interopRequireDefault(require("antd/lib/layout"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style");

var _col = _interopRequireDefault(require("antd/lib/col"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isTuboshu = _interopRequireDefault(require("../utils/isTuboshu"));

require("./Header.less");

function Header(_ref) {
  var name = _ref.name,
      children = _ref.children;
  return _react.default.createElement(_layout.default.Header, {
    className: (0, _classnames.default)('xms-header', _isTuboshu.default ? 'tuboshu' : '')
  }, _react.default.createElement(_row.default, {
    align: "middle",
    type: "flex"
  }, _react.default.createElement(_col.default, null, "".concat(_isTuboshu.default ? '土拨鼠' : '蜻蜓FM', " ").concat(name)), _react.default.createElement(_col.default, null, children)));
}

Header.propTypes = {
  children: _propTypes.default.node.isRequired,
  name: _propTypes.default.string.isRequired
};
var _default = Header;
exports.default = _default;
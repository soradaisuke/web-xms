"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditableContext = void 0;

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var EditableContext = _react.default.createContext();

exports.EditableContext = EditableContext;

var EditableTableRow = function EditableTableRow(_ref) {
  var form = _ref.form,
      index = _ref.index,
      props = (0, _objectWithoutProperties2.default)(_ref, ["form", "index"]);
  return _react.default.createElement(EditableContext.Provider, {
    value: form
  }, _react.default.createElement("tr", props));
};

var _default = _form.default.create()(EditableTableRow);

exports.default = _default;
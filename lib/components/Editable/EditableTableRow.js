"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.EditableContext = void 0;

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var EditableContext = _react.default.createContext();

exports.EditableContext = EditableContext;

var EditableTableRow = function EditableTableRow(props) {
  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  return _react.default.createElement(_form.default, {
    form: form,
    component: false
  }, _react.default.createElement(EditableContext.Provider, {
    value: form
  }, _react.default.createElement("tr", props)));
};

var _default = EditableTableRow;
exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/descriptions/style");

var _descriptions = _interopRequireDefault(require("antd/lib/descriptions"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _EditableTableRow = require("./EditableTableRow");

var EditableDescriptions = function EditableDescriptions(props) {
  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  return _react.default.createElement(_form.default, {
    form: form,
    component: false
  }, _react.default.createElement(_EditableTableRow.EditableContext.Provider, {
    value: form
  }, _react.default.createElement(_descriptions.default, props)));
};

var _default = EditableDescriptions;
exports.default = _default;
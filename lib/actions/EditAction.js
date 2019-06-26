"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Action2 = _interopRequireDefault(require("./Action"));

var EditAction = function (_Action) {
  (0, _inherits2.default)(EditAction, _Action);

  function EditAction() {
    (0, _classCallCheck2.default)(this, EditAction);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EditAction).apply(this, arguments));
  }

  (0, _createClass2.default)(EditAction, [{
    key: "getShape",
    value: function getShape() {
      return this.config.get('shape', 'circle');
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.config.get('icon', 'edit');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title', '编辑');
    }
  }, {
    key: "getColumns",
    value: function getColumns(_ref) {
      var table = _ref.table;
      return this.config.get('columns', table.getColumns());
    }
  }]);
  return EditAction;
}(_Action2.default);

exports.default = EditAction;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _Action2 = _interopRequireDefault(require("./Action"));

var _CustomizeColumnsModal = _interopRequireDefault(require("../components/CustomizeColumnsModal"));

var CustomizeAction = function (_Action) {
  (0, _inherits2.default)(CustomizeAction, _Action);

  function CustomizeAction() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, CustomizeAction);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CustomizeAction).call(this, (0, _objectSpread2.default)({}, config, {
      global: true,
      multiple: false
    })));
  }

  (0, _createClass2.default)(CustomizeAction, [{
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title', '自定义列');
    }
  }, {
    key: "canHandleGlobal",
    value: function canHandleGlobal() {
      return false;
    }
  }, {
    key: "renderInteral",
    value: function renderInteral(_ref) {
      var selectedCustomizeMap = _ref.selectedCustomizeMap,
          onChangeSelectedCustomizeMap = _ref.onChangeSelectedCustomizeMap,
          defaultSelectedCustomizeMap = _ref.defaultSelectedCustomizeMap,
          buttonProps = _ref.buttonProps,
          table = _ref.table;
      return _react.default.createElement(_CustomizeColumnsModal.default, (0, _extends2.default)({}, this.getModalComponentProps(), {
        selectedCustomizeMap: selectedCustomizeMap,
        onChangeSelectedCustomizeMap: onChangeSelectedCustomizeMap,
        defaultSelectedCustomizeMap: defaultSelectedCustomizeMap,
        columns: table.getCustomizeColumns(),
        key: this.getTitle(),
        title: this.getTitle()
      }), _react.default.createElement(_button.default, buttonProps));
    }
  }]);
  return CustomizeAction;
}(_Action2.default);

exports.default = CustomizeAction;
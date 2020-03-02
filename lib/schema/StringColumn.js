"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _react = _interopRequireDefault(require("react"));

var _Column2 = _interopRequireDefault(require("./Column"));

var StringColumn = function (_Column) {
  (0, _inherits2.default)(StringColumn, _Column);

  function StringColumn() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, StringColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(StringColumn)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilterDropDownContent", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys,
          confirm = _ref.confirm;
      return _react.default.createElement(_input.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
        value: selectedKeys[0],
        onChange: function onChange(e) {
          return setSelectedKeys(e.target.value ? [e.target.value] : []);
        },
        onPressEnter: confirm,
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(StringColumn, [{
    key: "getFormMultipleLine",
    value: function getFormMultipleLine() {
      return this.config.getIn(['form', 'multipleLine']);
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return (0, _isUndefined2.default)(v) ? v : (0, _toString2.default)(v);
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      if (this.canSelectMutipleInForm()) {
        return (0, _map2.default)(v, function (item) {
          return item || '';
        });
      }

      return v || '';
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return true;
    }
  }, {
    key: "getFilterIcon",
    value: function getFilterIcon() {
      return 'search';
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var isEdit = _ref2.isEdit;

      if (this.canSelectMutipleInForm()) {
        return _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          mode: "tags",
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit
        })));
      }

      if (this.getFormMultipleLine()) {
        return _react.default.createElement(_input.default.TextArea, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit
        })));
      }

      return _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit
      })));
    }
  }]);
  return StringColumn;
}(_Column2.default);

exports.default = StringColumn;
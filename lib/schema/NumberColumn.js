"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _react = _interopRequireDefault(require("react"));

var _Column2 = _interopRequireDefault(require("./Column"));

var formatNumber = function formatNumber(n) {
  return n && !(0, _isNaN2.default)((0, _toNumber2.default)(n)) ? (0, _toNumber2.default)(n) : n;
};

var NumberColumn = function (_Column) {
  (0, _inherits2.default)(NumberColumn, _Column);

  function NumberColumn() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NumberColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NumberColumn)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilterDropDownContent", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys,
          confirm = _ref.confirm;

      if (_this.canFilterRangeInTable()) {
        return _react.default.createElement("div", {
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
          value: (0, _get2.default)(selectedKeys, '[0][0]'),
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[0]', value)]);
          }
        })), ' ~ ', _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
          value: (0, _get2.default)(selectedKeys, '[0][1]'),
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[1]', value)]);
          }
        })));
      }

      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
        value: selectedKeys[0],
        onChange: function onChange(value) {
          return setSelectedKeys([value]);
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

  (0, _createClass2.default)(NumberColumn, [{
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return formatNumber(v);
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      if (this.canSelectMutipleInForm()) {
        return (0, _map2.default)(v, function (item) {
          return formatNumber(item);
        });
      }

      return formatNumber(v);
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return true;
    }
  }, {
    key: "getFilterIcon",
    value: function getFilterIcon() {
      return this.canFilterRangeInTable() ? 'filter' : 'search';
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var user = _ref2.user,
          record = _ref2.record,
          value = _ref2.value,
          values = _ref2.values,
          isEdit = _ref2.isEdit,
          _ref2$formComponentPr = _ref2.formComponentProps,
          formComponentProps = _ref2$formComponentPr === void 0 ? {} : _ref2$formComponentPr;

      if (this.canSelectMutipleInForm()) {
        return _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          mode: "tags",
          placeholder: this.getFormPlaceholder()
        }, this.getFormComponentProps({
          isEdit: isEdit
        }), formComponentProps));
      }

      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }]);
  return NumberColumn;
}(_Column2.default);

exports.default = NumberColumn;
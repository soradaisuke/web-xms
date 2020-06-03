"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _TimePickerWithConfirm = _interopRequireDefault(require("../components/TimePickerWithConfirm"));

var _NumberColumn2 = _interopRequireDefault(require("./NumberColumn"));

var TimeColumn = function (_NumberColumn) {
  (0, _inherits2.default)(TimeColumn, _NumberColumn);

  function TimeColumn() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TimeColumn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(TimeColumn)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderFilterDropDownContent", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys;

      if (_this.canFilterRangeInTable()) {
        return _react.default.createElement("div", {
          style: {
            marginBottom: 8,
            display: 'block'
          }
        }, _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
          format: _this.getInTableFormat(),
          value: !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][0]')) ? (0, _moment.default)().startOf('day').add((0, _get2.default)(selectedKeys, '[0][0]'), 's') : null,
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[0]', value.diff((0, _moment.default)().startOf('day')) / 1000)]);
          }
        })), ' ~ ', _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
          format: _this.getInTableFormat(),
          value: !(0, _isUndefined2.default)((0, _get2.default)(selectedKeys, '[0][1]')) ? (0, _moment.default)().startOf('day').add((0, _get2.default)(selectedKeys, '[0][1]'), 's') : null,
          onChange: function onChange(value) {
            var newValue = [];

            try {
              newValue = (0, _toConsumableArray2.default)(selectedKeys[0]);
            } catch (e) {
              newValue = [];
            }

            setSelectedKeys([(0, _set2.default)(newValue, '[1]', value.diff((0, _moment.default)().startOf('day')) / 1000)]);
          }
        })));
      }

      return _react.default.createElement(_TimePickerWithConfirm.default, (0, _extends2.default)({}, _this.getTableFilterComponentProps(), {
        format: _this.getInTableFormat(),
        value: selectedKeys.length > 0 ? (0, _moment.default)().startOf('day').add(selectedKeys[0], 's') : null,
        onChange: function onChange(time) {
          return setSelectedKeys([time.diff((0, _moment.default)().startOf('day')) / 1000]);
        },
        style: {
          width: 188,
          marginBottom: 8,
          display: 'block'
        }
      }));
    });
    return _this;
  }

  (0, _createClass2.default)(TimeColumn, [{
    key: "getDefaultInTableFormat",
    value: function getDefaultInTableFormat() {
      return 'HH:mm:ss';
    }
  }, {
    key: "getInTableFormat",
    value: function getInTableFormat() {
      return this.config.getIn(['table', 'format'], this.getDefaultInTableFormat());
    }
  }, {
    key: "formatFormFieldValue",
    value: function formatFormFieldValue(v) {
      return (0, _moment.default)().startOf('day').add(v, 's');
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref2) {
      var value = _ref2.value;
      return (0, _isNumber2.default)(value) ? (0, _moment.default)().startOf('day').add(value, 's').format(this.getInTableFormat()) : '';
    }
  }, {
    key: "renderInDescriptionDefault",
    value: function renderInDescriptionDefault(_ref3) {
      var value = _ref3.value;
      return this.renderInTableValueDefault({
        value: value
      });
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref4) {
      var user = _ref4.user,
          record = _ref4.record,
          value = _ref4.value,
          values = _ref4.values,
          isEdit = _ref4.isEdit,
          _ref4$formComponentPr = _ref4.formComponentProps,
          formComponentProps = _ref4$formComponentPr === void 0 ? {} : _ref4$formComponentPr;
      return _react.default.createElement(_timePicker.default, (0, _extends2.default)({}, this.getFormComponentProps({
        isEdit: isEdit,
        user: user,
        record: record,
        value: value,
        values: values
      }), formComponentProps));
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      return v.diff((0, _moment.default)().startOf('day')) / 1000;
    }
  }]);
  return TimeColumn;
}(_NumberColumn2.default);

exports.default = TimeColumn;
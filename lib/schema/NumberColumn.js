"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

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

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _react = _interopRequireDefault(require("react"));

var _Column2 = _interopRequireDefault(require("./Column"));

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
        }, _react.default.createElement(_inputNumber.default, {
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
        }), ' ~ ', _react.default.createElement(_inputNumber.default, {
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
        }));
      }

      return _react.default.createElement(_inputNumber.default, {
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
      });
    });
    return _this;
  }

  (0, _createClass2.default)(NumberColumn, [{
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return !(0, _isNaN2.default)((0, _toNumber2.default)(v)) ? (0, _toNumber2.default)(v) : v;
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return true;
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem(_ref2) {
      var isEdit = _ref2.isEdit;
      return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: this.getFormPlaceholder()
      }, this.getFormComponentProps({
        isEdit: isEdit
      })));
    }
  }]);
  return NumberColumn;
}(_Column2.default);

exports.default = NumberColumn;
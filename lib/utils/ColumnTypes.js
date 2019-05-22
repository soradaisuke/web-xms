"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/lib/time-picker"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isNaN2 = _interopRequireDefault(require("lodash/isNaN"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _DatePickerWithPresets = _interopRequireDefault(require("../components/DatePickerWithPresets"));

var _Select = _interopRequireDefault(require("../components/FormItems/Select"));

var _UploadImage = _interopRequireDefault(require("../components/FormItems/UploadImage"));

var _CommonArray = _interopRequireDefault(require("../components/FormItems/CommonArray"));

var _InlineAudioPlayer = _interopRequireDefault(require("../components/Common/InlineAudioPlayer"));

var TYPES = {
  NUMBER: 'number',
  STRING: 'string',
  DATE: 'date',
  DATETIME: 'datetime',
  BOOL: 'bool',
  ORDER: 'order',
  IMAGE: 'image',
  URL: 'url',
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum',
  TIME: 'time',
  AUDIO: 'audio'
};

var generateTreeData = function generateTreeData(filters) {
  if (!(0, _isArray2.default)(filters)) return null;
  return (0, _map2.default)(filters, function (_ref) {
    var value = _ref.value,
        text = _ref.text,
        children = _ref.children,
        item = (0, _objectWithoutProperties2.default)(_ref, ["value", "text", "children"]);
    return (0, _objectSpread2.default)({
      value: value,
      key: value,
      title: text,
      children: generateTreeData(children)
    }, item);
  });
};

var BaseColumnType = function () {
  function BaseColumnType() {
    (0, _classCallCheck2.default)(this, BaseColumnType);
    (0, _defineProperty2.default)(this, "renderValue", function (v) {
      return v;
    });
  }

  (0, _createClass2.default)(BaseColumnType, [{
    key: "canCheckWhiteSpace",
    value: function canCheckWhiteSpace() {
      return false;
    }
  }, {
    key: "canInlineEdit",
    value: function canInlineEdit() {
      return false;
    }
  }, {
    key: "canShowInForm",
    value: function canShowInForm() {
      return false;
    }
  }, {
    key: "canUseColumnFilter",
    value: function canUseColumnFilter() {
      return true;
    }
  }, {
    key: "formatFormValue",
    value: function formatFormValue(v) {
      return v;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      return v;
    }
  }, {
    key: "getFormExtraConfig",
    value: function getFormExtraConfig() {
      return {};
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return '';
    }
  }, {
    key: "getFormRules",
    value: function getFormRules() {
      return [];
    }
  }, {
    key: "getName",
    value: function getName() {
      return '';
    }
  }, {
    key: "mustHasFilters",
    value: function mustHasFilters() {
      return false;
    }
  }, {
    key: "mustHasMapKey",
    value: function mustHasMapKey() {
      return false;
    }
  }, {
    key: "renderFilterItem",
    value: function renderFilterItem() {
      return null;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem() {
      return null;
    }
  }]);
  return BaseColumnType;
}();

var PrimitiveColumnType = function (_BaseColumnType) {
  (0, _inherits2.default)(PrimitiveColumnType, _BaseColumnType);

  function PrimitiveColumnType(primitiveType) {
    var _this;

    (0, _classCallCheck2.default)(this, PrimitiveColumnType);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PrimitiveColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderValue", function (v) {
      switch (_this.primitiveType) {
        case TYPES.BOOL:
          return v ? '是' : '否';

        case TYPES.DATE:
          return v && (0, _moment.default)(v).isValid() ? (0, _moment.default)(v).format('YYYY-MM-DD') : '';

        case TYPES.DATETIME:
          return v && (0, _moment.default)(v).isValid() ? (0, _moment.default)(v).format('YYYY-MM-DD HH:mm:ss') : '';

        default:
          return v;
      }
    });
    _this.primitiveType = primitiveType;
    return _this;
  }

  (0, _createClass2.default)(PrimitiveColumnType, [{
    key: "canCheckWhiteSpace",
    value: function canCheckWhiteSpace() {
      return this.primitiveType === TYPES.STRING;
    }
  }, {
    key: "canInlineEdit",
    value: function canInlineEdit() {
      return this.primitiveType === TYPES.STRING;
    }
  }, {
    key: "canShowInForm",
    value: function canShowInForm() {
      switch (this.primitiveType) {
        case TYPES.NUMBER:
        case TYPES.STRING:
          return true;

        default:
          return (0, _get2.default)((0, _getPrototypeOf2.default)(PrimitiveColumnType.prototype), "canShowInForm", this).call(this);
      }
    }
  }, {
    key: "renderFilterItem",
    value: function renderFilterItem(_ref2) {
      var rangeFilter = _ref2.rangeFilter,
          _onChange = _ref2.onChange,
          _ref2$value = _ref2.value,
          value = _ref2$value === void 0 ? [] : _ref2$value;

      if (this.primitiveType === TYPES.NUMBER && rangeFilter) {
        return _react.default.createElement("div", null, _react.default.createElement(_inputNumber.default, {
          value: value[0],
          onChange: function onChange(v) {
            return _onChange([v, value[1]]);
          }
        }), "~", _react.default.createElement(_inputNumber.default, {
          value: value[1],
          onChange: function onChange(v) {
            return _onChange([value[0], v]);
          }
        }));
      }

      if (this.primitiveType === TYPES.NUMBER) {
        return _react.default.createElement(_inputNumber.default, {
          value: value,
          onChange: function onChange(v) {
            return _onChange(v);
          }
        });
      }

      return null;
    }
  }, {
    key: "getFormRules",
    value: function getFormRules() {
      switch (this.primitiveType) {
        case TYPES.NUMBER:
          return [{
            type: 'number',
            message: '格式不正确，要求为数字'
          }];

        case TYPES.STRING:
          return [{
            type: 'string',
            message: '格式不正确，要求为字符串'
          }];

        default:
          return (0, _get2.default)((0, _getPrototypeOf2.default)(PrimitiveColumnType.prototype), "getFormRules", this).call(this);
      }
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.primitiveType;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      switch (this.primitiveType) {
        case TYPES.STRING:
          return (0, _isUndefined2.default)(v) ? v : (0, _toString2.default)(v);

        case TYPES.NUMBER:
          return (0, _isArray2.default)(v) ? v.map(function (item) {
            return !(0, _isNaN2.default)((0, _toNumber2.default)(item)) ? (0, _toNumber2.default)(item) : item;
          }) : !(0, _isNaN2.default)((0, _toNumber2.default)(v)) ? (0, _toNumber2.default)(v) : v;

        case TYPES.BOOL:
          return v && v !== 'false';

        case TYPES.DATE:
          return v && (0, _isFunction2.default)(v.format) ? v.format('YYYY-MM-DD') : v;

        case TYPES.DATETIME:
          return v && (0, _isFunction2.default)(v.toISOString) ? v.toISOString() : v;

        default:
          return (0, _get2.default)((0, _getPrototypeOf2.default)(PrimitiveColumnType.prototype), "formatSubmitValue", this).call(this, v);
      }
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref3) {
      var placeholder = _ref3.placeholder,
          title = _ref3.title,
          _ref3$formItemProps = _ref3.formItemProps,
          formItemProps = _ref3$formItemProps === void 0 ? {} : _ref3$formItemProps;

      switch (this.primitiveType) {
        case TYPES.NUMBER:
          return _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          }, formItemProps));

        case TYPES.STRING:
          return _react.default.createElement(_input.default, (0, _extends2.default)({
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          }, formItemProps));

        default:
          return (0, _get2.default)((0, _getPrototypeOf2.default)(PrimitiveColumnType.prototype), "renderFormItem", this).call(this);
      }
    }
  }]);
  return PrimitiveColumnType;
}(BaseColumnType);

var number = new PrimitiveColumnType(TYPES.NUMBER);
var string = new PrimitiveColumnType(TYPES.STRING);
var bool = new PrimitiveColumnType(TYPES.BOOL);

var BaseDateColumnType = function (_BaseColumnType2) {
  (0, _inherits2.default)(BaseDateColumnType, _BaseColumnType2);

  function BaseDateColumnType() {
    var _this2;

    (0, _classCallCheck2.default)(this, BaseDateColumnType);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseDateColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "renderValue", function (v) {
      return v && (0, _moment.default)(v).isValid() ? (0, _moment.default)(v).format(_this2.getFormat()) : '';
    });
    _this2.innerColumnType = string;
    return _this2;
  }

  (0, _createClass2.default)(BaseDateColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return null;
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.DATE;
    }
  }, {
    key: "formatFormValue",
    value: function formatFormValue(v) {
      return v ? (0, _moment.default)(v) : null;
    }
  }, {
    key: "renderFilterItem",
    value: function renderFilterItem(_ref4) {
      var _this3 = this;

      var value = _ref4.value,
          _onChange2 = _ref4.onChange,
          rangeFilter = _ref4.rangeFilter,
          filters = _ref4.filters,
          mapKey = _ref4.mapKey;
      var ranges = {};

      if (rangeFilter && filters && filters.length) {
        filters.map(function (_ref5) {
          var text = _ref5.text,
              v = _ref5.value;

          if (!(0, _moment.default)(v[0]).isValid() || !(0, _moment.default)(v[1]).isValid()) {
            throw new Error("mapKey: ".concat(mapKey, ": \u5B58\u5728RangePicker\u7684filter\u7684value\u662F\u65E0\u6548\u7684moment"));
          }

          ranges[text] = [(0, _moment.default)(v[0]), (0, _moment.default)(v[1])];
          return null;
        });
      }

      if (rangeFilter) {
        var newValue = value || [];
        return _react.default.createElement(_datePicker.default.RangePicker, {
          key: mapKey,
          showTime: this.showTime(),
          format: this.getFormat(),
          value: [newValue[0] && (0, _moment.default)(newValue[0]).isValid() ? (0, _moment.default)(newValue[0]) : null, newValue[1] && (0, _moment.default)(newValue[1]).isValid() ? (0, _moment.default)(newValue[1]) : null],
          ranges: ranges,
          onChange: function onChange(newDate) {
            return _onChange2([_this3.formatSubmitValue(newDate[0]), _this3.formatSubmitValue(newDate[1])]);
          }
        });
      }

      return _react.default.createElement(_DatePickerWithPresets.default, {
        key: mapKey,
        value: value && (0, _moment.default)(value).isValid() ? (0, _moment.default)(value) : null,
        showTime: this.showTime(),
        format: this.getFormat(),
        presets: filters,
        onChange: function onChange(newDate) {
          return _onChange2(_this3.formatSubmitValue(newDate));
        }
      });
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref6) {
      var _ref6$formItemProps = _ref6.formItemProps,
          formItemProps = _ref6$formItemProps === void 0 ? {} : _ref6$formItemProps;
      return _react.default.createElement(_datePicker.default, (0, _extends2.default)({
        showTime: this.showTime()
      }, formItemProps));
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return false;
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return 'YYYY-MM-DD';
    }
  }, {
    key: "canUseColumnFilter",
    value: function canUseColumnFilter() {
      return false;
    }
  }]);
  return BaseDateColumnType;
}(BaseColumnType);

var DateColumnType = function (_BaseDateColumnType) {
  (0, _inherits2.default)(DateColumnType, _BaseDateColumnType);

  function DateColumnType() {
    (0, _classCallCheck2.default)(this, DateColumnType);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateColumnType).apply(this, arguments));
  }

  (0, _createClass2.default)(DateColumnType, [{
    key: "getName",
    value: function getName() {
      return TYPES.DATE;
    }
  }, {
    key: "formatFormValue",
    value: function formatFormValue(v) {
      return v ? (0, _moment.default)(v) : null;
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return false;
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return 'YYYY-MM-DD';
    }
  }]);
  return DateColumnType;
}(BaseDateColumnType);

var DateTimeColumnType = function (_BaseDateColumnType2) {
  (0, _inherits2.default)(DateTimeColumnType, _BaseDateColumnType2);

  function DateTimeColumnType() {
    (0, _classCallCheck2.default)(this, DateTimeColumnType);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateTimeColumnType).apply(this, arguments));
  }

  (0, _createClass2.default)(DateTimeColumnType, [{
    key: "getName",
    value: function getName() {
      return TYPES.DATETIME;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      return v && (0, _isFunction2.default)(v.toISOString) ? v.toISOString() : v;
    }
  }, {
    key: "showTime",
    value: function showTime() {
      return true;
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return 'YYYY-MM-DD HH:mm:ss';
    }
  }]);
  return DateTimeColumnType;
}(BaseDateColumnType);

var TimeColumnType = function (_BaseColumnType3) {
  (0, _inherits2.default)(TimeColumnType, _BaseColumnType3);

  function TimeColumnType() {
    var _this4;

    (0, _classCallCheck2.default)(this, TimeColumnType);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TimeColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this4), "renderValue", function (v) {
      return (0, _isNumber2.default)(v) ? (0, _moment.default)().startOf('day').add(v, 's').format(_this4.getFormat()) : '';
    });
    _this4.innerColumnType = string;
    return _this4;
  }

  (0, _createClass2.default)(TimeColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return null;
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.TIME;
    }
  }, {
    key: "formatFormValue",
    value: function formatFormValue(v) {
      return (0, _isNumber2.default)(v) ? (0, _moment.default)().startOf('day').add(v, 's') : null;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      return v ? v.diff((0, _moment.default)(v).startOf('day'), 's') : 0;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref7) {
      var _ref7$formItemProps = _ref7.formItemProps,
          formItemProps = _ref7$formItemProps === void 0 ? {} : _ref7$formItemProps;
      return _react.default.createElement(_timePicker.default, (0, _extends2.default)({
        defaultOpenValue: (0, _moment.default)().startOf('day')
      }, formItemProps));
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return 'HH:mm:ss';
    }
  }, {
    key: "canUseColumnFilter",
    value: function canUseColumnFilter() {
      return false;
    }
  }]);
  return TimeColumnType;
}(BaseColumnType);

var AudioColumnType = function (_BaseColumnType4) {
  (0, _inherits2.default)(AudioColumnType, _BaseColumnType4);

  function AudioColumnType() {
    var _this5;

    (0, _classCallCheck2.default)(this, AudioColumnType);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AudioColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this5), "renderValue", function (v) {
      return v ? _react.default.createElement(_InlineAudioPlayer.default, {
        url: v
      }) : '';
    });
    _this5.innerColumnType = string;
    return _this5;
  }

  (0, _createClass2.default)(AudioColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return false;
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return null;
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.AUDIO;
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return '';
    }
  }, {
    key: "canUseColumnFilter",
    value: function canUseColumnFilter() {
      return false;
    }
  }]);
  return AudioColumnType;
}(BaseColumnType);

var OrderColumnType = function (_BaseColumnType5) {
  (0, _inherits2.default)(OrderColumnType, _BaseColumnType5);

  function OrderColumnType() {
    var _this6;

    (0, _classCallCheck2.default)(this, OrderColumnType);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OrderColumnType).call(this));
    _this6.innerColumnType = number;
    return _this6;
  }

  (0, _createClass2.default)(OrderColumnType, [{
    key: "getName",
    value: function getName() {
      return TYPES.ORDER;
    }
  }, {
    key: "mustHasMapKey",
    value: function mustHasMapKey() {
      return true;
    }
  }]);
  return OrderColumnType;
}(BaseColumnType);

var ImageColumnType = function (_BaseColumnType6) {
  (0, _inherits2.default)(ImageColumnType, _BaseColumnType6);

  function ImageColumnType() {
    var _this7;

    (0, _classCallCheck2.default)(this, ImageColumnType);
    _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageColumnType).call(this));
    _this7.innerColumnType = string;
    return _this7;
  }

  (0, _createClass2.default)(ImageColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "getFormExtraConfig",
    value: function getFormExtraConfig() {
      return {
        valuePropName: 'url'
      };
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.IMAGE;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          user = _ref8.user,
          tip = _ref8.tip,
          _ref8$bucket = _ref8.bucket,
          bucket = _ref8$bucket === void 0 ? '' : _ref8$bucket,
          _ref8$formItemProps = _ref8.formItemProps,
          formItemProps = _ref8$formItemProps === void 0 ? {} : _ref8$formItemProps;

      return _react.default.createElement(_UploadImage.default, (0, _extends2.default)({
        ssoToken: user ? user.get('sso_token') : '',
        title: tip,
        bucket: bucket
      }, formItemProps));
    }
  }]);
  return ImageColumnType;
}(BaseColumnType);

var EnumColumnType = function (_BaseColumnType7) {
  (0, _inherits2.default)(EnumColumnType, _BaseColumnType7);

  function EnumColumnType(innerColumnType) {
    var _this8;

    (0, _classCallCheck2.default)(this, EnumColumnType);
    _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnumColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this8), "renderValue", function (values) {
      return (0, _isArray2.default)(values) ? (0, _join2.default)((0, _map2.default)(values, function (v) {
        return _this8.innerColumnType.renderValue(v);
      }), ',') : values;
    });
    _this8.innerColumnType = innerColumnType || string;
    return _this8;
  }

  (0, _createClass2.default)(EnumColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      var _this9 = this;

      if ((0, _isArray2.default)(v)) {
        return v.map(function (value) {
          return _this9.innerColumnType.formatSubmitValue(value);
        });
      }

      return this.innerColumnType.formatSubmitValue(v);
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.ENUM;
    }
  }, {
    key: "mustHasFilters",
    value: function mustHasFilters() {
      return true;
    }
  }, {
    key: "renderFilterItem",
    value: function renderFilterItem(_ref9) {
      var filters = _ref9.filters,
          value = _ref9.value,
          onChange = _ref9.onChange,
          filterMultiple = _ref9.filterMultiple,
          otherProps = (0, _objectWithoutProperties2.default)(_ref9, ["filters", "value", "onChange", "filterMultiple"]);
      return _react.default.createElement(_Select.default, (0, _extends2.default)({
        allowClear: true,
        treeData: generateTreeData((0, _isArray2.default)(filters) ? filters : []),
        treeCheckable: filterMultiple,
        style: {
          width: '100%'
        },
        value: value,
        onChange: onChange
      }, otherProps));
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref10) {
      var filters = _ref10.filters,
          _ref10$selectProps = _ref10.selectProps,
          selectProps = _ref10$selectProps === void 0 ? {} : _ref10$selectProps,
          formFieldValues = _ref10.formFieldValues;
      return _react.default.createElement(_Select.default, (0, _extends2.default)({
        treeData: generateTreeData(filters),
        formFieldValues: formFieldValues
      }, selectProps));
    }
  }]);
  return EnumColumnType;
}(BaseColumnType);

var UrlColumnType = function (_BaseColumnType8) {
  (0, _inherits2.default)(UrlColumnType, _BaseColumnType8);

  function UrlColumnType() {
    var _this10;

    (0, _classCallCheck2.default)(this, UrlColumnType);
    _this10 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UrlColumnType).call(this));
    _this10.innerColumnType = string;
    return _this10;
  }

  (0, _createClass2.default)(UrlColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "getFormRules",
    value: function getFormRules() {
      return [{
        type: 'url',
        message: '格式不正确，要求为网络地址'
      }];
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.URL;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref11) {
      var placeholder = _ref11.placeholder,
          title = _ref11.title,
          _ref11$formItemProps = _ref11.formItemProps,
          formItemProps = _ref11$formItemProps === void 0 ? {} : _ref11$formItemProps;
      return _react.default.createElement(_input.default, (0, _extends2.default)({
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
      }, formItemProps));
    }
  }]);
  return UrlColumnType;
}(BaseColumnType);

var ArrayColumnType = function (_BaseColumnType9) {
  (0, _inherits2.default)(ArrayColumnType, _BaseColumnType9);

  function ArrayColumnType(innerColumnType) {
    var _this11;

    (0, _classCallCheck2.default)(this, ArrayColumnType);
    _this11 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ArrayColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this11), "renderValue", function (values) {
      return values ? (0, _join2.default)((0, _map2.default)(values, function (v) {
        return _this11.innerColumnType.renderValue(v);
      }), ',') : '';
    });
    _this11.innerColumnType = innerColumnType;
    return _this11;
  }

  (0, _createClass2.default)(ArrayColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return [];
    }
  }, {
    key: "getName",
    value: function getName() {
      return TYPES.ARRAY;
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref12) {
      var tip = _ref12.tip,
          max = _ref12.max,
          placeholder = _ref12.placeholder,
          enableAdd = _ref12.enableAdd,
          arrayGenerateValue = _ref12.arrayGenerateValue,
          arrayRenderValue = _ref12.arrayRenderValue,
          formItemProps = _ref12.formItemProps;
      return _react.default.createElement(_CommonArray.default, {
        title: tip,
        max: max,
        placeholder: placeholder,
        enableAdd: enableAdd,
        generateValue: arrayGenerateValue,
        renderValue: arrayRenderValue,
        formItemProps: formItemProps
      });
    }
  }]);
  return ArrayColumnType;
}(BaseColumnType);

var ObjectColumnType = function (_BaseColumnType10) {
  (0, _inherits2.default)(ObjectColumnType, _BaseColumnType10);

  function ObjectColumnType(innerColumnType) {
    var _this12;

    (0, _classCallCheck2.default)(this, ObjectColumnType);
    _this12 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this12), "renderValue", function (values) {
      return values ? (0, _join2.default)((0, _map2.default)(values, function (v) {
        return _this12.innerColumnType.renderValue(v);
      }), ',') : '';
    });
    _this12.innerColumnType = innerColumnType;
    return _this12;
  }

  (0, _createClass2.default)(ObjectColumnType, [{
    key: "getName",
    value: function getName() {
      return TYPES.OBJECT;
    }
  }]);
  return ObjectColumnType;
}(BaseColumnType);

var _default = {
  number: number,
  string: string,
  bool: bool,
  date: new DateColumnType(),
  datetime: new DateTimeColumnType(),
  time: new TimeColumnType(),
  order: new OrderColumnType(),
  image: new ImageColumnType(),
  url: new UrlColumnType(),
  audio: new AudioColumnType(),
  enumOf: function enumOf(innerColumnType) {
    return new EnumColumnType(innerColumnType);
  },
  arrayOf: function arrayOf(innerColumnType) {
    return new ArrayColumnType(innerColumnType);
  },
  objectOf: function objectOf(innerColumnType) {
    return new ObjectColumnType(innerColumnType);
  }
};
exports.default = _default;
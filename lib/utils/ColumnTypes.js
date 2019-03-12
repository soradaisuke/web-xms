"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/lib/date-picker"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _toString2 = _interopRequireDefault(require("lodash/toString"));

var _toNumber2 = _interopRequireDefault(require("lodash/toNumber"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _Select = _interopRequireDefault(require("../components/FormItems/Select"));

var _UploadImage = _interopRequireDefault(require("../components/FormItems/UploadImage"));

var _CommonArray = _interopRequireDefault(require("../components/FormItems/CommonArray"));

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
  ENUM: 'enum'
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
    key: "canUseColumnFliter",
    value: function canUseColumnFliter() {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "renderValue", function (v) {
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
          return (0, _toString2.default)(v);

        case TYPES.NUMBER:
          return (0, _toNumber2.default)(v);

        case TYPES.BOOL:
          return v && v !== 'false';

        case TYPES.DATE:
          return v.format('YYYY-MM-DD');

        case TYPES.DATETIME:
          return v.toISOString();

        default:
          return (0, _get2.default)((0, _getPrototypeOf2.default)(PrimitiveColumnType.prototype), "formatSubmitValue", this).call(this, v);
      }
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem(_ref) {
      var placeholder = _ref.placeholder,
          title = _ref.title;

      switch (this.primitiveType) {
        case TYPES.NUMBER:
          return _react.default.createElement(_inputNumber.default, {
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          });

        case TYPES.STRING:
          return _react.default.createElement(_input.default, {
            placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
          });

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

var DateColumnType = function (_BaseColumnType2) {
  (0, _inherits2.default)(DateColumnType, _BaseColumnType2);

  function DateColumnType() {
    var _this2;

    (0, _classCallCheck2.default)(this, DateColumnType);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this2)), "renderValue", function (v) {
      return v && (0, _moment.default)(v).isValid() ? (0, _moment.default)(v).format(_this2.getFormat()) : '';
    });
    _this2.innerColumnType = string;
    return _this2;
  }

  (0, _createClass2.default)(DateColumnType, [{
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
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      return v.format(this.getFormat());
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem() {
      return _react.default.createElement(_datePicker.default, {
        showTime: this.showTime()
      });
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
    key: "canUseColumnFliter",
    value: function canUseColumnFliter() {
      return false;
    }
  }]);
  return DateColumnType;
}(BaseColumnType);

var DateTimeColumnType = function (_BaseColumnType3) {
  (0, _inherits2.default)(DateTimeColumnType, _BaseColumnType3);

  function DateTimeColumnType() {
    var _this3;

    (0, _classCallCheck2.default)(this, DateTimeColumnType);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DateTimeColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "renderValue", function (v) {
      return v && (0, _moment.default)(v).isValid() ? (0, _moment.default)(v).format(_this3.getFormat()) : '';
    });
    _this3.innerColumnType = string;
    return _this3;
  }

  (0, _createClass2.default)(DateTimeColumnType, [{
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
      return TYPES.DATETIME;
    }
  }, {
    key: "formatFormValue",
    value: function formatFormValue(v) {
      return v ? (0, _moment.default)(v) : null;
    }
  }, {
    key: "formatSubmitValue",
    value: function formatSubmitValue(v) {
      return v.toISOString();
    }
  }, {
    key: "renderFormItem",
    value: function renderFormItem() {
      return _react.default.createElement(_datePicker.default, {
        showTime: this.showTime()
      });
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
  }, {
    key: "canUseColumnFliter",
    value: function canUseColumnFliter() {
      return false;
    }
  }]);
  return DateTimeColumnType;
}(BaseColumnType);

var OrderColumnType = function (_BaseColumnType4) {
  (0, _inherits2.default)(OrderColumnType, _BaseColumnType4);

  function OrderColumnType() {
    var _this4;

    (0, _classCallCheck2.default)(this, OrderColumnType);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(OrderColumnType).call(this));
    _this4.innerColumnType = number;
    return _this4;
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

var ImageColumnType = function (_BaseColumnType5) {
  (0, _inherits2.default)(ImageColumnType, _BaseColumnType5);

  function ImageColumnType() {
    var _this5;

    (0, _classCallCheck2.default)(this, ImageColumnType);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImageColumnType).call(this));
    _this5.innerColumnType = string;
    return _this5;
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
    value: function renderFormItem(_ref2) {
      var user = _ref2.user,
          tip = _ref2.tip;
      return _react.default.createElement(_UploadImage.default, {
        ssoToken: user ? user.get('sso_token') : '',
        title: tip
      });
    }
  }]);
  return ImageColumnType;
}(BaseColumnType);

var EnumColumnType = function (_BaseColumnType6) {
  (0, _inherits2.default)(EnumColumnType, _BaseColumnType6);

  function EnumColumnType(innerColumnType) {
    var _this6;

    (0, _classCallCheck2.default)(this, EnumColumnType);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EnumColumnType).call(this));
    _this6.innerColumnType = innerColumnType || string;
    return _this6;
  }

  (0, _createClass2.default)(EnumColumnType, [{
    key: "canShowInForm",
    value: function canShowInForm() {
      return true;
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
    key: "renderFormItem",
    value: function renderFormItem(_ref3) {
      var filters = _ref3.filters,
          _ref3$selectProps = _ref3.selectProps,
          selectProps = _ref3$selectProps === void 0 ? {} : _ref3$selectProps,
          formFieldValues = _ref3.formFieldValues;
      return _react.default.createElement(_Select.default, (0, _extends2.default)({
        options: (0, _map2.default)(filters, function (item) {
          return {
            key: item.value,
            children: item.text
          };
        }),
        formFieldValues: formFieldValues
      }, selectProps));
    }
  }]);
  return EnumColumnType;
}(BaseColumnType);

var UrlColumnType = function (_BaseColumnType7) {
  (0, _inherits2.default)(UrlColumnType, _BaseColumnType7);

  function UrlColumnType() {
    var _this7;

    (0, _classCallCheck2.default)(this, UrlColumnType);
    _this7 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(UrlColumnType).call(this));
    _this7.innerColumnType = string;
    return _this7;
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
    value: function renderFormItem(_ref4) {
      var placeholder = _ref4.placeholder,
          title = _ref4.title;
      return _react.default.createElement(_input.default, {
        placeholder: placeholder || "\u8BF7\u8F93\u5165".concat(title)
      });
    }
  }]);
  return UrlColumnType;
}(BaseColumnType);

var ArrayColumnType = function (_BaseColumnType8) {
  (0, _inherits2.default)(ArrayColumnType, _BaseColumnType8);

  function ArrayColumnType(innerColumnType) {
    var _this8;

    (0, _classCallCheck2.default)(this, ArrayColumnType);
    _this8 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ArrayColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this8)), "renderValue", function (values) {
      return values ? (0, _join2.default)((0, _map2.default)(values, function (v) {
        return _this8.innerColumnType.renderValue(v);
      }), ',') : '';
    });
    _this8.innerColumnType = innerColumnType;
    return _this8;
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
    value: function renderFormItem(_ref5) {
      var tip = _ref5.tip,
          max = _ref5.max,
          placeholder = _ref5.placeholder,
          enableAdd = _ref5.enableAdd,
          arrayGenerateValue = _ref5.arrayGenerateValue,
          arrayRenderValue = _ref5.arrayRenderValue;
      return _react.default.createElement(_CommonArray.default, {
        title: tip,
        max: max,
        placeholder: placeholder,
        enableAdd: enableAdd,
        generateValue: arrayGenerateValue,
        renderValue: arrayRenderValue
      });
    }
  }]);
  return ArrayColumnType;
}(BaseColumnType);

var ObjectColumnType = function (_BaseColumnType9) {
  (0, _inherits2.default)(ObjectColumnType, _BaseColumnType9);

  function ObjectColumnType(innerColumnType) {
    var _this9;

    (0, _classCallCheck2.default)(this, ObjectColumnType);
    _this9 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectColumnType).call(this));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this9)), "renderValue", function (values) {
      return values ? (0, _join2.default)((0, _map2.default)(values, function (v) {
        return _this9.innerColumnType.renderValue(v);
      }), ',') : '';
    });
    _this9.innerColumnType = innerColumnType;
    return _this9;
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
  order: new OrderColumnType(),
  image: new ImageColumnType(),
  url: new UrlColumnType(),
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
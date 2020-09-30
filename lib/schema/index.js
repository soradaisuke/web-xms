"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _NumberColumn = _interopRequireDefault(require("./NumberColumn"));

var _StringColumn = _interopRequireDefault(require("./StringColumn"));

var _BooleanColumn = _interopRequireDefault(require("./BooleanColumn"));

var _DateTimeColumn = _interopRequireDefault(require("./DateTimeColumn"));

var _DurationColumn = _interopRequireDefault(require("./DurationColumn"));

var _ImageColumn = _interopRequireDefault(require("./ImageColumn"));

var _UrlColumn = _interopRequireDefault(require("./UrlColumn"));

var _AudioColumn = _interopRequireDefault(require("./AudioColumn"));

var _ObjectColumn = _interopRequireDefault(require("./ObjectColumn"));

var _FileColumn = _interopRequireDefault(require("./FileColumn"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _default = {
  Number: function Number(config) {
    return new _NumberColumn.default(config);
  },
  String: function String(config) {
    return new _StringColumn.default(config);
  },
  Boolean: function Boolean(config) {
    return new _BooleanColumn.default(config);
  },
  Date: function Date(_ref) {
    var form = _ref.form,
        config = (0, _objectWithoutProperties2.default)(_ref, ["form"]);
    console.warn('Column.Date is deprecated, please use Column.DateTime');
    return new _DateTimeColumn.default(_objectSpread(_objectSpread({}, config), {}, {
      format: 'YYYY-MM-DD',
      form: _objectSpread(_objectSpread({}, form !== null && form !== void 0 ? form : {}), {}, {
        formItemComponentProps: {
          picker: 'date'
        }
      })
    }));
  },
  Time: function Time(_ref2) {
    var form = _ref2.form,
        config = (0, _objectWithoutProperties2.default)(_ref2, ["form"]);
    console.warn('Column.Time is deprecated, please use Column.DateTime');
    return new _DateTimeColumn.default(_objectSpread(_objectSpread({}, config), {}, {
      format: 'HH:mm:ss',
      form: _objectSpread(_objectSpread({}, form !== null && form !== void 0 ? form : {}), {}, {
        formItemComponentProps: {
          picker: 'time'
        }
      })
    }));
  },
  Month: function Month(_ref3) {
    var form = _ref3.form,
        config = (0, _objectWithoutProperties2.default)(_ref3, ["form"]);
    console.warn('Column.Month is deprecated, please use Column.DateTime');
    return new _DateTimeColumn.default(_objectSpread(_objectSpread({}, config), {}, {
      format: 'YYYY-MM',
      form: _objectSpread(_objectSpread({}, form !== null && form !== void 0 ? form : {}), {}, {
        formItemComponentProps: {
          picker: 'month'
        }
      })
    }));
  },
  DateTime: function DateTime(config) {
    return new _DateTimeColumn.default(config);
  },
  Duration: function Duration(config) {
    return new _DurationColumn.default(config);
  },
  Image: function Image(config) {
    return new _ImageColumn.default(config);
  },
  Url: function Url(config) {
    return new _UrlColumn.default(config);
  },
  Audio: function Audio(config) {
    return new _AudioColumn.default(config);
  },
  Object: function Object(config) {
    return new _ObjectColumn.default(config);
  },
  File: function File(config) {
    return new _FileColumn.default(config);
  }
};
exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toNumber2 = _interopRequireDefault(require("lodash/fp/toNumber"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _UploadImage = _interopRequireDefault(require("./UploadImage"));

var _TreeSelect = _interopRequireDefault(require("../Filter/TreeSelect"));

var _Radio = _interopRequireDefault(require("../Filter/Radio"));

var _CheckBox = _interopRequireDefault(require("../Filter/CheckBox"));

var _DurationPicker = _interopRequireDefault(require("../Filter/DurationPicker"));

var _DatePicker = _interopRequireDefault(require("../Filter/DatePicker"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _UrlColumn = _interopRequireDefault(require("../../schema/UrlColumn"));

var _NumberColumn = _interopRequireDefault(require("../../schema/NumberColumn"));

var _StringColumn = _interopRequireDefault(require("../../schema/StringColumn"));

var _DurationColumn = _interopRequireDefault(require("../../schema/DurationColumn"));

var _DateTimeColumn = _interopRequireDefault(require("../../schema/DateTimeColumn"));

var _BooleanColumn = _interopRequireDefault(require("../../schema/BooleanColumn"));

var _ImageColumn = _interopRequireDefault(require("../../schema/ImageColumn"));

var _useUser = _interopRequireDefault(require("../../hooks/useUser"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function FormItem(_ref) {
  var column = _ref.column,
      record = _ref.record,
      extraFormItemComponentProps = _ref.formItemComponentProps,
      hideLabel = _ref.hideLabel;
  var user = (0, _useUser.default)();
  var disabled = (0, _react.useMemo)(function () {
    return column.isImmutableInForm({
      user: user,
      record: record
    });
  }, [column, user, record]);
  var formItemComponentProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread({}, column.getFormItemComponentProps()), extraFormItemComponentProps), {}, {
      disabled: disabled
    });
  }, [column, disabled, extraFormItemComponentProps]);
  var valuePropName = (0, _react.useMemo)(function () {
    if (column instanceof _BooleanColumn.default) {
      return 'checked';
    }

    if (column instanceof _ImageColumn.default) {
      return 'url';
    }

    return 'value';
  }, [column]);
  var rules = (0, _react.useMemo)(function () {
    var r = column.getFormItemRules();

    if (column instanceof _UrlColumn.default) {
      r = (0, _concat2.default)(r, [{
        type: 'url',
        message: '格式不正确，要求为网络地址'
      }]);
    }

    if (column.getFormRequired()) {
      r = (0, _concat2.default)(r, [{
        required: true
      }]);
    }

    return r;
  }, [column]);
  var normalize = (0, _react.useMemo)(function () {
    if (column instanceof _NumberColumn.default && column.isArray()) {
      return function (value) {
        return (0, _map2.default)(value, function (v) {
          return (0, _toNumber2.default)(v);
        });
      };
    }

    return function (value) {
      return value;
    };
  }, [column]);
  var commonFormItemProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({
      normalize: normalize,
      valuePropName: valuePropName
    }, column.getFormItemProps()), {}, {
      label: hideLabel ? '' : column.getFormItemLabel(),
      name: column.getFormItemName(),
      initialValue: (0, _get2.default)(record, column.getKey()) || column.getFormItemInitialValue(),
      rules: rules
    });
  }, [column, hideLabel, normalize, record, rules, valuePropName]);
  var formItemProps = (0, _react.useMemo)(function () {
    if (column.parentColumn || column.getFormItemAvailableWhen().length > 0) {
      return {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, curValues) {
          if (column.parentColumn && (0, _get2.default)(prevValues, column.parentColumn.getFormKey()) !== (0, _get2.default)(curValues, column.parentColumn.getFormKey())) {
            return true;
          }

          if (column.getFormItemAvailableWhen().length > 0) {
            return !!(0, _find2.default)(column.getFormItemAvailableWhen(), function (_ref2) {
              var key = _ref2.key;
              return (0, _get2.default)(prevValues, key) !== (0, _get2.default)(curValues, key);
            });
          }

          return false;
        }
      };
    }

    return commonFormItemProps;
  }, [column, commonFormItemProps]);
  var children = (0, _react.useMemo)(function () {
    var inner;

    if (column.canFormItemExpandable()) {
      if (column.isArray()) {
        inner = _react.default.createElement(_CheckBox.default, (0, _extends2.default)({
          column: column
        }, formItemComponentProps));
      } else {
        inner = _react.default.createElement(_Radio.default, (0, _extends2.default)({
          column: column
        }, formItemComponentProps));
      }
    } else if (column.getFilters(null, 'disableInForm') || column.getValueOptionsSearchRequest() || column.getValueOptionsRequest()) {
      inner = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({
        forForm: true,
        style: {
          width: '100px'
        },
        column: column
      }, formItemComponentProps));
    } else if (column instanceof _DateTimeColumn.default) {
      inner = _react.default.createElement(_DatePicker.default, (0, _extends2.default)({
        presets: column.getFormPresets(),
        format: column.getFormat()
      }, formItemComponentProps));
    } else if (column instanceof _DurationColumn.default) {
      inner = _react.default.createElement(_DurationPicker.default, formItemComponentProps);
    } else if (column instanceof _ImageColumn.default) {
      inner = _react.default.createElement(_UploadImage.default, (0, _extends2.default)({
        ssoToken: user ? user.get('sso_token') : ''
      }, formItemComponentProps));
    } else if (column instanceof _BooleanColumn.default) {
      var options = column.getValueOptions();
      var checkedChildren = options.find(function (option) {
        return option.get('value');
      }).get('text');
      var unCheckedChildren = options.find(function (option) {
        return !option.get('value');
      }).get('text');
      inner = _react.default.createElement(_switch.default, (0, _extends2.default)({
        checkedChildren: checkedChildren,
        unCheckedChildren: unCheckedChildren
      }, formItemComponentProps));
    } else if (column instanceof _NumberColumn.default) {
      if (column.isArray()) {
        inner = _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          placeholder: "\u8F93\u5165".concat(column.getTitle())
        }, formItemComponentProps, {
          mode: "tags"
        }));
      } else {
        inner = _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          placeholder: "\u8F93\u5165".concat(column.getTitle())
        }, formItemComponentProps));
      }
    } else if (column instanceof _StringColumn.default) {
      if (column.isArray()) {
        return _react.default.createElement(_select.default, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          placeholder: "\u8F93\u5165".concat(column.getTitle())
        }, formItemComponentProps, {
          mode: "tags"
        }));
      }

      if (column.getFormMultipleLine()) {
        return _react.default.createElement(_input.default.TextArea, (0, _extends2.default)({
          style: {
            width: '100%'
          },
          placeholder: "\u8F93\u5165".concat(column.getTitle())
        }, formItemComponentProps));
      }

      inner = _react.default.createElement(_input.default, (0, _extends2.default)({
        style: {
          width: '100%'
        },
        placeholder: "\u8F93\u5165".concat(column.getTitle())
      }, formItemComponentProps));
    }

    if (formItemProps.shouldUpdate) {
      return function (_ref3) {
        var getFieldValue = _ref3.getFieldValue;
        var dependencies = column.getFormItemAvailableWhen();

        var _loop = function _loop(i) {
          var _dependencies$i = dependencies[i],
              key = _dependencies$i.key,
              value = _dependencies$i.value;
          var curValue = getFieldValue(key);

          if ((0, _isArray2.default)(value)) {
            if (!(0, _find2.default)(value, function (v) {
              return v === curValue;
            })) {
              return {
                v: null
              };
            }
          } else if (value !== curValue) {
            return {
              v: null
            };
          }
        };

        for (var i = 0; i < dependencies.length; i += 1) {
          var _ret = _loop(i);

          if ((0, _typeof2.default)(_ret) === "object") return _ret.v;
        }

        return _react.default.createElement(_form.default.Item, commonFormItemProps, inner);
      };
    }

    return inner;
  }, [column, commonFormItemProps, formItemComponentProps, formItemProps.shouldUpdate, user]);
  return _react.default.createElement(_form.default.Item, formItemProps, children);
}

FormItem.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  record: _propTypes.default.object,
  formItemComponentProps: _propTypes.default.object,
  hideLabel: _propTypes.default.bool
};
FormItem.defaultProps = {
  record: null,
  formItemComponentProps: {},
  hideLabel: false
};

var _default = _react.default.memo(FormItem);

exports.default = _default;
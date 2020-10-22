"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/input/style");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/lib/input-number"));

require("antd/lib/select/style");

var _select = _interopRequireDefault(require("antd/lib/select"));

require("antd/lib/switch/style");

var _switch = _interopRequireDefault(require("antd/lib/switch"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toNumber2 = _interopRequireDefault(require("lodash/fp/toNumber"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _icons = require("@ant-design/icons");

var _dva = require("dva");

var _UploadImage = _interopRequireDefault(require("./UploadImage"));

var _UploadFile = _interopRequireDefault(require("./UploadFile"));

var _ObjectInputTextArea = _interopRequireDefault(require("./ObjectInputTextArea"));

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

var _FileColumn = _interopRequireDefault(require("../../schema/FileColumn"));

var _ObjectColumn = _interopRequireDefault(require("../../schema/ObjectColumn"));

var _useUser = _interopRequireDefault(require("../../hooks/useUser"));

var _useForm = _interopRequireDefault(require("../../hooks/useForm"));

var _usePageConfig2 = _interopRequireDefault(require("../../hooks/usePageConfig"));

var _EditableTableRow = require("../Editable/EditableTableRow");

var _resetChildColumn = require("../../utils/resetChildColumn");

var _FormListItemContext = _interopRequireDefault(require("../../contexts/FormListItemContext"));

var _useFormListItemPrefix = _interopRequireDefault(require("../../hooks/useFormListItemPrefix"));

var _getFullFormItemName = _interopRequireDefault(require("../../utils/getFullFormItemName"));

require("./FormItem.less");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function FormItem(_ref) {
  var isEdit = _ref.isEdit,
      column = _ref.column,
      record = _ref.record,
      extraFormItemComponentProps = _ref.formItemComponentProps,
      extraCommonFormItemProps = _ref.commonFormItemProps,
      hideLabel = _ref.hideLabel,
      shouldSetInitialValue = _ref.shouldSetInitialValue;
  var user = (0, _useUser.default)();
  var disabled = (0, _react.useMemo)(function () {
    return isEdit && column.isImmutableInForm({
      user: user,
      record: record
    });
  }, [column, user, record, isEdit]);
  var commonForm = (0, _useForm.default)();
  var editableForm = (0, _react.useContext)(_EditableTableRow.EditableContext);
  var prefix = (0, _useFormListItemPrefix.default)();
  var form = commonForm || editableForm;
  var formItemComponentProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread({}, column.getFormItemComponentProps()), extraFormItemComponentProps), {}, {
      placeholder: column.getFormPlaceholder(),
      onChange: function onChange() {
        var _extraFormItemCompone;

        (0, _resetChildColumn.resetChildColumn)({
          column: column,
          form: form,
          forForm: true,
          prefix: prefix
        });

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        extraFormItemComponentProps === null || extraFormItemComponentProps === void 0 ? void 0 : (_extraFormItemCompone = extraFormItemComponentProps.onChange) === null || _extraFormItemCompone === void 0 ? void 0 : _extraFormItemCompone.call.apply(_extraFormItemCompone, [extraFormItemComponentProps].concat(args));
      },
      disabled: disabled
    });
  }, [column, disabled, extraFormItemComponentProps, form, prefix]);
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
    var r = column.getFormItemRules().map(function (rule) {
      return (0, _isFunction2.default)(rule) ? function () {
        for (var _len2 = arguments.length, p = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          p[_key2] = arguments[_key2];
        }

        return rule.apply(void 0, p.concat([record]));
      } : rule;
    });

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

    if (column instanceof _ObjectColumn.default && !column.isArray() && !column.getFormRender()) {
      r = (0, _concat2.default)(r, [{
        validator: function validator(_, value, cb) {
          if ((0, _isPlainObject2.default)(value)) {
            cb();
          }

          if ((0, _trim2.default)(value)) {
            try {
              var result = JSON.parse(value);

              if (!(0, _isPlainObject2.default)(result)) {
                throw new Error();
              }
            } catch (err) {
              cb('格式错误！例子：{"key1": "value1", "key2": "value2"}，其中除双引号里的内容以外的都要是英文字符');
            }
          }

          cb();
        }
      }]);
    }

    return r;
  }, [column, record]);
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
  var matchParams = (0, _dva.useParams)();

  var _useMemo = (0, _react.useMemo)(function () {
    var _initialValueInner, _column$getColumns, _column$getColumns$ca;

    var initialValueInner = column.getFormItemInitialValue();

    if ((0, _isFunction2.default)(initialValueInner)) {
      initialValueInner = initialValueInner({
        matchParams: matchParams
      });
    } else if ((_initialValueInner = initialValueInner) === null || _initialValueInner === void 0 ? void 0 : _initialValueInner.toJS) {
      initialValueInner = initialValueInner.toJS();
    }

    if (record && Object.keys(record).length > 0) {
      var curValue = (0, _get2.default)(record, column.getKey());

      if (column.getFormItemNormalizeInitialValue()) {
        initialValueInner = column.getFormItemNormalizeInitialValue()({
          record: record,
          value: curValue,
          matchParams: matchParams
        });
      } else {
        initialValueInner = curValue;
      }
    }

    return {
      initialValue: initialValueInner,
      initialListItemValue: (_column$getColumns = column.getColumns) === null || _column$getColumns === void 0 ? void 0 : (_column$getColumns$ca = _column$getColumns.call(column)) === null || _column$getColumns$ca === void 0 ? void 0 : _column$getColumns$ca.reduce(function (result, c) {
        return _objectSpread(_objectSpread({}, result), {}, (0, _defineProperty2.default)({}, c.getFormItemName(), c.getFormItemInitialValue()));
      }, {})
    };
  }, [record, column, matchParams]),
      initialValue = _useMemo.initialValue,
      initialListItemValue = _useMemo.initialListItemValue;

  (0, _react.useEffect)(function () {
    if (shouldSetInitialValue) {
      form === null || form === void 0 ? void 0 : form.setFields([{
        name: column.getFormItemName(),
        value: initialValue
      }]);
    }
  }, [column, form, initialValue, shouldSetInitialValue]);
  var commonFormItemProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread({
      normalize: normalize,
      valuePropName: valuePropName
    }, column.getFormItemProps()), {}, {
      label: hideLabel ? '' : column.getFormItemLabel(),
      rules: rules
    }, extraCommonFormItemProps), {}, {
      name: prefix ? [prefix[1], column.getFormItemName()] : column.getFormItemName()
    });
  }, [prefix, column, hideLabel, normalize, rules, valuePropName, extraCommonFormItemProps]);
  var formItemProps = (0, _react.useMemo)(function () {
    if (column.parentColumn || column.getFormItemAvailableWhen().size > 0) {
      return {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, curValues) {
          if (column.parentColumn && (0, _get2.default)(prevValues, column.parentColumn.getFormItemName()) !== (0, _get2.default)(curValues, column.parentColumn.getFormItemName())) {
            return true;
          }

          if (column.getFormItemAvailableWhen().size > 0) {
            return !!column.getFormItemAvailableWhen().find(function (_, key) {
              return (0, _get2.default)(prevValues, key) !== (0, _get2.default)(curValues, key);
            });
          }

          return false;
        }
      };
    }

    return commonFormItemProps;
  }, [column, commonFormItemProps]);

  var _usePageConfig = (0, _usePageConfig2.default)(),
      idIdentifier = _usePageConfig.idIdentifier;

  var renderParams = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, formItemComponentProps), {}, {
      form: form,
      record: record
    });
  }, [formItemComponentProps, form, record]);

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      initialValueOptions = _useState2[0],
      setInitialValueOptions = _useState2[1];

  (0, _react.useEffect)(function () {
    var _column$getFormItemIn;

    (_column$getFormItemIn = column.getFormItemInitialValueOptionsRequest()) === null || _column$getFormItemIn === void 0 ? void 0 : _column$getFormItemIn(record).then(function (v) {
      return setInitialValueOptions(v);
    });
  }, [column, record]);
  var children = (0, _react.useMemo)(function () {
    var inner;

    if (column.getFormRender()) {
      inner = column.getFormRender();
    } else if (column.canFormItemExpandable()) {
      if (column.isArray()) {
        inner = _react.default.createElement(_CheckBox.default, (0, _extends2.default)({
          forForm: true,
          column: column
        }, formItemComponentProps));
      } else {
        inner = _react.default.createElement(_Radio.default, (0, _extends2.default)({
          forForm: true,
          column: column
        }, formItemComponentProps));
      }
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
    } else if (column.getFilters(null, 'disabledInForm') || column.getValueOptionsSearchRequest() && column.getUseValueOptionsSearchRequest() !== _Column.default.SEARCH_REQUEST_TYPES.FILTER || column.getValueOptionsRequest()) {
      inner = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({
        forForm: true,
        initialValueOptions: initialValueOptions || (record && Object.keys(record).length > 0 && column.getFormItemNormalizeInitialValueOptions() ? column.getFormItemNormalizeInitialValueOptions()(record) : null),
        style: {
          width: '100%'
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
      inner = _react.default.createElement(_UploadImage.default, formItemComponentProps);
    } else if (column instanceof _FileColumn.default) {
      inner = _react.default.createElement(_UploadFile.default, (0, _extends2.default)({
        platform: column.getPlatform()
      }, formItemComponentProps));
    } else if (column instanceof _NumberColumn.default) {
      if (column.isArray()) {
        inner = _react.default.createElement(_select.default, (0, _extends2.default)({
          allowClear: true,
          style: {
            width: '100%'
          }
        }, formItemComponentProps, {
          mode: "tags"
        }));
      } else {
        inner = _react.default.createElement(_inputNumber.default, (0, _extends2.default)({
          style: {
            width: '100%'
          }
        }, formItemComponentProps));
      }
    } else if (column instanceof _StringColumn.default) {
      if (column.isArray()) {
        inner = _react.default.createElement(_select.default, (0, _extends2.default)({
          allowClear: true,
          style: {
            width: '100%'
          }
        }, formItemComponentProps, {
          mode: "tags"
        }));
      } else if (column.getFormMultipleLine()) {
        inner = _react.default.createElement(_input.default.TextArea, (0, _extends2.default)({
          allowClear: true,
          style: {
            width: '100%'
          }
        }, formItemComponentProps));
      } else {
        inner = _react.default.createElement(_input.default, (0, _extends2.default)({
          allowClear: true,
          style: {
            width: '100%'
          }
        }, formItemComponentProps));
      }
    } else if (column instanceof _ObjectColumn.default) {
      if (!column.isArray()) {
        inner = _react.default.createElement(_ObjectInputTextArea.default, (0, _extends2.default)({
          style: {
            width: '100%'
          }
        }, formItemComponentProps));
      } else {
        var name = commonFormItemProps.name;
        var WrapComponent = idIdentifier ? _react.default.Fragment : _card.default;
        var WrapItemsComponent = idIdentifier ? _space.default : _react.default.Fragment;
        var deleteButton = idIdentifier ? _react.default.createElement(_icons.MinusCircleOutlined, {
          className: "dynamic-delete-in-page"
        }) : _react.default.createElement(_icons.DeleteOutlined, {
          className: "dynamic-delete"
        });
        inner = _react.default.createElement(_form.default.List, {
          name: name
        }, function (fields, _ref2) {
          var add = _ref2.add,
              remove = _ref2.remove;
          return _react.default.createElement("div", null, fields.map(function (field) {
            return _react.default.createElement(_form.default.Item, {
              key: field.key
            }, _react.default.createElement(WrapComponent, {
              className: idIdentifier ? 'dynamic-card' : null
            }, _react.default.createElement(WrapItemsComponent, {
              style: {
                flexWrap: 'wrap'
              }
            }, column.getColumns().map(function (dColumn) {
              return _react.default.createElement(_FormListItemContext.default.Provider, {
                value: [name, field.name]
              }, _react.default.createElement(FormItem, {
                isEdit: true,
                shouldSetInitialValue: false,
                key: dColumn.getFormItemName(),
                column: dColumn,
                record: record,
                commonFormItemProps: _objectSpread(_objectSpread({}, field), {}, {
                  fieldKey: [field.fieldKey, dColumn.getFormItemName()]
                })
              }));
            }), _react.default.createElement(_popconfirm.default, {
              title: "\u786E\u8BA4\u5220\u9664\uFF1F",
              onConfirm: function onConfirm() {
                return remove(field.name);
              }
            }, deleteButton))));
          }), _react.default.createElement(_form.default.Item, null, _react.default.createElement(_button.default, {
            type: "primary",
            onClick: function onClick() {
              return add(initialListItemValue);
            }
          }, _react.default.createElement(_icons.PlusOutlined, null), " \u6DFB\u52A0")));
        });
      }
    }

    if (formItemProps.shouldUpdate) {
      return function (_ref3) {
        var getFieldValue = _ref3.getFieldValue;

        if (column.getFormItemAvailableWhen().find(function (value, key) {
          var parsedKey = key;

          try {
            parsedKey = JSON.parse(key);
          } catch (e) {}

          var curValue = getFieldValue(parsedKey);

          if ((0, _isFunction2.default)(value)) {
            return !value(curValue);
          }

          if (value instanceof _immutable.default.List) {
            if (!value.find(function (v) {
              return v === curValue;
            })) {
              return true;
            }
          } else if (value !== curValue) {
            return true;
          }

          return false;
        })) {
          return null;
        }

        var parentValue = getFieldValue((0, _getFullFormItemName.default)({
          prefix: prefix,
          column: column.parentColumn
        }));
        return _react.default.createElement(_form.default.Item, (0, _extends2.default)({
          key: JSON.stringify(parentValue)
        }, commonFormItemProps), (0, _isFunction2.default)(inner) ? inner(renderParams) : inner);
      };
    }

    return (0, _isFunction2.default)(inner) ? inner(renderParams) : inner;
  }, [column, commonFormItemProps, formItemComponentProps, formItemProps.shouldUpdate, record, renderParams, idIdentifier, initialListItemValue, prefix, initialValueOptions]);
  return _react.default.createElement(_form.default.Item, formItemProps, children);
}

FormItem.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  record: _propTypes.default.object,
  formItemComponentProps: _propTypes.default.object,
  commonFormItemProps: _propTypes.default.object,
  hideLabel: _propTypes.default.bool,
  shouldSetInitialValue: _propTypes.default.bool,
  isEdit: _propTypes.default.bool
};
FormItem.defaultProps = {
  shouldSetInitialValue: true,
  record: null,
  formItemComponentProps: {},
  commonFormItemProps: {},
  hideLabel: false,
  isEdit: false
};

var _default = _react.default.memo(FormItem);

exports.default = _default;
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _PlusOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/PlusOutlined"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

var _DeleteOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/DeleteOutlined"));

var _MinusCircleOutlined2 = _interopRequireDefault(require("@ant-design/icons/lib/icons/MinusCircleOutlined"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/space/style");

var _space = _interopRequireDefault(require("antd/lib/space"));

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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toNumber2 = _interopRequireDefault(require("lodash/fp/toNumber"));

var _slice2 = _interopRequireDefault(require("lodash/slice"));

var _last2 = _interopRequireDefault(require("lodash/last"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _concat2 = _interopRequireDefault(require("lodash/concat"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

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

function getColumnInitialValue(column, matchParams) {
  var initialValue = column.getFormItemInitialValue();

  if ((0, _isFunction2.default)(initialValue)) {
    return initialValue({
      matchParams: matchParams
    });
  }

  return initialValue;
}

function FormItem(_ref) {
  var isEdit = _ref.isEdit,
      column = _ref.column,
      record = _ref.record,
      extraFormItemComponentProps = _ref.formItemComponentProps,
      extraCommonFormItemProps = _ref.commonFormItemProps,
      hideLabel = _ref.hideLabel;
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
        for (var _len = arguments.length, p = new Array(_len), _key = 0; _key < _len; _key++) {
          p[_key] = arguments[_key];
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
  var prePrefix = (0, _useFormListItemPrefix.default)();
  var generateFullFormListName = (0, _react.useCallback)(function (currentPrefix, name) {
    var result = (0, _isArray2.default)(currentPrefix) && (0, _findIndex2.default)(currentPrefix, function (v) {
      return (0, _isNumber2.default)(v);
    }) !== -1 ? (0, _concat2.default)(currentPrefix, name) : [currentPrefix, name];
    return prePrefix ? [].concat((0, _toConsumableArray2.default)((0, _slice2.default)(prePrefix, 0, -1)), (0, _toConsumableArray2.default)(result)) : result;
  }, [prePrefix]);
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
  var initialListItemValue = (0, _react.useMemo)(function () {
    var _column$getColumns, _column$getColumns$ca;

    return column.getFormItemInitialListItemValue() || ((_column$getColumns = column.getColumns) === null || _column$getColumns === void 0 ? void 0 : (_column$getColumns$ca = _column$getColumns.call(column)) === null || _column$getColumns$ca === void 0 ? void 0 : _column$getColumns$ca.reduce(function (result, c) {
      return _objectSpread(_objectSpread({}, result), {}, (0, _defineProperty2.default)({}, c.getFormItemName(), getColumnInitialValue(c, matchParams)));
    }, {}));
  }, [column, matchParams]);
  var formItemComponentProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread({}, column.getFormItemComponentProps()), extraFormItemComponentProps), {}, {
      placeholder: column.getFormPlaceholder(),
      onChange: function onChange() {
        var _extraFormItemCompone, _column$getFormItemCo, _column$getFormItemCo2;

        (0, _resetChildColumn.resetChildColumn)({
          column: column,
          form: form,
          forForm: true,
          prefix: prefix
        });

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        extraFormItemComponentProps === null || extraFormItemComponentProps === void 0 ? void 0 : (_extraFormItemCompone = extraFormItemComponentProps.onChange) === null || _extraFormItemCompone === void 0 ? void 0 : _extraFormItemCompone.call.apply(_extraFormItemCompone, [extraFormItemComponentProps].concat(args));
        (_column$getFormItemCo = column.getFormItemComponentProps()) === null || _column$getFormItemCo === void 0 ? void 0 : (_column$getFormItemCo2 = _column$getFormItemCo.onChange) === null || _column$getFormItemCo2 === void 0 ? void 0 : _column$getFormItemCo2.call.apply(_column$getFormItemCo2, [_column$getFormItemCo].concat(args, [form]));
      },
      onSelect: function onSelect() {
        var _extraFormItemCompone2, _column$getFormItemCo3, _column$getFormItemCo4;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        extraFormItemComponentProps === null || extraFormItemComponentProps === void 0 ? void 0 : (_extraFormItemCompone2 = extraFormItemComponentProps.onSelect) === null || _extraFormItemCompone2 === void 0 ? void 0 : _extraFormItemCompone2.call.apply(_extraFormItemCompone2, [extraFormItemComponentProps].concat(args));
        (_column$getFormItemCo3 = column.getFormItemComponentProps()) === null || _column$getFormItemCo3 === void 0 ? void 0 : (_column$getFormItemCo4 = _column$getFormItemCo3.onSelect) === null || _column$getFormItemCo4 === void 0 ? void 0 : _column$getFormItemCo4.call.apply(_column$getFormItemCo4, [_column$getFormItemCo3].concat(args, [form]));
      },
      disabled: disabled
    });
  }, [column, disabled, extraFormItemComponentProps, form, prefix]);
  var commonFormItemProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread(_objectSpread({
      normalize: normalize,
      valuePropName: valuePropName,
      preserve: false
    }, column.getFormItemProps()), {}, {
      label: hideLabel ? '' : column.getFormItemLabel(),
      rules: rules
    }, extraCommonFormItemProps), {}, {
      name: prefix ? [(0, _last2.default)(prefix), column.getFormItemName()] : column.getFormItemName()
    });
  }, [prefix, column, hideLabel, normalize, rules, valuePropName, extraCommonFormItemProps]);
  var formItemProps = (0, _react.useMemo)(function () {
    if (column.parentColumn || column.getFormItemAvailableWhen().size > 0) {
      return {
        noStyle: true,
        shouldUpdate: function shouldUpdate(prevValues, curValues) {
          var fullParentFormItemName = (0, _getFullFormItemName.default)({
            prefix: prefix,
            column: column.parentColumn
          });

          if (column.parentColumn && (0, _get2.default)(prevValues, fullParentFormItemName) !== (0, _get2.default)(curValues, fullParentFormItemName)) {
            return true;
          }

          if (column.getFormItemAvailableWhen().size > 0) {
            return !!column.getFormItemAvailableWhen().findKey(function (_, key) {
              var parsedKey = key;

              try {
                parsedKey = JSON.parse(key);
              } catch (e) {}

              var fullKey = (0, _getFullFormItemName.default)({
                prefix: prefix,
                name: parsedKey
              });
              return (0, _get2.default)(prevValues, fullKey) !== (0, _get2.default)(curValues, fullKey);
            });
          }

          return false;
        }
      };
    }

    return commonFormItemProps;
  }, [column, prefix, commonFormItemProps]);

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
    } else if (column.getFilters(null, _Column.default.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM) || column.getValueOptionsSearchRequest() && column.getUseValueOptionsSearchRequest() !== _Column.default.SEARCH_REQUEST_TYPES.FILTER || column.getValueOptionsRequest()) {
      inner = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({
        forForm: true,
        isEdit: isEdit,
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
        var WrapItemsComponent = idIdentifier ? _space.default : _row.default;
        var wrapItemsComponentProps = idIdentifier ? {
          style: {
            flexWrap: 'wrap'
          }
        } : {};
        var deleteButton = idIdentifier ? _react.default.createElement(_MinusCircleOutlined2.default, {
          className: "dynamic-delete-in-page"
        }) : _react.default.createElement(_DeleteOutlined2.default, {
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
            }, _react.default.createElement(_card.default, {
              className: "dynamic-card"
            }, _react.default.createElement(WrapItemsComponent, wrapItemsComponentProps, column.getColumns().map(function (dColumn) {
              return _react.default.createElement(_FormListItemContext.default.Provider, {
                value: generateFullFormListName(name, field.name)
              }, _react.default.createElement(FormItem, {
                isEdit: true,
                key: dColumn.getFormItemName(),
                column: dColumn,
                record: record,
                commonFormItemProps: _objectSpread(_objectSpread({}, field), {}, {
                  fieldKey: generateFullFormListName(field.fieldKey, dColumn.getFormItemName())
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
              return add((0, _isFunction2.default)(initialListItemValue) ? initialListItemValue(renderParams) : initialListItemValue);
            }
          }, _react.default.createElement(_PlusOutlined2.default, null), "\u6DFB\u52A0".concat(column.getTitle()))));
        });
      }
    }

    if (formItemProps.shouldUpdate) {
      return function (_ref3) {
        var getFieldValue = _ref3.getFieldValue;

        if (column.getFormItemAvailableWhen().findKey(function (value, key) {
          var parsedKey = key;

          try {
            parsedKey = JSON.parse(key);
          } catch (e) {}

          var curValue = getFieldValue((0, _getFullFormItemName.default)({
            prefix: prefix,
            name: parsedKey
          }));

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

        var parentValue = column.parentColumn ? getFieldValue((0, _getFullFormItemName.default)({
          prefix: prefix,
          column: column.parentColumn
        })) : null;
        return _react.default.createElement(_form.default.Item, (0, _extends2.default)({
          key: JSON.stringify(parentValue)
        }, commonFormItemProps), (0, _isFunction2.default)(inner) ? inner(renderParams) : inner);
      };
    }

    return (0, _isFunction2.default)(inner) ? inner(renderParams) : inner;
  }, [column, commonFormItemProps, formItemComponentProps, formItemProps.shouldUpdate, record, renderParams, idIdentifier, initialListItemValue, prefix, initialValueOptions, isEdit, generateFullFormListName]);
  return _react.default.createElement(_form.default.Item, formItemProps, children);
}

FormItem.propTypes = {
  column: _propTypes.default.instanceOf(_Column.default).isRequired,
  record: _propTypes.default.object,
  formItemComponentProps: _propTypes.default.object,
  commonFormItemProps: _propTypes.default.object,
  hideLabel: _propTypes.default.bool,
  isEdit: _propTypes.default.bool
};
FormItem.defaultProps = {
  record: null,
  formItemComponentProps: {},
  commonFormItemProps: {},
  hideLabel: false,
  isEdit: false
};

var _default = _react.default.memo(FormItem);

exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_GROUP_NAME = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/radio/style");

var _radio = _interopRequireDefault(require("antd/lib/radio"));

require("antd/lib/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _isBoolean2 = _interopRequireDefault(require("lodash/isBoolean"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

var _reactLinesEllipsis = _interopRequireDefault(require("react-lines-ellipsis"));

var _immutable = _interopRequireDefault(require("immutable"));

var _icons = require("@ant-design/icons");

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _TreeSelect = _interopRequireDefault(require("../components/FormItems/TreeSelect"));

var _TreeFilter = _interopRequireDefault(require("../components/TreeFilter"));

require("./Column.less");

var _generateAntdOptions = _interopRequireDefault(require("../utils/generateAntdOptions"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEFAULT_GROUP_NAME = '其它筛选项';
exports.DEFAULT_GROUP_NAME = DEFAULT_GROUP_NAME;
var FormItem = _form.default.Item;

function generateValidOptions(options, disableKey) {
  if (options && options.length > 0) {
    return (0, _map2.default)((0, _filter2.default)(options, function (o) {
      return !disableKey || !(0, _get2.default)(o, disableKey);
    }), function (o) {
      return _objectSpread(_objectSpread({}, o), {}, {
        children: generateValidOptions(o.children)
      });
    });
  }

  return options;
}

function generateFilters(options) {
  return _immutable.default.Map({
    normal: generateValidOptions(options),
    disableInFilter: generateValidOptions(options, 'disableInFilter'),
    disableInForm: generateValidOptions(options, 'disableInForm')
  });
}

function findOption(options, value) {
  if (!options) {
    return null;
  }

  var option;
  (0, _forEach2.default)(options, function (o) {
    if ((0, _isEqual2.default)(o.value, value)) {
      option = o;
    }

    if (!option) {
      option = findOption(o.children, value);
    }

    return !option;
  });
  return option;
}

var Column = function () {
  function Column() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Column);
    this.config = _immutable.default.fromJS(_objectSpread(_objectSpread({}, config), {}, {
      key: (0, _isArray2.default)(config.key) ? (0, _join2.default)(config.key, '.') : config.key
    }));
    this.activeValueOptionsRequests = {};
    this.resetFilters();
  }

  (0, _createClass2.default)(Column, [{
    key: "getKey",
    value: function getKey() {
      return this.config.get('key');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title');
    }
  }, {
    key: "getValueOptions",
    value: function getValueOptions() {
      return this.config.get('valueOptions');
    }
  }, {
    key: "getValueOptionsRequest",
    value: function getValueOptionsRequest() {
      return this.config.get('valueOptionsRequest');
    }
  }, {
    key: "getParentKey",
    value: function getParentKey() {
      return this.config.get('parentKey');
    }
  }, {
    key: "canFilterExpand",
    value: function canFilterExpand() {
      return this.config.getIn(['table', 'filterExpandable']) || this.config.getIn(['table', 'expandFilter']);
    }
  }, {
    key: "isPrimaryKey",
    value: function isPrimaryKey() {
      return this.config.get('primaryKey');
    }
  }, {
    key: "getTableTitle",
    value: function getTableTitle(_ref) {
      var _this = this;

      var filtered = _ref.filtered,
          filteredValue = _ref.filteredValue,
          parentFilteredValue = _ref.parentFilteredValue;
      if (!filteredValue || !filteredValue.length || filteredValue.length === 1 && filteredValue[0] === null) return this.getTitle();

      if (filtered) {
        if (this.canFilterRangeInTable()) {
          return "".concat(this.getTitle(), "\uFF08").concat(this.renderInTableValueDefault({
            value: (0, _get2.default)(filteredValue, '[0][0]'),
            parentFilteredValue: parentFilteredValue
          }), " ~ ").concat(this.renderInTableValueDefault({
            value: (0, _get2.default)(filteredValue, '[0][1]'),
            parentFilteredValue: parentFilteredValue
          }), "\uFF09");
        }

        if (this.canFilterMultipleInTable()) {
          if (filteredValue.length > 3) {
            return "".concat(this.getTitle(), "\uFF08\u5DF2\u9009").concat(filteredValue.length, "\u4E2A\uFF09");
          }

          return "".concat(this.getTitle(), "\uFF08").concat((0, _join2.default)((0, _map2.default)(filteredValue, function (v) {
            return _this.renderInTableValueDefault({
              value: v,
              parentFilteredValue: parentFilteredValue
            }) || '';
          }), '，'), "\uFF09");
        }

        return "".concat(this.getTitle(), "\uFF08").concat(this.renderInTableValueDefault({
          value: filteredValue[0],
          parentFilteredValue: parentFilteredValue
        }) || '', "\uFF09");
      }

      return this.getTitle();
    }
  }, {
    key: "getTableLink",
    value: function getTableLink() {
      return this.config.getIn(['table', 'link']);
    }
  }, {
    key: "getTableSortDirections",
    value: function getTableSortDirections() {
      return this.config.getIn(['table', 'sortDirections'], _immutable.default.List());
    }
  }, {
    key: "getTableDefaultSortOrder",
    value: function getTableDefaultSortOrder() {
      return this.config.getIn(['table', 'defaultSortOrder']);
    }
  }, {
    key: "getTableFixedSortOrder",
    value: function getTableFixedSortOrder() {
      return this.config.getIn(['table', 'fixedSortOrder']);
    }
  }, {
    key: "getTableFixedFilterValue",
    value: function getTableFixedFilterValue() {
      var value = (0, _isBoolean2.default)(this.getTableFilterRequired()) ? this.getTableFilterDefault() : this.getTableFilterRequired();
      return this.getTableFilterRequired() ? value : null;
    }
  }, {
    key: "getFilters",
    value: function getFilters(parentFilteredValue) {
      var _this2 = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';

      if (this.getParentKey()) {
        if ((0, _isArray2.default)(parentFilteredValue)) {
          var filters = (0, _filter2.default)((0, _map2.default)(parentFilteredValue, function (v) {
            return _this2.filters.getIn([v, key]);
          }), function (v) {
            return !!v;
          });

          if (parentFilteredValue.length !== filters.length) {
            return null;
          }

          return (0, _flatten2.default)(filters);
        }

        return this.filters ? this.filters.getIn([parentFilteredValue, key]) : null;
      }

      return this.filters ? this.filters.get(key) : null;
    }
  }, {
    key: "getTableFilterKey",
    value: function getTableFilterKey() {
      return this.config.getIn(['table', 'filterKey']) || this.getKey();
    }
  }, {
    key: "getTableFilterComponentProps",
    value: function getTableFilterComponentProps() {
      if (!this.tableFilterComponentProps) {
        this.tableFilterComponentProps = this.config.getIn(['table', 'filterComponentProps'], _immutable.default.Map()).toJS();
      }

      return this.tableFilterComponentProps;
    }
  }, {
    key: "getTableFilterDefault",
    value: function getTableFilterDefault() {
      return this.config.getIn(['table', 'filterDefault']);
    }
  }, {
    key: "getTableFilterRequired",
    value: function getTableFilterRequired() {
      return this.config.getIn(['table', 'filterRequired']);
    }
  }, {
    key: "getTableWidth",
    value: function getTableWidth() {
      return this.config.getIn(['table', 'width'], undefined);
    }
  }, {
    key: "getTableFixed",
    value: function getTableFixed() {
      return this.config.getIn(['table', 'fixed']);
    }
  }, {
    key: "getTableMaxLines",
    value: function getTableMaxLines() {
      return this.config.getIn(['table', 'maxLines']);
    }
  }, {
    key: "getFilterGroup",
    value: function getFilterGroup() {
      return this.config.getIn(['table', 'filterGroup'], DEFAULT_GROUP_NAME);
    }
  }, {
    key: "getTableFilterSearchRequest",
    value: function getTableFilterSearchRequest() {
      return this.config.getIn(['table', 'filterSearchRequest']);
    }
  }, {
    key: "resetFilters",
    value: function resetFilters() {
      var valueOptions = this.getValueOptions();

      if (valueOptions) {
        this.filters = generateFilters(valueOptions.toJS());
      } else {
        this.filters = _immutable.default.Map();
      }
    }
  }, {
    key: "isFilterOutside",
    value: function isFilterOutside() {
      return this.config.getIn(['table', 'filterOutside']);
    }
  }, {
    key: "shouldRenderTableFilter",
    value: function shouldRenderTableFilter(user) {
      return this.canFilterInTable() && !this.shouldRenderOutsideFilter(user) && !this.shouldRenderExpandFilter();
    }
  }, {
    key: "shouldRenderOutsideFilter",
    value: function shouldRenderOutsideFilter(user) {
      return this.canFilterInTable() && !this.canFilterExpand() && (this.isFilterOutside() || !this.canShowInTable(user));
    }
  }, {
    key: "shouldRenderExpandFilter",
    value: function shouldRenderExpandFilter() {
      return this.canFilterInTable() && this.canFilterExpand();
    }
  }, {
    key: "canFilterInTable",
    value: function canFilterInTable() {
      return this.config.getIn(['table', 'filter']);
    }
  }, {
    key: "canFilterTreeInTable",
    value: function canFilterTreeInTable() {
      return this.config.getIn(['table', 'filterTree']);
    }
  }, {
    key: "canFilterMultipleInTable",
    value: function canFilterMultipleInTable() {
      return this.config.getIn(['table', 'filterMultiple']);
    }
  }, {
    key: "canFilterRangeInTable",
    value: function canFilterRangeInTable() {
      return this.config.getIn(['table', 'filterRange']);
    }
  }, {
    key: "canSortInTable",
    value: function canSortInTable() {
      return this.getTableSortDirections().size > 0;
    }
  }, {
    key: "canShowInTable",
    value: function canShowInTable(user) {
      var invisible = this.config.getIn(['table', 'invisible']);

      if ((0, _isFunction2.default)(invisible)) {
        if (!user) {
          return false;
        }

        return !invisible({
          user: user
        });
      }

      return !invisible;
    }
  }, {
    key: "canShowFormItemInEditableTable",
    value: function canShowFormItemInEditableTable() {
      return false;
    }
  }, {
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return false;
    }
  }, {
    key: "getFilterIcon",
    value: function getFilterIcon() {
      return _icons.FilterOutlined;
    }
  }, {
    key: "useValueOptionsInTable",
    value: function useValueOptionsInTable() {
      return this.config.getIn(['table', 'useValueOptions']);
    }
  }, {
    key: "formatFilterValue",
    value: function formatFilterValue(v) {
      return v;
    }
  }, {
    key: "renderInTableValueDefault",
    value: function renderInTableValueDefault(_ref2) {
      var value = _ref2.value,
          parentFilteredValue = _ref2.parentFilteredValue;
      var filters = this.getFilters(parentFilteredValue, this.getTableFilterSearchRequest() ? 'search' : 'normal');
      var option = findOption(filters, value);

      if (option) {
        return option.text;
      }

      var maxLines = this.getTableMaxLines();

      if (maxLines > 0) {
        return _react.default.createElement(_reactLinesEllipsis.default, {
          text: value || '',
          maxLine: maxLines,
          ellipsis: "...",
          trimRight: true,
          basedOn: "letters"
        });
      }

      return value;
    }
  }, {
    key: "renderInTableValue",
    value: function renderInTableValue(_ref3) {
      var _this3 = this;

      var value = _ref3.value,
          record = _ref3.record,
          user = _ref3.user,
          reload = _ref3.reload,
          parentFilteredValue = _ref3.parentFilteredValue;
      var render = this.config.getIn(['table', 'render']);

      if ((0, _isFunction2.default)(render)) {
        return render({
          value: value,
          record: record,
          user: user,
          reload: reload
        });
      }

      if ((0, _isArray2.default)(value)) {
        return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(value, function (v) {
          return _react.default.createElement(_react.default.Fragment, {
            key: v
          }, _this3.renderInTableValueDefault({
            value: v,
            record: record,
            parentFilteredValue: parentFilteredValue
          }), _react.default.createElement("br", null));
        }));
      }

      return this.renderInTableValueDefault({
        value: value,
        record: record,
        parentFilteredValue: parentFilteredValue
      });
    }
  }, {
    key: "renderInTable",
    value: function renderInTable(_ref4) {
      var value = _ref4.value,
          record = _ref4.record,
          user = _ref4.user,
          reload = _ref4.reload,
          parentFilteredValue = _ref4.parentFilteredValue;
      var children = this.renderInTableValue({
        value: value,
        record: record,
        user: user,
        reload: reload,
        parentFilteredValue: parentFilteredValue
      });
      var link = this.getTableLink();

      if (link) {
        return _react.default.createElement(_RecordLink.default, {
          link: link,
          record: record
        }, children);
      }

      return children;
    }
  }, {
    key: "getRenderFilterTree",
    value: function getRenderFilterTree(_ref5) {
      var _this4 = this;

      var parentValue = _ref5.parentValue;
      return function (_ref6) {
        var setSelectedKeys = _ref6.setSelectedKeys,
            selectedKeys = _ref6.selectedKeys,
            confirm = _ref6.confirm,
            clearFilters = _ref6.clearFilters,
            isAutoTrigger = _ref6.isAutoTrigger;
        return _react.default.createElement("div", {
          style: {
            padding: 8
          }
        }, _react.default.createElement(_TreeFilter.default, {
          column: _this4,
          parentValue: parentValue,
          selectedKeys: selectedKeys,
          setSelectedKeys: setSelectedKeys
        }), _react.default.createElement("div", {
          className: "filter-dropdown-button-wrapper"
        }, _react.default.createElement(_button.default, {
          type: "primary",
          onClick: confirm,
          icon: _react.default.createElement(_icons.FilterOutlined, null),
          size: "small",
          style: {
            width: 90,
            marginRight: 8
          }
        }, isAutoTrigger ? '筛选' : '确定'), _react.default.createElement(_button.default, {
          onClick: clearFilters,
          size: "small",
          style: {
            width: 90
          }
        }, "\u91CD\u7F6E")));
      };
    }
  }, {
    key: "isImmutableInForm",
    value: function isImmutableInForm(_ref7) {
      var user = _ref7.user,
          value = _ref7.value,
          values = _ref7.values,
          record = _ref7.record;
      var immutableInForm = this.config.getIn(['form', 'immutable']);

      if ((0, _isFunction2.default)(immutableInForm)) {
        return immutableInForm({
          user: user,
          value: value,
          values: values,
          record: record
        });
      }

      return immutableInForm;
    }
  }, {
    key: "canShowInCreateFrom",
    value: function canShowInCreateFrom(_ref8) {
      var user = _ref8.user,
          value = _ref8.value,
          values = _ref8.values,
          record = _ref8.record;
      var creatable = this.config.getIn(['form', 'creatable']);

      if ((0, _isFunction2.default)(creatable)) {
        return creatable({
          user: user,
          value: value,
          values: values,
          record: record
        });
      }

      return creatable;
    }
  }, {
    key: "canShowInEditFrom",
    value: function canShowInEditFrom(_ref9) {
      var user = _ref9.user,
          value = _ref9.value,
          values = _ref9.values,
          record = _ref9.record;
      var creatable = this.config.getIn(['form', 'editable']);

      if ((0, _isFunction2.default)(creatable)) {
        return creatable({
          user: user,
          value: value,
          values: values,
          record: record
        });
      }

      return creatable;
    }
  }, {
    key: "canInlineEdit",
    value: function canInlineEdit() {
      return this.config.getIn(['form', 'inlineEdit']);
    }
  }, {
    key: "canSelectMutipleInForm",
    value: function canSelectMutipleInForm() {
      return this.config.getIn(['form', 'multiple']);
    }
  }, {
    key: "getFormKey",
    value: function getFormKey() {
      return this.config.getIn(['form', 'key']) || this.getKey();
    }
  }, {
    key: "getFormDefaultInitialValue",
    value: function getFormDefaultInitialValue() {
      return null;
    }
  }, {
    key: "getFormInitialValue",
    value: function getFormInitialValue() {
      return this.config.getIn(['form', 'initialValue']) || this.getFormDefaultInitialValue();
    }
  }, {
    key: "getFormGenerateSubmitValue",
    value: function getFormGenerateSubmitValue() {
      return this.config.getIn(['form', 'generateSubmitValue']);
    }
  }, {
    key: "getFormGenerateInitialValue",
    value: function getFormGenerateInitialValue() {
      return this.config.getIn(['form', 'generateInitialValue']);
    }
  }, {
    key: "getFormPlaceholder",
    value: function getFormPlaceholder() {
      var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.config.getIn(['form', 'placeholder']) || "\u8BF7".concat(select ? '选择' : '输入').concat(this.getTitle());
    }
  }, {
    key: "getFormSearchPlaceholder",
    value: function getFormSearchPlaceholder() {
      return this.config.getIn(['form', 'searchPlaceholder']) || "\u641C\u7D22".concat(this.getTitle());
    }
  }, {
    key: "getFormComponentProps",
    value: function getFormComponentProps(_ref10) {
      var isEdit = _ref10.isEdit,
          user = _ref10.user,
          value = _ref10.value,
          values = _ref10.values,
          record = _ref10.record;

      if (!this.formComponentProps) {
        this.formComponentProps = this.config.getIn(['form', 'componentProps'], _immutable.default.Map()).toJS();
      }

      if (isEdit) {
        return _objectSpread({
          disabled: this.isImmutableInForm({
            user: user,
            value: value,
            values: values,
            record: record
          })
        }, this.formComponentProps);
      }

      return this.formComponentProps;
    }
  }, {
    key: "getFormRadioOptions",
    value: function getFormRadioOptions() {
      return this.config.getIn(['form', 'radioOptions'], _immutable.default.List());
    }
  }, {
    key: "getFormHint",
    value: function getFormHint() {
      return this.config.getIn(['form', 'hint']);
    }
  }, {
    key: "getFormDefaultRules",
    value: function getFormDefaultRules() {
      return [];
    }
  }, {
    key: "getFormFiledValuePropName",
    value: function getFormFiledValuePropName() {
      return 'value';
    }
  }, {
    key: "getFormRules",
    value: function getFormRules() {
      return this.config.getIn(['form', 'rules'], _immutable.default.List());
    }
  }, {
    key: "getFormRenderInFormItem",
    value: function getFormRenderInFormItem() {
      return this.config.getIn(['form', 'renderInFormItem']);
    }
  }, {
    key: "getFormSearchRequest",
    value: function getFormSearchRequest() {
      return this.config.getIn(['form', 'searchRequest']);
    }
  }, {
    key: "isRequiredInForm",
    value: function isRequiredInForm() {
      return this.config.getIn(['form', 'required']);
    }
  }, {
    key: "formatFormFieldValue",
    value: function formatFormFieldValue(v) {
      return v;
    }
  }, {
    key: "formatFormSubmitValue",
    value: function formatFormSubmitValue(v) {
      return v;
    }
  }, {
    key: "useValueOptionsInForm",
    value: function useValueOptionsInForm() {
      return true;
    }
  }, {
    key: "getFormExpandable",
    value: function getFormExpandable() {
      return this.config.getIn(['form', 'expandable'], false);
    }
  }, {
    key: "shouldRenderCommonFormItem",
    value: function shouldRenderCommonFormItem(parentValue) {
      return this.useValueOptionsInForm() && (this.getFilters(parentValue) || this.getValueOptionsRequest() || this.getFormSearchRequest());
    }
  }, {
    key: "renderCommonFormItem",
    value: function renderCommonFormItem(_ref11) {
      var isEdit = _ref11.isEdit,
          user = _ref11.user,
          record = _ref11.record,
          value = _ref11.value,
          values = _ref11.values,
          parentValue = _ref11.parentValue,
          formComponentProps = _ref11.formComponentProps;
      var children;

      if (this.getFormExpandable() && this.getFilters(parentValue)) {
        var Component = this.canSelectMutipleInForm() ? _checkbox.default.Group : _radio.default.Group;
        var options = (0, _filter2.default)(this.getFilters(parentValue), function (_ref12) {
          var disableInForm = _ref12.disableInForm;
          return !disableInForm;
        });
        children = _react.default.createElement(Component, (0, _extends2.default)({}, this.getFormComponentProps({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values
        }), {
          options: (0, _generateAntdOptions.default)(options),
          buttonStyle: "solid"
        }, formComponentProps || {}));
      } else {
        children = _react.default.createElement(_TreeSelect.default, (0, _extends2.default)({}, this.getFormComponentProps({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values
        }), {
          column: this,
          parentValue: parentValue
        }, formComponentProps || {}));
      }

      return children;
    }
  }, {
    key: "renderInFormItem",
    value: function renderInFormItem() {
      return null;
    }
  }, {
    key: "generateFormInitialValue",
    value: function generateFormInitialValue() {
      var _this5 = this;

      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref13$isEdit = _ref13.isEdit,
          isEdit = _ref13$isEdit === void 0 ? false : _ref13$isEdit,
          _ref13$record = _ref13.record,
          record = _ref13$record === void 0 ? {} : _ref13$record,
          parentValue = _ref13.parentValue;

      var initialValue = this.getFormInitialValue();
      var generateInitialValue = this.getFormGenerateInitialValue();

      if (isEdit) {
        var preValue = (0, _get2.default)(record, this.getKey());

        if ((0, _isFunction2.default)(generateInitialValue)) {
          initialValue = generateInitialValue({
            value: preValue,
            parentValue: parentValue
          });
        } else if ((0, _isArray2.default)(preValue)) {
          initialValue = (0, _map2.default)(preValue, function (v) {
            return _this5.formatFormFieldValue(v);
          });
        } else {
          initialValue = this.formatFormFieldValue(preValue);
        }
      } else if ((0, _isFunction2.default)(generateInitialValue)) {
        initialValue = generateInitialValue({
          value: null,
          parentValue: parentValue
        });
      }

      if (this.shouldRenderCommonFormItem(parentValue) && (!this.getFormExpandable() || !this.getFilters(parentValue))) {
        initialValue = initialValue === '' ? null : initialValue;
      }

      return initialValue;
    }
  }, {
    key: "renderInForm",
    value: function renderInForm(_ref14) {
      var _this6 = this;

      var hideFormLabel = _ref14.hideFormLabel,
          user = _ref14.user,
          record = _ref14.record,
          form = _ref14.form,
          isEdit = _ref14.isEdit,
          checkVisibility = _ref14.checkVisibility,
          _ref14$isFilter = _ref14.isFilter,
          isFilter = _ref14$isFilter === void 0 ? false : _ref14$isFilter,
          formComponentProps = _ref14.formComponentProps;

      var _ref15 = form || {},
          getFieldsValue = _ref15.getFieldsValue;

      var key = this.getFormKey();
      var values = getFieldsValue ? getFieldsValue() : null;
      var value = (0, _get2.default)(values, key);
      var parentValue = this.parentColumn && !isFilter ? (0, _get2.default)(values, this.parentColumn.getFormKey()) : null;

      if (checkVisibility && (!isEdit && !this.canShowInCreateFrom({
        user: user,
        record: record,
        value: value,
        values: values
      }) || isEdit && !this.canShowInEditFrom({
        user: user,
        record: record,
        value: value,
        values: values
      }))) {
        return null;
      }

      var children;
      var initialValue = this.generateFormInitialValue({
        isEdit: isEdit,
        record: record,
        parentValue: parentValue
      });

      if (this.shouldRenderCommonFormItem(parentValue)) {
        children = this.renderCommonFormItem({
          isEdit: isEdit,
          user: user,
          record: record,
          value: value,
          values: values,
          parentValue: parentValue,
          formComponentProps: formComponentProps
        });
      } else {
        var renderInFormItem = this.getFormRenderInFormItem();
        children = renderInFormItem && !isFilter ? renderInFormItem({
          user: user,
          isEdit: isEdit,
          value: value,
          values: values,
          record: record
        }) : this.renderInFormItem({
          user: user,
          record: record,
          value: value,
          values: values,
          isEdit: isEdit,
          formComponentProps: formComponentProps
        });
      }

      if (isFilter) {
        return children;
      }

      var rules = (0, _isFunction2.default)(this.getFormRules()) ? this.getFormRules()({
        user: user,
        record: record,
        value: value,
        values: values
      }) : this.getFormRules().toJS();
      return _react.default.createElement(FormItem, {
        validateFirst: true,
        key: key,
        name: key,
        label: hideFormLabel ? '' : this.getTitle(),
        extra: this.getFormHint(),
        initialValue: initialValue,
        onChange: this.childColumn ? function () {
          (0, _forEach2.default)(_this6.childColumn, function (childColumn) {
            if (!childColumn.canSelectMutipleInForm()) {
              form.setFieldsValue((0, _defineProperty2.default)({}, childColumn.getFormKey(), undefined));
            }
          });
        } : null,
        rules: [{
          required: this.isRequiredInForm(),
          message: "".concat(this.getTitle(), "\u4E0D\u80FD\u4E3A\u7A7A")
        }].concat((0, _toConsumableArray2.default)(this.getFormDefaultRules()), (0, _toConsumableArray2.default)(rules)),
        valuePropName: this.getFormFiledValuePropName()
      }, children);
    }
  }, {
    key: "canShowInDescription",
    value: function canShowInDescription(_ref16) {
      var user = _ref16.user,
          record = _ref16.record;
      var invisible = this.config.getIn(['detail', 'invisible']);

      if ((0, _isFunction2.default)(invisible)) {
        if (!user) {
          return false;
        }

        return !invisible({
          user: user,
          record: record
        });
      }

      return !invisible;
    }
  }, {
    key: "getDescriptionWidth",
    value: function getDescriptionWidth() {
      return this.config.getIn(['detail', 'width'], undefined);
    }
  }, {
    key: "getDescriptionSpan",
    value: function getDescriptionSpan() {
      return this.config.getIn(['detail', 'span'], 1);
    }
  }, {
    key: "getDescriptionLink",
    value: function getDescriptionLink() {
      return this.config.getIn(['detail', 'link']);
    }
  }, {
    key: "renderInDescriptionDefault",
    value: function renderInDescriptionDefault(_ref17) {
      var value = _ref17.value;
      var filters = this.getFilters();

      if (filters) {
        var option = (0, _find2.default)(filters, function (o) {
          return o.value === value;
        });

        if (option) {
          return option.text;
        }
      }

      var maxLines = this.getTableMaxLines();

      if (maxLines > 0) {
        return _react.default.createElement(_reactLinesEllipsis.default, {
          text: value || '',
          maxLine: maxLines,
          ellipsis: "...",
          trimRight: true,
          basedOn: "letters"
        });
      }

      return value;
    }
  }, {
    key: "renderInDescriptionValue",
    value: function renderInDescriptionValue(_ref18) {
      var _this7 = this;

      var value = _ref18.value,
          record = _ref18.record;
      var render = this.config.getIn(['detail', 'render']);

      if ((0, _isFunction2.default)(render)) {
        return render({
          value: value,
          record: record
        });
      }

      if ((0, _isArray2.default)(value)) {
        return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(value, function (v) {
          return _react.default.createElement(_react.default.Fragment, {
            key: v
          }, _this7.renderInDescriptionDefault({
            value: v,
            record: record
          }), _react.default.createElement("br", null));
        }));
      }

      return this.renderInDescriptionDefault({
        value: value,
        record: record
      });
    }
  }, {
    key: "renderInDescription",
    value: function renderInDescription(_ref19) {
      var value = _ref19.value,
          record = _ref19.record;
      var children = this.renderInDescriptionValue({
        value: value,
        record: record
      });
      var link = this.getDescriptionLink();

      if (link) {
        return _react.default.createElement(_RecordLink.default, {
          link: link,
          record: record
        }, children);
      }

      return children;
    }
  }, {
    key: "fetchValueOptions",
    value: function fetchValueOptions(parentFilteredValue) {
      var _this8 = this;

      var valueOptionsRequest = this.getValueOptionsRequest();

      if (valueOptionsRequest) {
        if (this.getParentKey()) {
          if (this.activeValueOptionsRequests[parentFilteredValue]) {
            return this.activeValueOptionsRequests[parentFilteredValue];
          }

          if (!this.activeValueOptionsRequests[parentFilteredValue] && !(0, _isUndefined2.default)(parentFilteredValue)) {
            var promise;

            if ((0, _isArray2.default)(parentFilteredValue)) {
              promise = Promise.all(parentFilteredValue.map(function (v) {
                if (_this8.filters.get(v)) {
                  return Promise.resolve(v);
                }

                return valueOptionsRequest(v).then(function (result) {
                  _this8.filters = _this8.filters.set(v, generateFilters(result));
                });
              })).then(function () {
                _this8.activeValueOptionsRequests[parentFilteredValue] = null;
              });
            } else {
              promise = valueOptionsRequest(parentFilteredValue).then(function (result) {
                _this8.filters = _this8.filters.set(parentFilteredValue, generateFilters(result));
                _this8.activeValueOptionsRequests[parentFilteredValue] = null;
              });
            }

            this.activeValueOptionsRequests[parentFilteredValue] = promise;
            return this.activeValueOptionsRequests[parentFilteredValue];
          }
        } else if (!this.activeValueOptionsRequests[parentFilteredValue]) {
          this.activeValueOptionsRequests[parentFilteredValue] = valueOptionsRequest().then(function (result) {
            _this8.filters = generateFilters(result);
            _this8.activeValueOptionsRequests[parentFilteredValue] = null;
          });
          return this.activeValueOptionsRequests[parentFilteredValue];
        } else {
          return this.activeValueOptionsRequests[parentFilteredValue];
        }
      }

      return Promise.reject();
    }
  }, {
    key: "fetchSearchValueOptions",
    value: function fetchSearchValueOptions(value) {
      var _this9 = this;

      var filterSearchRequest = this.getTableFilterSearchRequest();

      if (filterSearchRequest) {
        if (!this.activefilterSearchRequest) {
          this.activefilterSearchRequest = filterSearchRequest(value).then(function (result) {
            _this9.filters = _this9.filters.set('search', result);
            _this9.activefilterSearchRequest = null;
          });
          return this.activefilterSearchRequest;
        }
      }

      return Promise.reject();
    }
  }, {
    key: "renderInlineEdit",
    value: function renderInlineEdit() {
      return null;
    }
  }]);
  return Column;
}();

exports.default = Column;
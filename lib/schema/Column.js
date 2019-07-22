"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _makeCancelablePromise2 = _interopRequireDefault(require("@qt/web-core/lib/makeCancelablePromise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

var _TreeSelect = _interopRequireDefault(require("../components/FormItems/TreeSelect"));

require("./Column.less");

var FormItem = _form.default.Item;

function generateValidOptions(options) {
  if (options && options.size > 0) {
    return options.filter(function (o) {
      return !o.get('disableInFilter');
    }).map(function (o) {
      return o.set('children', generateValidOptions(o.get('children')));
    });
  }

  return options;
}

var Column = function () {
  function Column() {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Column);
    (0, _defineProperty2.default)(this, "renderFilterDropDown", function (_ref) {
      var setSelectedKeys = _ref.setSelectedKeys,
          selectedKeys = _ref.selectedKeys,
          confirm = _ref.confirm,
          clearFilters = _ref.clearFilters;
      return _react.default.createElement("div", {
        style: {
          padding: 8
        }
      }, _this.renderFilterDropDownContent({
        setSelectedKeys: setSelectedKeys,
        selectedKeys: selectedKeys,
        confirm: confirm,
        clearFilters: clearFilters
      }), _react.default.createElement("div", {
        className: "filter-dropdown-button-wrapper"
      }, _react.default.createElement(_button.default, {
        type: "primary",
        onClick: confirm,
        icon: "search",
        size: "small",
        style: {
          width: 90,
          marginRight: 8
        }
      }, "\u641C\u7D22"), _react.default.createElement(_button.default, {
        onClick: clearFilters,
        size: "small",
        style: {
          width: 90
        }
      }, "\u91CD\u7F6E")));
    });
    this.config = _immutable.default.fromJS((0, _objectSpread2.default)({}, config, {
      key: (0, _isArray2.default)(config.key) ? (0, _join2.default)(config.key, '.') : config.key
    }));
    var valueOptions = this.getValueOptions();

    if (valueOptions) {
      this.filters = generateValidOptions(valueOptions);
    } else if (this.getParentKey()) {
      this.filters = _immutable.default.Map();
    }
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
    key: "isPrimaryKey",
    value: function isPrimaryKey() {
      return this.config.get('primaryKey');
    }
  }, {
    key: "getTableTitle",
    value: function getTableTitle(_ref2) {
      var _this2 = this;

      var filtered = _ref2.filtered,
          filteredValue = _ref2.filteredValue;

      if (filtered) {
        if (this.canFilterRangeInTable()) {
          return "".concat(this.getTitle(), "\uFF08").concat(this.renderInTableValueDefault({
            value: (0, _get2.default)(filteredValue, '[0][0]')
          }) || '', " ~ ").concat(this.renderInTableValueDefault({
            value: (0, _get2.default)(filteredValue, '[0][1]')
          }) || '', "\uFF09");
        }

        if (this.canFilterMultipleInTable()) {
          return "".concat(this.getTitle(), "\uFF08").concat((0, _join2.default)((0, _map2.default)(filteredValue, function (v) {
            return _this2.renderInTableValueDefault({
              value: v
            }) || '';
          }), '，'), "\uFF09");
        }

        return "".concat(this.getTitle(), "\uFF08").concat(this.renderInTableValueDefault({
          value: filteredValue[0]
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
    key: "getFilters",
    value: function getFilters(parentFilteredValue) {
      var _this3 = this;

      if (this.getParentKey()) {
        if ((0, _isArray2.default)(parentFilteredValue)) {
          var list = _immutable.default.List(parentFilteredValue);

          var filters = list.map(function (v) {
            return _this3.filters.get(v);
          }).filter(function (v) {
            return !!v;
          });

          if (list.size !== filters.size) {
            return null;
          }

          return filters.flatten(true);
        }

        return this.filters.get(parentFilteredValue);
      }

      return this.filters;
    }
  }, {
    key: "getTableFilterKey",
    value: function getTableFilterKey() {
      return this.config.getIn(['table', 'filterKey']) || this.getKey();
    }
  }, {
    key: "getTableFilterComponentProps",
    value: function getTableFilterComponentProps() {
      return this.config.getIn(['table', 'filterComponentProps'], _immutable.default.Map());
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
    key: "canFilterInTable",
    value: function canFilterInTable() {
      return this.config.getIn(['table', 'filter']);
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
    key: "canRenderFilterDropDown",
    value: function canRenderFilterDropDown() {
      return false;
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
    value: function renderInTableValueDefault(_ref3) {
      var value = _ref3.value;
      var valueOptions = this.getValueOptions();

      if (valueOptions) {
        var option = valueOptions.find(function (o) {
          return o.get('value') === value;
        });

        if (option) {
          return option.get('text');
        }
      }

      return value;
    }
  }, {
    key: "renderInTableValue",
    value: function renderInTableValue(_ref4) {
      var _this4 = this;

      var value = _ref4.value,
          record = _ref4.record;
      var render = this.config.getIn(['table', 'render']);

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
          }, _this4.renderInTableValueDefault({
            value: v
          }), _react.default.createElement("br", null));
        }));
      }

      return this.renderInTableValueDefault({
        value: value,
        record: record
      });
    }
  }, {
    key: "renderInTable",
    value: function renderInTable(_ref5) {
      var value = _ref5.value,
          record = _ref5.record;
      var children = this.renderInTableValue({
        value: value,
        record: record
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
    key: "renderFilterDropDownContent",
    value: function renderFilterDropDownContent() {
      return null;
    }
  }, {
    key: "canShowInCreateFrom",
    value: function canShowInCreateFrom(_ref6) {
      var user = _ref6.user,
          value = _ref6.value,
          values = _ref6.values,
          record = _ref6.record;
      var creatable = this.config.getIn(['form', 'creatable']);

      if ((0, _isFunction2.default)(creatable)) {
        if (!user) {
          return false;
        }

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
    value: function canShowInEditFrom(_ref7) {
      var user = _ref7.user,
          value = _ref7.value,
          values = _ref7.values,
          record = _ref7.record;
      var creatable = this.config.getIn(['form', 'editable']);

      if ((0, _isFunction2.default)(creatable)) {
        if (!user) {
          return false;
        }

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
    key: "canShowEditInTable",
    value: function canShowEditInTable() {
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
    key: "getFormInitialValue",
    value: function getFormInitialValue() {
      return this.config.getIn(['form', 'initialValue']);
    }
  }, {
    key: "getFormPlaceholder",
    value: function getFormPlaceholder() {
      var select = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.config.getIn(['form', 'placeholder']) || "\u8BF7".concat(select ? '选择' : '输入').concat(this.getTitle());
    }
  }, {
    key: "getFormComponentProps",
    value: function getFormComponentProps() {
      return this.config.getIn(['form', 'componentProps'], _immutable.default.Map());
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
    key: "renderInFormItem",
    value: function renderInFormItem() {
      return null;
    }
  }, {
    key: "renderInForm",
    value: function renderInForm(_ref8) {
      var _this5 = this;

      var user = _ref8.user,
          record = _ref8.record,
          form = _ref8.form,
          isEdit = _ref8.isEdit;
      var getFieldsValue = form.getFieldsValue,
          getFieldDecorator = form.getFieldDecorator;
      var key = this.getFormKey();
      var values = getFieldsValue();
      var value = (0, _get2.default)(values, key);
      var parentValue = this.parentColumn ? (0, _get2.default)(values, this.parentColumn.getFormKey()) : null;

      if (!isEdit && !this.canShowInCreateFrom({
        user: user,
        record: record,
        value: value,
        values: values
      }) || isEdit && !this.canShowInEditFrom({
        user: user,
        record: record,
        value: value,
        values: values
      })) {
        return null;
      }

      var children;

      if (this.useValueOptionsInForm() && (this.getFilters(parentValue) || this.getValueOptionsRequest() || this.getFormSearchRequest())) {
        children = _react.default.createElement(_TreeSelect.default, {
          column: this,
          parentValue: parentValue
        });
      } else {
        children = this.renderInFormItem({
          user: user
        });
      }

      var initialValue = this.getFormInitialValue();

      if (isEdit) {
        var preValue = (0, _get2.default)(record, key);

        if ((0, _isArray2.default)(preValue)) {
          initialValue = (0, _map2.default)(preValue, function (v) {
            return _this5.formatFormFieldValue(v);
          });
        } else {
          initialValue = this.formatFormFieldValue(preValue);
        }
      }

      return _react.default.createElement(FormItem, {
        key: key,
        label: this.getTitle()
      }, getFieldDecorator(key, {
        initialValue: initialValue,
        validateFirst: true,
        onChange: this.childColumn ? function () {
          return form.setFieldsValue((0, _defineProperty2.default)({}, _this5.childColumn.getFormKey(), undefined));
        } : null,
        rules: [{
          required: this.isRequiredInForm(),
          message: "".concat(this.getTitle(), "\u4E0D\u80FD\u4E3A\u7A7A")
        }].concat((0, _toConsumableArray2.default)(this.getFormDefaultRules()), (0, _toConsumableArray2.default)(this.getFormRules().toArray())),
        valuePropName: this.getFormFiledValuePropName()
      })(children));
    }
  }, {
    key: "fetchValueOptions",
    value: function () {
      var _fetchValueOptions = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(parentFilteredValue) {
        var _this6 = this;

        var valueOptionsRequest, promise;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                valueOptionsRequest = this.getValueOptionsRequest();

                if (!valueOptionsRequest) {
                  _context.next = 14;
                  break;
                }

                if (!this.getParentKey()) {
                  _context.next = 11;
                  break;
                }

                if (this.activeValueOptionsRequest && !(0, _isEqual2.default)(this.activeValueOptionsRequest.parentFilteredValue, parentFilteredValue)) {
                  this.activeValueOptionsRequest.cancel();
                  this.activeValueOptionsRequest = null;
                }

                if (!(!this.activeValueOptionsRequest && !(0, _isUndefined2.default)(parentFilteredValue))) {
                  _context.next = 9;
                  break;
                }

                if ((0, _isArray2.default)(parentFilteredValue)) {
                  promise = Promise.all(parentFilteredValue.map(function (v) {
                    if (_this6.filters.get(v)) {
                      return Promise.resolve(v);
                    }

                    return valueOptionsRequest(v).then(function (result) {
                      _this6.filters = _this6.filters.set(v, generateValidOptions(_immutable.default.fromJS(result)));
                    });
                  })).then(function () {
                    _this6.activeValueOptionsRequest = null;
                  });
                } else {
                  promise = valueOptionsRequest(parentFilteredValue).then(function (result) {
                    _this6.filters = _this6.filters.set(parentFilteredValue, generateValidOptions(_immutable.default.fromJS(result)));
                    _this6.activeValueOptionsRequest = null;
                  });
                }

                this.activeValueOptionsRequest = (0, _makeCancelablePromise2.default)(promise);
                this.activeValueOptionsRequest.parentFilteredValue = parentFilteredValue;
                return _context.abrupt("return", this.activeValueOptionsRequest);

              case 9:
                _context.next = 14;
                break;

              case 11:
                if (this.activeValueOptionsRequest) {
                  _context.next = 14;
                  break;
                }

                this.activeValueOptionsRequest = valueOptionsRequest().then(function (result) {
                  _this6.filters = generateValidOptions(_immutable.default.fromJS(result));
                  _this6.activeValueOptionsRequest = null;
                });
                return _context.abrupt("return", this.activeValueOptionsRequest);

              case 14:
                return _context.abrupt("return", Promise.reject());

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchValueOptions(_x) {
        return _fetchValueOptions.apply(this, arguments);
      }

      return fetchValueOptions;
    }()
  }]);
  return Column;
}();

exports.default = Column;
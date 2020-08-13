"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _flatten2 = _interopRequireDefault(require("lodash/flatten"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _immutable = _interopRequireDefault(require("immutable"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
    disabledInFilter: generateValidOptions(options, 'disabledInFilter'),
    disabledInForm: generateValidOptions(options, 'disabledInForm')
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
    this.config = _immutable.default.fromJS(config);
    this.activeValueOptionsRequests = {};
    this.resetFilters();
  }

  (0, _createClass2.default)(Column, [{
    key: "getKey",
    value: function getKey() {
      if (!this.key) {
        this.key = this.config.get('key');

        if (this.key instanceof _immutable.default.List) {
          this.key = this.key.toArray();
        }
      }

      return this.key;
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
    key: "getValueOptionsSearchRequest",
    value: function getValueOptionsSearchRequest() {
      return this.config.get('valueOptionsSearchRequest');
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
    key: "isArray",
    value: function isArray() {
      return this.config.get('array');
    }
  }, {
    key: "getTableLink",
    value: function getTableLink() {
      return this.config.getIn(['table', 'link']);
    }
  }, {
    key: "getTableRender",
    value: function getTableRender() {
      return this.config.getIn(['table', 'render']);
    }
  }, {
    key: "getTableDefaultSortDirection",
    value: function getTableDefaultSortDirection() {
      return this.config.getIn(['table', 'defaultSortDirection']);
    }
  }, {
    key: "getTableFixedSortDirection",
    value: function getTableFixedSortDirection() {
      return this.config.getIn(['table', 'fixedSortDirection']);
    }
  }, {
    key: "getTableMaxLines",
    value: function getTableMaxLines() {
      return this.config.getIn(['table', 'maxLines']);
    }
  }, {
    key: "getTableColumnProps",
    value: function getTableColumnProps() {
      if (!this.tableColumnProps) {
        this.tableColumnProps = this.config.getIn(['table', 'columnProps'], _immutable.default.Map()).toJS();
      }

      return this.tableColumnProps;
    }
  }, {
    key: "getTableWidth",
    value: function getTableWidth() {
      return this.config.getIn(['table', 'columnProps', 'width'], this.config.getIn(['table', 'width'], 0));
    }
  }, {
    key: "getTableFixed",
    value: function getTableFixed() {
      return this.config.getIn(['table', 'columnProps', 'fixed'], this.config.getIn(['table', 'fixed'], false));
    }
  }, {
    key: "getTableSortDirections",
    value: function getTableSortDirections() {
      if (!this.sortDirections) {
        this.sortDirections = this.config.getIn(['table', 'columnProps', 'sortDirections'], this.config.getIn(['table', 'sortDirections'], _immutable.default.List())).toArray();
      }

      return this.sortDirections;
    }
  }, {
    key: "canSortInTable",
    value: function canSortInTable() {
      return this.getTableSortDirections().length > 0;
    }
  }, {
    key: "canShowInTable",
    value: function canShowInTable(params) {
      var invisible = this.config.getIn(['table', 'invisible']);

      if ((0, _isFunction2.default)(invisible)) {
        return !invisible(params);
      }

      return !invisible;
    }
  }, {
    key: "getUseValueOptionsSearchRequest",
    value: function getUseValueOptionsSearchRequest() {
      return this.config.get('useValueOptionsSearchRequest', Column.SEARCH_REQUEST_TYPES.ALL);
    }
  }, {
    key: "getFilters",
    value: function getFilters(parentFilteredValue) {
      var _this = this;

      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'normal';

      if (this.getParentKey() && key !== 'search') {
        if ((0, _isArray2.default)(parentFilteredValue)) {
          var filters = (0, _filter2.default)((0, _map2.default)(parentFilteredValue, function (v) {
            return _this.filters.getIn([v, key]);
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
    key: "getFilterOption",
    value: function getFilterOption(_ref) {
      var value = _ref.value,
          parentFilterValue = _ref.parentFilterValue;
      var filters = this.getFilters(parentFilterValue);
      return findOption(filters, value);
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
    key: "getFilterDefault",
    value: function getFilterDefault() {
      return this.config.getIn(['table', 'filterDefault']);
    }
  }, {
    key: "getFilterRequired",
    value: function getFilterRequired() {
      return this.config.getIn(['table', 'filterRequired']);
    }
  }, {
    key: "getFilterGroup",
    value: function getFilterGroup() {
      return this.config.getIn(['table', 'filterGroup'], '');
    }
  }, {
    key: "canFilter",
    value: function canFilter() {
      return this.config.getIn(['table', 'filter']);
    }
  }, {
    key: "canFilterExpandable",
    value: function canFilterExpandable() {
      return this.config.getIn(['table', 'filterExpandable']);
    }
  }, {
    key: "canFilterMultiple",
    value: function canFilterMultiple() {
      return this.config.getIn(['table', 'filterMultiple']);
    }
  }, {
    key: "canFilterRange",
    value: function canFilterRange() {
      return this.config.getIn(['table', 'filterRange']);
    }
  }, {
    key: "canFilterOutside",
    value: function canFilterOutside() {
      return this.config.getIn(['table', 'filterOutside'], true);
    }
  }, {
    key: "getFilterFormItemProps",
    value: function getFilterFormItemProps() {
      if (!this.filterFormItemProps) {
        this.filterFormItemProps = this.config.getIn(['table', 'filterFormItemProps'], _immutable.default.Map()).toJS();
      }

      return this.filterFormItemProps;
    }
  }, {
    key: "getFilterKey",
    value: function getFilterKey() {
      return this.config.getIn(['table', 'filterFormItemProps', 'name'], this.config.getIn(['table', 'filterKey'], this.getKey()));
    }
  }, {
    key: "getFilterFormItemComponentProps",
    value: function getFilterFormItemComponentProps() {
      if (!this.filterFormItemComponentProps) {
        this.filterFormItemComponentProps = this.config.getIn(['table', 'filterFormItemComponentProps'], _immutable.default.Map()).toJS();
      }

      return this.filterFormItemComponentProps;
    }
  }, {
    key: "canEdit",
    value: function canEdit(_ref2) {
      var user = _ref2.user,
          record = _ref2.record;
      return this.canShowInEditFrom({
        user: user,
        record: record
      }) && !this.isImmutableInForm({
        user: user,
        record: record
      });
    }
  }, {
    key: "getFormRender",
    value: function getFormRender() {
      return this.config.getIn(['form', 'render']);
    }
  }, {
    key: "isImmutableInForm",
    value: function isImmutableInForm(_ref3) {
      var user = _ref3.user,
          record = _ref3.record;
      var immutableInForm = this.config.getIn(['form', 'immutable']);

      if ((0, _isFunction2.default)(immutableInForm)) {
        return immutableInForm({
          user: user,
          record: record
        });
      }

      return immutableInForm;
    }
  }, {
    key: "canShowInCreateFrom",
    value: function canShowInCreateFrom(_ref4) {
      var user = _ref4.user;
      var creatable = this.config.getIn(['form', 'creatable']);

      if ((0, _isFunction2.default)(creatable)) {
        return creatable({
          user: user
        });
      }

      return creatable;
    }
  }, {
    key: "canShowInEditFrom",
    value: function canShowInEditFrom(_ref5) {
      var user = _ref5.user,
          record = _ref5.record;
      var editable = this.config.getIn(['form', 'editable']);

      if ((0, _isFunction2.default)(editable)) {
        return editable({
          user: user,
          record: record
        });
      }

      return editable;
    }
  }, {
    key: "canInlineEdit",
    value: function canInlineEdit() {
      return this.config.getIn(['form', 'inlineEdit']);
    }
  }, {
    key: "canFormItemExpandable",
    value: function canFormItemExpandable() {
      return this.config.getIn(['form', 'expandable'], false);
    }
  }, {
    key: "getFormRequired",
    value: function getFormRequired() {
      return this.config.getIn(['form', 'required'], false);
    }
  }, {
    key: "getFormPlaceholder",
    value: function getFormPlaceholder() {
      return this.config.getIn(['form', 'formItemComponentProps', 'placeholder'], this.config.getIn(['form', 'placeholder'], "\u8BF7\u8F93\u5165".concat(this.getTitle())));
    }
  }, {
    key: "getFormItemAvailableWhen",
    value: function getFormItemAvailableWhen() {
      return this.config.getIn(['form', 'availableWhen'], _immutable.default.Map());
    }
  }, {
    key: "getFormItemProps",
    value: function getFormItemProps() {
      if (!this.formItemProps) {
        this.formItemProps = this.config.getIn(['form', 'formItemProps'], _immutable.default.Map()).toJS();
      }

      return this.formItemProps;
    }
  }, {
    key: "getFormItemRules",
    value: function getFormItemRules() {
      if (!this.formItemRules) {
        this.formItemRules = this.config.getIn(['form', 'formItemProps', 'rules'], this.config.getIn(['form', 'rules'], _immutable.default.List())).toJS();
      }

      return this.formItemRules;
    }
  }, {
    key: "getFormItemName",
    value: function getFormItemName() {
      return this.config.getIn(['form', 'formItemProps', 'name'], this.config.getIn(['form', 'key'], this.getKey()));
    }
  }, {
    key: "getFormItemLabel",
    value: function getFormItemLabel() {
      return this.config.getIn(['form', 'formItemProps', 'label'], this.config.getIn(['form', 'label'], this.getTitle()));
    }
  }, {
    key: "getFormItemInitialValue",
    value: function getFormItemInitialValue() {
      return this.config.getIn(['form', 'formItemProps', 'initialValue'], this.config.getIn(['form', 'initialValue']));
    }
  }, {
    key: "getFormItemNormalizeInitialValue",
    value: function getFormItemNormalizeInitialValue() {
      return this.config.getIn(['form', 'normalizeInitialValue']);
    }
  }, {
    key: "getFormItemNormalizeInitialValueOptions",
    value: function getFormItemNormalizeInitialValueOptions() {
      return this.config.getIn(['form', 'normalizeInitialValueOptions']);
    }
  }, {
    key: "getFormItemComponentProps",
    value: function getFormItemComponentProps() {
      if (!this.formItemComponentProps) {
        this.formItemComponentProps = this.config.getIn(['form', 'formItemComponentProps'], _immutable.default.Map()).toJS();
      }

      return this.formItemComponentProps;
    }
  }, {
    key: "canShowInDescription",
    value: function canShowInDescription(_ref6) {
      var user = _ref6.user,
          record = _ref6.record;
      var invisible = this.config.getIn(['description', 'invisible']);

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
    key: "getDescriptionLink",
    value: function getDescriptionLink() {
      return this.config.getIn(['description', 'link']);
    }
  }, {
    key: "getDescriptionRender",
    value: function getDescriptionRender() {
      return this.config.getIn(['description', 'render']);
    }
  }, {
    key: "getDescriptionImageWidth",
    value: function getDescriptionImageWidth() {
      return this.config.getIn(['description', 'imageWidth'], 0);
    }
  }, {
    key: "getDescriptionItemProps",
    value: function getDescriptionItemProps() {
      if (!this.descriptionItemProps) {
        this.descriptionItemProps = this.config.getIn(['description', 'descriptionItemProps'], _immutable.default.Map()).toJS();
      }

      return this.descriptionItemProps;
    }
  }, {
    key: "fetchValueOptions",
    value: function fetchValueOptions(parentFilteredValue) {
      var _this2 = this;

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
                if (_this2.filters.get(v)) {
                  return Promise.resolve(v);
                }

                return valueOptionsRequest(v).then(function (result) {
                  _this2.filters = _this2.filters.set(v, generateFilters(result));
                });
              })).then(function () {
                _this2.activeValueOptionsRequests[parentFilteredValue] = null;
              });
            } else {
              promise = valueOptionsRequest(parentFilteredValue).then(function (result) {
                _this2.filters = _this2.filters.set(parentFilteredValue, generateFilters(result));
                _this2.activeValueOptionsRequests[parentFilteredValue] = null;
              });
            }

            this.activeValueOptionsRequests[parentFilteredValue] = promise;
            return this.activeValueOptionsRequests[parentFilteredValue];
          }
        } else if (!this.activeValueOptionsRequests[parentFilteredValue]) {
          this.activeValueOptionsRequests[parentFilteredValue] = valueOptionsRequest().then(function (result) {
            _this2.filters = generateFilters(result);
            _this2.activeValueOptionsRequests[parentFilteredValue] = null;
          });
          return this.activeValueOptionsRequests[parentFilteredValue];
        } else {
          return this.activeValueOptionsRequests[parentFilteredValue];
        }
      }

      return Promise.reject();
    }
  }]);
  return Column;
}();

exports.default = Column;
(0, _defineProperty2.default)(Column, "SEARCH_REQUEST_TYPES", {
  FILTER: 'filter',
  FORM: 'form',
  ALL: 'all'
});
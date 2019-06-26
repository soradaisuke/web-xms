"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _makeCancelablePromise2 = _interopRequireDefault(require("@qt/web-core/lib/makeCancelablePromise"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isArray2 = _interopRequireDefault(require("lodash/isArray"));

var _react = _interopRequireDefault(require("react"));

var _immutable = _interopRequireDefault(require("immutable"));

var _RecordLink = _interopRequireDefault(require("../components/RecordLink"));

require("./Column.less");

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
    } else if (this.isParentOnLeft()) {
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
    key: "getTableFilters",
    value: function getTableFilters(parentFilteredValue) {
      var _this2 = this;

      if (this.isParentOnLeft()) {
        if ((0, _isArray2.default)(parentFilteredValue)) {
          var list = _immutable.default.List(parentFilteredValue);

          var filters = list.map(function (v) {
            return _this2.filters.get(v);
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
    key: "isPrimaryKey",
    value: function isPrimaryKey() {
      return this.config.get('primaryKey');
    }
  }, {
    key: "isArray",
    value: function isArray() {
      return this.config.get('isArray');
    }
  }, {
    key: "isParentOnLeft",
    value: function isParentOnLeft() {
      return this.config.get('parentOnLeft');
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

        return !invisible(user);
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
    value: function renderInTableValueDefault(_ref2) {
      var value = _ref2.value;
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
    value: function renderInTableValue(_ref3) {
      var _this3 = this;

      var value = _ref3.value,
          record = _ref3.record;
      var render = this.config.getIn(['table', 'render']);

      if ((0, _isFunction2.default)(render)) {
        return render({
          value: value,
          record: record
        });
      }

      if (this.isArray() && (0, _isArray2.default)(value)) {
        return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(value, function (v) {
          return _react.default.createElement(_react.default.Fragment, {
            key: v
          }, _this3.renderInTableValueDefault({
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
    value: function renderInTable(_ref4) {
      var value = _ref4.value,
          record = _ref4.record;
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
    key: "fetchValueOptions",
    value: function () {
      var _fetchValueOptions = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(parentFilteredValue) {
        var _this4 = this;

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

                if (!this.isParentOnLeft()) {
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
                    if (_this4.filters.get(v)) {
                      return Promise.resolve(v);
                    }

                    return valueOptionsRequest(v).then(function (result) {
                      _this4.filters = _this4.filters.set(v, generateValidOptions(_immutable.default.fromJS(result)));
                    });
                  })).then(function () {
                    _this4.activeValueOptionsRequest = null;
                  });
                } else {
                  promise = valueOptionsRequest(parentFilteredValue).then(function (result) {
                    _this4.filters = _this4.filters.set(parentFilteredValue, generateValidOptions(_immutable.default.fromJS(result)));
                    _this4.activeValueOptionsRequest = null;
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
                  _this4.filters = generateValidOptions(_immutable.default.fromJS(result));
                  _this4.activeValueOptionsRequest = null;
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
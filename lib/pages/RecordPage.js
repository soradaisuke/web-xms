"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/descriptions/style");

var _descriptions = _interopRequireDefault(require("antd/lib/descriptions"));

require("antd/lib/message/style");

var _message2 = _interopRequireDefault(require("antd/lib/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/collapse/style");

var _collapse = _interopRequireDefault(require("antd/lib/collapse"));

require("antd/lib/tabs/style");

var _tabs = _interopRequireDefault(require("antd/lib/tabs"));

var _find2 = _interopRequireDefault(require("lodash/find"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _classnames = _interopRequireDefault(require("classnames"));

var _Table = _interopRequireDefault(require("../schema/Table"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

var _Page = _interopRequireDefault(require("./Page"));

var _showError = _interopRequireDefault(require("../utils/showError"));

var TabPane = _tabs.default.TabPane;
var Panel = _collapse.default.Panel;

var RecordPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordPage, _React$PureComponent);

  function RecordPage() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, RecordPage);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(RecordPage)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      isLoading: false,
      error: null
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "fetch", (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
      var fetch;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fetch = _this.props.fetch;

              if (fetch) {
                _this.setState({
                  isLoading: true,
                  error: null
                });

                fetch().then(function () {
                  _this.setState({
                    isLoading: false,
                    error: null
                  });
                }).catch(function (e) {
                  return _this.setState({
                    isLoading: false,
                    error: e
                  });
                });
              }

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRecord", function () {
      var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee2(_ref2) {
        var promise, loadingMessage, _ref2$throwError, throwError, hide;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                promise = _ref2.promise, loadingMessage = _ref2.loadingMessage, _ref2$throwError = _ref2.throwError, throwError = _ref2$throwError === void 0 ? false : _ref2$throwError;

                if (loadingMessage) {
                  hide = _message2.default.loading(loadingMessage, 0);
                }

                _context2.prev = 2;
                _context2.next = 5;
                return promise;

              case 5:
                if (hide) {
                  hide();
                }

                _context2.next = 14;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);

                if (hide) {
                  hide();
                }

                (0, _showError.default)(_context2.t0.message);

                if (!throwError) {
                  _context2.next = 14;
                  break;
                }

                throw _context2.t0;

              case 14:
                _this.fetch();

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[2, 8]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
    return _this;
  }

  (0, _createClass2.default)(RecordPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetch();
    }
  }, {
    key: "renderAction",
    value: function renderAction(action) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          column = _ref4.column,
          inline = _ref4.inline;

      var _this$props = this.props,
          user = _this$props.user,
          remove = _this$props.remove,
          edit = _this$props.edit,
          record = _this$props.record,
          table = _this$props.table,
          matchParams = _this$props.match.params;
      var props = {
        user: user,
        matchParams: matchParams,
        remove: remove,
        edit: edit,
        table: table,
        record: record,
        inline: inline,
        column: column,
        confirm: this.fetch,
        submit: this.updateRecord
      };
      return action.render(props);
    }
  }, {
    key: "renderActions",
    value: function renderActions() {
      var _this2 = this;

      var _this$props2 = this.props,
          actions = _this$props2.actions,
          user = _this$props2.user;

      if (!actions) {
        return null;
      }

      var validActions = (0, _filter2.default)(actions, function (action) {
        return action.isVisible(user);
      });

      if (validActions.length === 0) {
        return null;
      }

      return _react.default.createElement(_descriptions.default.Item, {
        label: "\u64CD\u4F5C"
      }, validActions.map(function (action) {
        return _this2.renderAction(action);
      }));
    }
  }, {
    key: "renderDescriptionItem",
    value: function renderDescriptionItem(column) {
      var _this$props3 = this.props,
          user = _this$props3.user,
          record = _this$props3.record,
          actions = _this$props3.actions;

      if (!column.canShowInDescription({
        user: user,
        record: record
      })) {
        return null;
      }

      var children = column.renderInDescription({
        record: record,
        value: (0, _get2.default)(record, column.getKey())
      });
      var editAction = (0, _find2.default)(actions, function (action) {
        return action instanceof _EditAction.default;
      });

      if (column.canInlineEdit() && editAction) {
        var action = this.renderAction(editAction, {
          record: record,
          column: column,
          inline: true
        });

        if (action) {
          children = action;
        }
      }

      return _react.default.createElement(_descriptions.default.Item, {
        label: column.getTitle(),
        key: column.getKey()
      }, children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this3 = this;

      var _this$props4 = this.props,
          record = _this$props4.record,
          inline = _this$props4.inline,
          table = _this$props4.table,
          bordered = _this$props4.bordered;

      if (!record || !table) {
        return null;
      }

      return _react.default.createElement(_card.default, {
        title: "\u8BE6\u60C5",
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, _react.default.createElement(_descriptions.default, {
        bordered: bordered,
        column: {
          xxl: 2,
          xl: 2,
          lg: 2,
          md: 1,
          sm: 1,
          xs: 1
        }
      }, table.getColumns().map(function (column) {
        return _this3.renderDescriptionItem(column);
      }), this.renderActions()));
    }
  }, {
    key: "renderRouteChunk",
    value: function renderRouteChunk(chunk) {
      var _this$props5 = this.props,
          layout = _this$props5.layout,
          inline = _this$props5.inline;

      if (chunk && chunk.length) {
        var chunkLayout = chunk[0].layout || layout;

        switch (chunkLayout) {
          case 'collapse':
            return _react.default.createElement(_card.default, {
              key: chunk[0].path,
              className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
            }, _react.default.createElement(_collapse.default, null, (0, _map2.default)(chunk, function (_ref5) {
              var Component = _ref5.component,
                  path = _ref5.path,
                  _ref5$title = _ref5.title,
                  title = _ref5$title === void 0 ? '' : _ref5$title;
              return _react.default.createElement(Panel, {
                header: title,
                key: path
              }, _react.default.createElement(Component, {
                inline: true
              }));
            })));

          case 'tab':
            return _react.default.createElement(_card.default, {
              key: chunk[0].path,
              className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
            }, _react.default.createElement(_tabs.default, null, (0, _map2.default)(chunk, function (_ref6) {
              var Component = _ref6.component,
                  path = _ref6.path,
                  _ref6$title = _ref6.title,
                  title = _ref6$title === void 0 ? '' : _ref6$title;
              return _react.default.createElement(TabPane, {
                tab: title,
                key: path
              }, _react.default.createElement(Component, {
                inline: true
              }));
            })));

          case 'card':
          default:
            return (0, _map2.default)(chunk, function (_ref7) {
              var Component = _ref7.component,
                  path = _ref7.path,
                  _ref7$title = _ref7.title,
                  title = _ref7$title === void 0 ? '' : _ref7$title;
              return _react.default.createElement(_card.default, {
                key: path,
                title: title,
                className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
              }, _react.default.createElement(Component, {
                inline: true
              }));
            });
        }
      }

      return null;
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes() {
      var _this4 = this;

      var _this$props6 = this.props,
          routes = _this$props6.routes,
          layout = _this$props6.layout;

      if (routes && routes.length) {
        return (0, _map2.default)((0, _reduce2.default)(routes, function (result, route) {
          if (result.length === 0) {
            result.push([route]);
          } else {
            var routeLayout = route.layout || layout;
            var last = result[result.length - 1];
            var lastLayout = last[0].layout || layout;

            if (routeLayout === lastLayout) {
              last.push(route);
            } else {
              result.push([route]);
            }
          }

          return result;
        }, []), function (chunk) {
          return _this4.renderRouteChunk(chunk);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          Component = _this$props7.component,
          inline = _this$props7.inline;
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          error = _this$state.error;
      return _react.default.createElement(_Page.default, {
        isLoading: isLoading,
        isError: !!error,
        errorMessage: error ? error.message : '',
        showWatermark: !inline
      }, Component ? _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, _react.default.createElement(Component, null)) : null, this.renderContent(), this.renderRoutes());
    }
  }]);
  return RecordPage;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordPage, "displayName", 'RecordPage');
(0, _defineProperty2.default)(RecordPage, "propTypes", {
  history: _propTypes.default.shape({
    push: _propTypes.default.func.isRequired
  }).isRequired,
  match: _propTypes.default.shape({
    params: _propTypes.default.shape({}).isRequired
  }).isRequired,
  bordered: _propTypes.default.bool,
  table: _propTypes.default.instanceOf(_Table.default),
  actions: _propTypes.default.array,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  fetch: _propTypes.default.func,
  remove: _propTypes.default.func,
  edit: _propTypes.default.func,
  record: _propTypes.default.object,
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    component: _propTypes.default.bode
  })),
  inline: _propTypes.default.bool,
  layout: _propTypes.default.oneOf(['card', 'tab', 'collapse']),
  user: _propTypes.default.instanceOf(_immutable.default.Map)
});
(0, _defineProperty2.default)(RecordPage, "defaultProps", {
  actions: null,
  bordered: false,
  table: null,
  component: null,
  routes: [],
  inline: false,
  layout: 'card',
  user: null,
  fetch: null,
  remove: null,
  edit: null,
  record: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordPage);

exports.default = _default;
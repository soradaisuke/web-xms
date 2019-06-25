"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

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

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Page = _interopRequireDefault(require("./Page"));

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
      isError: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onChangeTabs", function () {
      var history = _this.props.history;
      history.push(window.location.pathname);
    });
    return _this;
  }

  (0, _createClass2.default)(RecordPage, [{
    key: "renderRoutes",
    value: function renderRoutes() {
      var _this$props = this.props,
          routes = _this$props.routes,
          inlineLayout = _this$props.inlineLayout,
          inline = _this$props.inline;

      if (routes && routes.length) {
        switch (inlineLayout) {
          case 'collapse':
            return _react.default.createElement(_card.default, {
              className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
            }, _react.default.createElement(_collapse.default, null, (0, _map2.default)(routes, function (_ref) {
              var Component = _ref.component,
                  path = _ref.path,
                  _ref$title = _ref.title,
                  title = _ref$title === void 0 ? '' : _ref$title;
              return _react.default.createElement(Panel, {
                header: title,
                key: path
              }, _react.default.createElement(Component, {
                inline: true
              }));
            })));

          case 'tab':
            return _react.default.createElement(_card.default, {
              className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
            }, _react.default.createElement(_tabs.default, {
              onChange: this.onChangeTabs
            }, (0, _map2.default)(routes, function (_ref2) {
              var Component = _ref2.component,
                  path = _ref2.path,
                  _ref2$title = _ref2.title,
                  title = _ref2$title === void 0 ? '' : _ref2$title;
              return _react.default.createElement(TabPane, {
                tab: title,
                key: path
              }, _react.default.createElement(Component, {
                inline: true
              }));
            })));

          case 'card':
          default:
            return (0, _map2.default)(routes, function (_ref3) {
              var Component = _ref3.component,
                  path = _ref3.path,
                  _ref3$title = _ref3.title,
                  title = _ref3$title === void 0 ? '' : _ref3$title;
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
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          Component = _this$props2.component,
          inline = _this$props2.inline;
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          isError = _this$state.isError;
      return _react.default.createElement(_Page.default, {
        isLoading: isLoading,
        isError: isError
      }, Component ? _react.default.createElement(_card.default, {
        className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
      }, _react.default.createElement(Component, null)) : null, this.renderRoutes());
    }
  }]);
  return RecordPage;
}(_react.default.PureComponent);

exports.default = RecordPage;
(0, _defineProperty2.default)(RecordPage, "displayName", 'RecordPage');
(0, _defineProperty2.default)(RecordPage, "propTypes", {
  history: _propTypes.default.shape({
    push: _propTypes.default.func.isRequired
  }).isRequired,
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    component: _propTypes.default.bode
  })),
  inline: _propTypes.default.bool,
  inlineLayout: _propTypes.default.oneOf(['card', 'tab', 'collapse'])
});
(0, _defineProperty2.default)(RecordPage, "defaultProps", {
  component: null,
  routes: [],
  inline: false,
  inlineLayout: 'card'
});
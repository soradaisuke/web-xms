"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Page = _interopRequireDefault(require("./Page"));

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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      isLoading: false,
      isError: false
    });
    return _this;
  }

  (0, _createClass2.default)(RecordPage, [{
    key: "renderRoutes",
    value: function renderRoutes() {
      var routes = this.props.routes;

      if (routes && routes.length) {
        return (0, _map2.default)(routes, function (_ref) {
          var Component = _ref.component,
              path = _ref.path,
              _ref$title = _ref.title,
              title = _ref$title === void 0 ? '' : _ref$title;
          return _react.default.createElement(_react.default.Fragment, {
            key: path
          }, title && _react.default.createElement("span", {
            style: {
              fontSize: '20px',
              fontWeight: 'bold',
              marginTop: '10px'
            }
          }, title), _react.default.createElement(Component, null));
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var Component = this.props.component;
      var _this$state = this.state,
          isLoading = _this$state.isLoading,
          isError = _this$state.isError;
      return _react.default.createElement(_Page.default, {
        isLoading: isLoading,
        isError: isError
      }, Component ? _react.default.createElement(Component, null) : null, this.renderRoutes());
    }
  }]);
  return RecordPage;
}(_react.default.PureComponent);

exports.default = RecordPage;
(0, _defineProperty2.default)(RecordPage, "displayName", 'RecordPage');
(0, _defineProperty2.default)(RecordPage, "propTypes", {
  component: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.func]),
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    component: _propTypes.default.bode
  }))
});
(0, _defineProperty2.default)(RecordPage, "defaultProps", {
  component: null,
  routes: []
});
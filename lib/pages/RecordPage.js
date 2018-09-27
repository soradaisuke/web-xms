"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Page = _interopRequireDefault(require("./Page"));

var RecordPage = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordPage, _React$PureComponent);

  function RecordPage(props) {
    var _this;

    (0, _classCallCheck2.default)(this, RecordPage);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RecordPage).call(this, props));
    var component = props.component;
    _this.state = {
      isError: false,
      isLoading: !component
    };
    return _this;
  }

  (0, _createClass2.default)(RecordPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var component = this.props.component;

      if (!component) {
        this.fetch();
      }
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes() {
      var routes = this.props.routes;

      if (routes && routes.length === 1) {
        var Component = routes[0].component;
        return _react.default.createElement(Component, null);
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
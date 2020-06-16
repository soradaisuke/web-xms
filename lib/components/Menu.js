"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRouterDom = require("react-router-dom");

var _icons = require("@ant-design/icons");

var _compatible = require("@ant-design/compatible");

var _reselect = require("reselect");

require("./Menu.less");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SubMenu = _menu.default.SubMenu;
var validMenues = (0, _filter2.default)(function (_ref) {
  var title = _ref.title,
      inline = _ref.inline;
  return !!title && !inline;
});

function findNextKey(_ref2) {
  var pathname = _ref2.pathname,
      routes = _ref2.routes,
      selectedKeys = _ref2.selectedKeys,
      openKeys = _ref2.openKeys;
  (0, _forEach2.default)(routes, function (route) {
    if ((0, _reactRouterDom.matchPath)(pathname, {
      path: route.path
    })) {
      selectedKeys.push(route.path);
      var subMenues = validMenues(route.routes);

      if (subMenues.length > 0) {
        openKeys.push(route.path);
        findNextKey({
          pathname: pathname,
          routes: subMenues,
          selectedKeys: selectedKeys,
          openKeys: openKeys
        });
      }
    }
  });
}

var selector = (0, _reselect.createSelector)([function (props) {
  return props.location.pathname;
}, function (props) {
  return props.routes;
}], function (pathname, routes) {
  var selectedKeys = [];
  var openKeys = [];
  findNextKey({
    pathname: pathname,
    routes: routes,
    selectedKeys: selectedKeys,
    openKeys: openKeys
  });
  return {
    selectedKeys: selectedKeys,
    openKeys: openKeys
  };
});

function renderMenus(routes) {
  return validMenues(routes).map(function (_ref3) {
    var path = _ref3.path,
        title = _ref3.title,
        childRoutes = _ref3.routes;
    var subRoutes = validMenues(childRoutes);

    if (subRoutes.length > 0) {
      return _react.default.createElement(SubMenu, {
        key: path,
        title: title
      }, renderMenus(subRoutes));
    }

    return _react.default.createElement(_menu.default.Item, {
      key: path
    }, _react.default.createElement(_reactRouterDom.Link, {
      to: path
    }, title));
  });
}

var NavMenu = function (_React$PureComponent) {
  (0, _inherits2.default)(NavMenu, _React$PureComponent);

  var _super = _createSuper(NavMenu);

  function NavMenu() {
    var _this;

    (0, _classCallCheck2.default)(this, NavMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      collapsed: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickCollapse", function () {
      var collapsed = _this.state.collapsed;

      _this.setState({
        collapsed: !collapsed
      });
    });
    return _this;
  }

  (0, _createClass2.default)(NavMenu, [{
    key: "render",
    value: function render() {
      var collapsed = this.state.collapsed;

      var _selector = selector(this.props),
          selectedKeys = _selector.selectedKeys,
          openKeys = _selector.openKeys;

      var routes = this.props.routes;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('xms-side-menu', collapsed ? 'collapsed' : '')
      }, _react.default.createElement(_menu.default, {
        className: "xms-menu",
        mode: "inline",
        selectedKeys: selectedKeys,
        defaultOpenKeys: openKeys
      }, renderMenus(routes)), _react.default.createElement(_compatible.Icon, {
        className: "xms-collapse",
        type: collapsed ? _react.default.createElement(_icons.DoubleRightOutlined, null) : _react.default.createElement(_icons.DoubleLeftOutlined, null),
        onClick: this.onClickCollapse
      }));
    }
  }]);
  return NavMenu;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(NavMenu, "propTypes", {
  location: _propTypes.default.object.isRequired,
  routes: _propTypes.default.array.isRequired
});

var _default = (0, _reactRouterDom.withRouter)(NavMenu);

exports.default = _default;
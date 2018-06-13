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

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

require("./NavMenu.less");

function MenuItem(_ref) {
  var path = _ref.path,
      navIcon = _ref.navIcon,
      navTitle = _ref.navTitle,
      component = _ref.component;

  if (!navTitle || !component) {
    return null;
  }

  return _react.default.createElement(_menu.default.Item, {
    key: path
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: path
  }, !!navIcon && _react.default.createElement(_icon.default, {
    type: navIcon
  }), navTitle));
}

MenuItem.propTypes = {
  component: _propTypes.default.node.isRequired,
  navTitle: _propTypes.default.string.isRequired,
  path: _propTypes.default.string.isRequired,
  navIcon: _propTypes.default.string
};
MenuItem.defaultProps = {
  navIcon: ''
};

function SubMenu(_ref2) {
  var path = _ref2.path,
      navTitle = _ref2.navTitle,
      navIcon = _ref2.navIcon,
      routes = _ref2.routes;
  var items = (0, _filter2.default)(routes.map(function (route) {
    return MenuItem(route);
  }), function (i) {
    return i;
  });

  if (items.length === 0) {
    return null;
  }

  return _react.default.createElement(_menu.default.SubMenu, {
    key: path,
    title: _react.default.createElement("span", null, !!navIcon && _react.default.createElement(_icon.default, {
      type: navIcon
    }), navTitle)
  }, items);
}

SubMenu.propTypes = {
  navTitle: _propTypes.default.string.isRequired,
  path: _propTypes.default.string.isRequired,
  routes: _propTypes.default.array.isRequired,
  navIcon: _propTypes.default.string
};
SubMenu.defaultProps = {
  navIcon: ''
};

var NavMenu = function (_React$PureComponent) {
  (0, _inherits2.default)(NavMenu, _React$PureComponent);

  function NavMenu() {
    var _getPrototypeOf2;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, NavMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NavMenu)).call.apply(_getPrototypeOf2, [this].concat(args))), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      selectedKeys: []
    }), _temp));
  }

  (0, _createClass2.default)(NavMenu, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_menu.default, {
        className: "xms-nav-menu",
        theme: "dark",
        mode: "horizontal",
        selectedKeys: this.state.selectedKeys
      }, this.props.routes.map(function (route) {
        if (route.routes && route.routes.length > 0) {
          return SubMenu(route);
        }

        return MenuItem(route);
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var pathname = nextProps.pathname,
          routes = nextProps.routes;
      var selectedKeys = [];
      (0, _forEach2.default)(routes, function (route) {
        if ((0, _reactRouter.matchPath)(pathname, {
          path: route.path,
          exact: !!route.component
        })) {
          selectedKeys.push(route.path);

          if (route.routes && route.routes.length > 0) {
            (0, _forEach2.default)(route.routes, function (childRoute) {
              if ((0, _reactRouter.matchPath)(pathname, {
                path: childRoute.path,
                exact: !!childRoute.component
              })) {
                selectedKeys.push(childRoute.path);
              }
            });
          }
        }
      });
      return {
        selectedKeys: selectedKeys
      };
    }
  }]);
  return NavMenu;
}(_react.default.PureComponent);

exports.default = NavMenu;
(0, _defineProperty2.default)(NavMenu, "propTypes", {
  pathname: _propTypes.default.string.isRequired,
  routes: _propTypes.default.array.isRequired
});
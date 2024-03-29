"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/icon/style");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/menu/style");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

var _filter2 = _interopRequireDefault(require("lodash/fp/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRouterDom = require("react-router-dom");

var _reselect = require("reselect");

require("./Menu.less");

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

  function NavMenu() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, NavMenu);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(NavMenu)).call.apply(_getPrototypeOf2, [this].concat(args)));
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
      }, renderMenus(routes)), _react.default.createElement(_icon.default, {
        className: "xms-collapse",
        type: "double-".concat(collapsed ? 'right' : 'left'),
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
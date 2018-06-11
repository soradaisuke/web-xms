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

var _tail2 = _interopRequireDefault(require("lodash/tail"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _antd = require("antd");

var _NavMenu = _interopRequireDefault(require("./NavMenu.less"));

function MenuItem(_ref) {
  var path = _ref.path,
      icon = _ref.icon,
      title = _ref.title;

  if ((0, _includes2.default)(path, ':')) {
    return null;
  }

  return _react.default.createElement(_antd.Menu.Item, {
    key: path
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: path
  }, !!icon && _react.default.createElement(_antd.Icon, {
    type: icon
  }), title));
}

MenuItem.propTypes = {
  path: _propTypes.default.string.isRequired,
  icon: _propTypes.default.string,
  title: _propTypes.default.string
};
MenuItem.defaultProps = {
  icon: '',
  title: ''
};

function SubMenu(_ref2) {
  var path = _ref2.path,
      title = _ref2.title,
      icon = _ref2.icon,
      routes = _ref2.routes;
  return _react.default.createElement(_antd.Menu.SubMenu, {
    key: path,
    title: _react.default.createElement("span", null, !!icon && _react.default.createElement(_antd.Icon, {
      type: icon
    }), title)
  }, routes.map(function (route) {
    return MenuItem({
      path: "".concat(path).concat(route.path),
      icon: route.icon,
      title: route.title
    });
  }));
}

SubMenu.propTypes = {
  path: _propTypes.default.string.isRequired,
  routes: _propTypes.default.array.isRequired,
  icon: _propTypes.default.string,
  title: _propTypes.default.string
};
SubMenu.defaultProps = {
  icon: '',
  title: ''
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
      return _react.default.createElement(_antd.Menu, {
        className: _NavMenu.default.navMenu,
        theme: "dark",
        mode: "horizontal",
        selectedKeys: this.state.selectedKeys
      }, this.props.routes.map(function (_ref3) {
        var path = _ref3.path,
            title = _ref3.title,
            icon = _ref3.icon,
            routes = _ref3.routes;

        if (routes && routes.length > 0 && (0, _filter2.default)(routes, function (route) {
          return !(0, _includes2.default)(route.path, ':');
        }).length > 0) {
          return SubMenu({
            path: path,
            title: title,
            icon: icon,
            routes: routes
          });
        }

        return MenuItem({
          path: path,
          icon: icon,
          title: title
        });
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      var selectedKeys = [];
      var paths = (0, _tail2.default)((0, _split2.default)(nextProps.pathname, '/'));
      (0, _forEach2.default)(nextProps.routes, function (_ref4) {
        var path = _ref4.path,
            routes = _ref4.routes;

        if (path === "/".concat(paths[0])) {
          selectedKeys.push(path);

          if (routes && routes.length > 0) {
            (0, _forEach2.default)(routes, function (_ref5) {
              var childPath = _ref5.path;

              if (childPath === "/".concat(paths[1])) {
                selectedKeys.push("".concat(path).concat(childPath));
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
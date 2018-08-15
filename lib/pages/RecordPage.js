"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
      isError: false,
      isLoading: true
    });
    return _this;
  }

  (0, _createClass2.default)(RecordPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetch();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.recordId !== this.props.recordId) {
        this.fetch();
      }
    }
  }, {
    key: "fetch",
    value: function () {
      var _fetch = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  isLoading: true
                });
                _context.prev = 1;
                _context.next = 4;
                return this.props.fetch({
                  id: this.props.recordId
                });

              case 4:
                this.setState({
                  isError: false,
                  isLoading: false
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                this.setState({
                  isError: true,
                  isLoading: false
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      return function fetch() {
        return _fetch.apply(this, arguments);
      };
    }()
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_Page.default, {
        isLoading: this.state.isLoading,
        isError: this.state.isError
      }, _react.default.createElement(_form.default, {
        horizontal: "true",
        onSubmit: this.okHandler
      }, this.props.children));
    }
  }]);
  return RecordPage;
}(_react.default.PureComponent);

exports.default = RecordPage;
(0, _defineProperty2.default)(RecordPage, "displayName", 'RecordPage');
(0, _defineProperty2.default)(RecordPage, "propTypes", {
  fetch: _propTypes.default.func.isRequired,
  recordId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  children: _propTypes.default.node
});
(0, _defineProperty2.default)(RecordPage, "defaultProps", {
  children: null
});
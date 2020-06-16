"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _dva = require("dva");

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _RecordForm = _interopRequireDefault(require("./RecordForm"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var RecordModal = function (_React$PureComponent) {
  (0, _inherits2.default)(RecordModal, _React$PureComponent);

  var _super = _createSuper(RecordModal);

  function RecordModal() {
    var _this;

    (0, _classCallCheck2.default)(this, RecordModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onOk", function () {
      if (_this.form) {
        return _this.form.onOk();
      }

      return Promise.resolve();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onVisibleChange", function () {
      var _ref = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(visibility) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(visibility && _this.form)) {
                  _context.next = 3;
                  break;
                }

                _context.next = 3;
                return _this.form.reset();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onRef", function (ref) {
      _this.form = ref;
    });
    return _this;
  }

  (0, _createClass2.default)(RecordModal, [{
    key: "isEdit",
    value: function isEdit() {
      var _this$props = this.props,
          record = _this$props.record,
          records = _this$props.records;
      return record && Object.keys(record).length > 0 || records && records.length > 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          title = _this$props2.title,
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["children", "title"]);
      var defaultTitle = this.isEdit() ? '编辑' : '添加';
      return _react.default.createElement(_ActivatorModal.default, (0, _extends2.default)({}, this.props, {
        activator: children,
        title: title || defaultTitle,
        onOk: this.onOk,
        onVisibleChange: this.onVisibleChange
      }), _react.default.createElement(_RecordForm.default, (0, _extends2.default)({}, props, {
        onRef: this.onRef
      })));
    }
  }]);
  return RecordModal;
}(_react.default.PureComponent);

(0, _defineProperty2.default)(RecordModal, "displayName", 'RecordModal');
(0, _defineProperty2.default)(RecordModal, "propTypes", {
  children: _propTypes.default.node.isRequired,
  onOk: _propTypes.default.func.isRequired,
  checkVisibility: _propTypes.default.bool,
  user: _propTypes.default.instanceOf(_immutable.default.Map),
  columns: _propTypes.default.instanceOf(_immutable.default.List),
  title: _propTypes.default.string,
  record: _propTypes.default.object,
  records: _propTypes.default.array
});
(0, _defineProperty2.default)(RecordModal, "defaultProps", {
  title: '',
  checkVisibility: true,
  columns: _immutable.default.List(),
  record: null,
  records: null,
  user: null
});

var mapStateToProps = function mapStateToProps(state) {
  return {
    user: state.user
  };
};

var _default = (0, _dva.connect)(mapStateToProps)(RecordModal);

exports.default = _default;
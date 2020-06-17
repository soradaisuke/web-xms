"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _formatColumnsSubmitValues = _interopRequireDefault(require("../utils/formatColumnsSubmitValues"));

var _FormContext = _interopRequireDefault(require("../contexts/FormContext"));

var _usePageConfigContext = _interopRequireDefault(require("../hooks/usePageConfigContext"));

var formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    },
    md: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    },
    md: {
      span: 18
    }
  }
};

function RecordModal(_ref) {
  var children = _ref.children,
      onOk = _ref.onOk,
      checkVisibility = _ref.checkVisibility,
      columns = _ref.columns,
      title = _ref.title,
      record = _ref.record,
      records = _ref.records,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "onOk", "checkVisibility", "columns", "title", "record", "records"]);

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var user = (0, _useUser.default)();

  var _usePageConfig = (0, _usePageConfigContext.default)(),
      formProps = _usePageConfig.formProps;

  var isEdit = (0, _react.useMemo)(function () {
    return record && Object.keys(record).length > 0 || records && records.length > 0;
  }, [record, records]);
  var defaultTilte = isEdit ? '编辑' : '新建';
  var onVisibleChange = (0, _useEventCallback2.default)(function (visibility) {
    if (visibility && form) {
      form.resetFields();
    }
  }, [form]);
  var onSubmit = (0, _useEventCallback2.default)(function () {
    return form.validateFields().then(function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(values) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return onOk((0, _formatColumnsSubmitValues.default)({
                  columns: columns,
                  values: values
                }));

              case 3:
                return _context.abrupt("return", true);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), function () {
      return Promise.reject();
    });
  }, [form, onOk, columns]);
  return _react.default.createElement(_FormContext.default.Provider, {
    value: form
  }, _react.default.createElement(_ActivatorModal.default, (0, _extends2.default)({}, props, {
    activator: children,
    title: title || defaultTilte,
    onOk: onSubmit,
    onVisibleChange: onVisibleChange
  }), _react.default.createElement(_form.default, (0, _extends2.default)({}, formItemLayout, formProps, {
    form: form
  }), columns.map(function (column) {
    return column.renderInForm({
      user: user,
      record: record,
      records: records,
      form: form,
      isEdit: isEdit,
      checkVisibility: checkVisibility
    });
  }))));
}

RecordModal.propTypes = {
  children: _propTypes.default.node.isRequired,
  onOk: _propTypes.default.func.isRequired,
  checkVisibility: _propTypes.default.bool,
  columns: _propTypes.default.instanceOf(_immutable.default.List),
  title: _propTypes.default.string,
  record: _propTypes.default.object,
  records: _propTypes.default.array
};
RecordModal.defaultProps = {
  title: '',
  checkVisibility: true,
  columns: _immutable.default.List(),
  record: null,
  records: null
};

var _default = _react.default.memo(RecordModal);

exports.default = _default;
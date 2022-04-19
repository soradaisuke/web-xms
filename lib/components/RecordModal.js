"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = _interopRequireDefault(require("immutable"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ActivatorModal = _interopRequireDefault(require("./ActivatorModal"));

var _Action = _interopRequireDefault(require("./Action"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _FormContext = _interopRequireDefault(require("../contexts/FormContext"));

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

var _FormItem = _interopRequireDefault(require("./Form/FormItem"));

require("./RecordModal.less");

var _useFormInitialValues = _interopRequireDefault(require("../hooks/useFormInitialValues"));

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
var tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    },
    md: {
      span: 18,
      offset: 6
    }
  }
};

function RecordModal(_ref) {
  var children = _ref.children,
      onOk = _ref.onOk,
      columns = _ref.columns,
      title = _ref.title,
      record = _ref.record,
      records = _ref.records,
      actions = _ref.actions,
      className = _ref.className,
      checkEditable = _ref.checkEditable,
      checkCreatable = _ref.checkCreatable,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children", "onOk", "columns", "title", "record", "records", "actions", "className", "checkEditable", "checkCreatable"]);
  var user = (0, _useUser.default)();

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _usePageConfig = (0, _usePageConfig2.default)(),
      formProps = _usePageConfig.formProps;

  var isEdit = (0, _react.useMemo)(function () {
    return record && Object.keys(record).length > 0;
  }, [record]);
  var cols = (0, _react.useMemo)(function () {
    if (checkEditable) {
      return columns.filter(function (c) {
        return c.canShowInEditFrom({
          record: record,
          user: user
        });
      });
    }

    if (checkCreatable) {
      return columns.filter(function (c) {
        return c.canShowInCreateFrom({
          user: user
        });
      });
    }

    return columns;
  }, [columns, user, record, checkEditable, checkCreatable]);
  var defaultTilte = isEdit ? '编辑' : '新建';
  var onSubmit = (0, _useEventCallback2.default)(function () {
    return onOk(form);
  }, [form, onOk]);
  var initialValues = (0, _useFormInitialValues.default)({
    record: record,
    columns: columns
  });
  var onVisibleChange = (0, _useEventCallback2.default)(function (visible) {
    if (!visible) {
      form.setFieldsValue(initialValues);
    }
  });
  return _react.default.createElement(_FormContext.default.Provider, {
    value: form
  }, _react.default.createElement(_ActivatorModal.default, (0, _extends2.default)({}, props, {
    className: (0, _classnames.default)(className, 'xms-modal'),
    activator: children,
    title: title || defaultTilte,
    onOk: onSubmit,
    onVisibleChange: onVisibleChange
  }), _react.default.createElement(_form.default, (0, _extends2.default)({}, formItemLayout, formProps, {
    initialValues: initialValues,
    preserve: false,
    form: form
  }), cols.map(function (column, index) {
    return _react.default.createElement(_FormItem.default, {
      key: "".concat(column.getTitle()).concat(index),
      isEdit: isEdit,
      record: record,
      column: column
    });
  })), actions && actions.size > 0 && _react.default.createElement(_form.default.Item, tailFormItemLayout, _react.default.createElement(_row.default, {
    type: "flex",
    align: "middle"
  }, actions.map(function (a) {
    return _react.default.createElement(_Action.default, {
      key: a.getKey(),
      action: a,
      record: record
    });
  })))));
}

RecordModal.propTypes = {
  children: _propTypes.default.node.isRequired,
  onOk: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  checkEditable: _propTypes.default.bool,
  checkCreatable: _propTypes.default.bool,
  columns: _propTypes.default.instanceOf(_immutable.default.List),
  actions: _propTypes.default.instanceOf(_immutable.default.List),
  title: _propTypes.default.string,
  record: _propTypes.default.object,
  records: _propTypes.default.array
};
RecordModal.defaultProps = {
  checkEditable: false,
  checkCreatable: false,
  className: '',
  actions: null,
  title: '',
  columns: _immutable.default.List(),
  record: null,
  records: null
};

var _default = _react.default.memo(RecordModal);

exports.default = _default;
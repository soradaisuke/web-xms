"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRouterDom = require("react-router-dom");

var _Table = _interopRequireDefault(require("../schema/Table"));

var _Page = _interopRequireDefault(require("./Page"));

var _TableActions = _interopRequireDefault(require("../actions/TableActions"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _ConfirmButton = _interopRequireDefault(require("../components/Common/ConfirmButton"));

var _visiblePromise = _interopRequireDefault(require("../utils/visiblePromise"));

var _formatColumnsSubmitValues = _interopRequireDefault(require("../utils/formatColumnsSubmitValues"));

var _FormContext = _interopRequireDefault(require("../contexts/FormContext"));

var _usePageConfigContext = _interopRequireDefault(require("../hooks/usePageConfigContext"));

require("./RecordsPage.less");

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

function RecordFormPage(_ref) {
  var record = _ref.record,
      table = _ref.table,
      actions = _ref.actions,
      reset = _ref.reset,
      fetch = _ref.fetch,
      create = _ref.create,
      edit = _ref.edit;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      action = _useState6[0],
      setAction = _useState6[1];

  var user = (0, _useUser.default)();
  var history = (0, _reactRouterDom.useHistory)();

  var _usePageConfig = (0, _usePageConfigContext.default)(),
      formProps = _usePageConfig.formProps;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _useParams = (0, _reactRouterDom.useParams)(),
      id = _useParams.id;

  var isEdit = id !== 'new';
  var columns = table.getColumns();
  var onConfirmReset = (0, _useEventCallback2.default)(function () {
    form.resetFields();
  }, [form]);
  var fetchInternal = (0, _react.useCallback)(function () {
    if (fetch) {
      setIsLoading(true);
      setError(null);
      fetch({
        id: id
      }).then(function () {
        setIsLoading(false);
        setError(null);
      }).catch(function (e) {
        setIsLoading(true);
        setError(e);
      });
    }
  }, [fetch, id]);
  var onFinish = (0, _useEventCallback2.default)(function (values) {
    var handler = action.getHandler({
      create: create,
      edit: edit
    });
    return (0, _visiblePromise.default)({
      promise: handler({
        body: (0, _formatColumnsSubmitValues.default)({
          columns: columns,
          values: values
        }),
        id: id
      }),
      onComplete: history.goBack,
      loadingMessage: action.getHandlingMessage(),
      successMessage: '保存成功',
      throwError: true
    });
  }, [id, create, edit, action, columns]);
  (0, _react.useEffect)(function () {
    setAction(isEdit ? actions.getEditAction() : actions.getCreateAction());
    reset();

    if (isEdit) {
      fetchInternal();
    }
  }, []);
  return _react.default.createElement(_FormContext.default.Provider, {
    value: form
  }, _react.default.createElement(_Page.default, {
    showWatermark: true,
    isLoading: isLoading,
    isError: !!error,
    errorMessage: error ? error.message : ''
  }, _react.default.createElement(_card.default, {
    title: (action === null || action === void 0 ? void 0 : action.getTitle()) || '',
    className: "content-card"
  }, _react.default.createElement(_form.default, (0, _extends2.default)({}, formItemLayout, {
    scrollToFirstError: true,
    onFinish: onFinish
  }, formProps, {
    form: form
  }), columns.map(function (column) {
    return column.renderInForm({
      user: user,
      record: record,
      form: form,
      isEdit: isEdit
    });
  }), _react.default.createElement(_form.default.Item, tailFormItemLayout, _react.default.createElement(_row.default, {
    type: "flex",
    align: "middle"
  }, _react.default.createElement(_ConfirmButton.default, {
    title: "\u786E\u8BA4\u653E\u5F03\u6240\u7F16\u8F91\u7684\u5185\u5BB9\u8FD4\u56DE\u4E0A\u4E00\u9875\uFF1F",
    onOk: history.goBack
  }, "\u8FD4\u56DE"), _react.default.createElement(_ConfirmButton.default, {
    danger: true,
    type: "primary",
    className: "form-action",
    disabled: isLoading,
    title: "\u786E\u8BA4\u91CD\u7F6E\uFF1F",
    onOk: onConfirmReset
  }, "\u91CD\u7F6E"), _react.default.createElement(_button.default, {
    className: "form-action",
    disabled: isLoading,
    type: "primary",
    htmlType: "submit"
  }, "\u63D0\u4EA4")))))));
}

RecordFormPage.propTypes = {
  actions: _propTypes.default.instanceOf(_TableActions.default).isRequired,
  table: _propTypes.default.instanceOf(_Table.default).isRequired,
  reset: _propTypes.default.func,
  fetch: _propTypes.default.func,
  create: _propTypes.default.func,
  edit: _propTypes.default.func,
  record: _propTypes.default.object
};
RecordFormPage.defaultProps = {
  reset: null,
  fetch: null,
  create: null,
  edit: null,
  record: null
};

var _default = _react.default.memo(RecordFormPage);

exports.default = _default;
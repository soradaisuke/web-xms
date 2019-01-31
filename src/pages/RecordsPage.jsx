import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import AsyncValidator from 'async-validator';
import { Link } from 'react-router-dom';
import {
  Table, Pagination, Button, Popconfirm, Input, message, Modal, DatePicker,
} from 'antd';
import {
  split, startsWith, isFunction, isArray, find, reduce, map, has, isEqual, isNumber,
} from 'lodash';
import moment from 'moment';
import { generateUpYunImageUrl } from 'web-core';
import DataType from '../constants/DataType';
import RecordLink from '../components/RecordLink';
import RecordModal from '../components/RecordModal';
import Page from './Page';
import DatePickerWithPresets from '../components/DatePickerWithPresets';
import './RecordsPage.less';

const {
  DATETIME, IMAGE, NUMBER, STRING, DATE, BOOL,
} = DataType;

const { Column } = Table;
const { Search } = Input;
const { confirm } = Modal;

export default class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    fetch: PropTypes.func.isRequired,
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      link: PropTypes.shape({
        url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
        type: PropTypes.oneOf(['relative', 'absolute', 'external']),
      }),
      visibility: PropTypes.shape({
        create: PropTypes.bool,
        edit: PropTypes.bool,
        table: PropTypes.bool,
      }),
    })).isRequired,
    updatePage: PropTypes.func.isRequired,
    create: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    customGlobalActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    customMultipleActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    customRowActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    error: PropTypes.instanceOf(Error),
    isLoading: PropTypes.bool,
    order: PropTypes.func,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    edit: PropTypes.func,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    primaryKey: PropTypes.string,
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    remove: PropTypes.func,
    search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    searchFileds: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    sort: PropTypes.string,
    total: PropTypes.number,
  };

  static defaultProps = {
    create: null,
    component: null,
    customGlobalActions: [],
    customMultipleActions: [],
    customRowActions: [],
    error: null,
    isLoading: false,
    edit: null,
    filter: {},
    primaryKey: 'id',
    remove: null,
    records: Immutable.List(),
    order: null,
    page: 1,
    pagesize: 10,
    search: {},
    searchFileds: [],
    sort: '',
    total: 0,
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
  }

  state = {
    records: Immutable.List(),
    dataSource: [],
    selectedRowKeys: [],
    selectedRows: [],
    inputSearch: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.records !== nextProps.records) {
      return { records: nextProps.records, dataSource: nextProps.records.toJS() };
    }

    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const {
      pagesize, page, sort, search, filter,
    } = this.props;
    if (prevProps.pagesize !== pagesize || prevProps.page !== page
      || prevProps.sort !== sort || prevProps.search !== search
      || prevProps.filter !== filter) {
      this.fetch();
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  }

  onChangePage = (page, pagesize) => {
    const {
      updatePage, sort, filter, search,
    } = this.props;
    updatePage({
      page, pagesize, sort, filter, search,
    });
  }

  onSearch = ({ type, mapKey }, value) => {
    const {
      updatePage, pagesize, sort, filter,
    } = this.props;

    let searchValue;
    switch (type) {
      case NUMBER:
        searchValue = parseInt(value, 10);
        break;
      default:
        searchValue = String(value);
        break;
    }

    updatePage({
      page: 1, pagesize, sort, filter, search: { [mapKey]: searchValue },
    });
  }

  onChange = async (pagination, filters, sorter) => {
    const {
      schema, page, pagesize, search, updatePage, sort, filter,
    } = this.props;
    const targetSchema = find(schema, { key: sorter.columnKey }) || {};
    const { sort: schemaSort } = targetSchema;
    let newSort;
    if (schemaSort && sorter && sorter.columnKey && sorter.order) {
      if (schemaSort[sorter.order.replace('end', '')]) {
        newSort = `${targetSchema.mapKey} ${sorter.order.replace('end', '')}`;
      } else if (schemaSort.asc) {
        newSort = `${targetSchema.mapKey} asc`;
      } else if (schemaSort.desc) {
        newSort = `${targetSchema.mapKey} desc`;
      } else {
        newSort = '';
      }
    } else {
      newSort = '';
    }
    const newFilter = reduce(schema, (acc, { key, type, mapKey }) => {
      const value = filters[key];
      const preValue = filter[key];
      if ((type === DATE || type === DATETIME) && preValue) {
        acc[mapKey] = preValue;
      } else if (value && value.length > 0) {
        switch (type) {
          case NUMBER:
            acc[mapKey] = parseInt(value[0], 10);
            break;
          case BOOL:
            acc[mapKey] = (value[0] && value[0] !== 'false');
            break;
          default:
            acc[mapKey] = String(value[0]);
            break;
        }
      }
      return acc;
    }, {});

    let newPage = page;

    if (sort !== newSort || !isEqual(filter, newFilter)) {
      newPage = 1;
    }

    updatePage({
      page: newPage, pagesize, sort: newSort, search, filter: newFilter,
    });
  }

  onOrderChange = async (body, diff) => {
    const { order } = this.props;
    await this.updateRecord({ promise: order(body, diff) });
  }

  onConfirmRemove = async (record) => {
    const { remove } = this.props;
    await this.updateRecord({ promise: remove(record), loadingMessage: '正在删除……' });
  }

  onCustomRowAction = async (record, handler) => {
    if (isFunction(handler)) {
      const { match: { params: matchParams } } = this.props;
      await this.updateRecord({ promise: handler(record, matchParams) });
    }
  }

  onCustomMultipleAction = async (handler, enable) => {
    if (isFunction(handler)) {
      const { match: { params: matchParams } } = this.props;
      const { selectedRows } = this.state;
      await this.updateRecord({
        promise: Promise.all(map(selectedRows, record => (
          !isFunction(enable) || enable(record) ? handler(record, matchParams) : null
        ))),
      });
      this.setState({ selectedRowKeys: [], selectedRows: [] });
    }
  }

  onCustomGlobalAction = async (handler) => {
    if (isFunction(handler)) {
      const { match: { params: matchParams } } = this.props;
      await this.updateRecord({ promise: handler(matchParams) });
    }
  }

  updateRecord = async ({ promise, loadingMessage = '正在保存……', throwError = false }) => {
    const hide = message.loading(loadingMessage, 0);
    try {
      await promise;
      hide();
    } catch (e) {
      hide();
      if (throwError) {
        throw e;
      }
    }
    this.fetch();
  }

  editRecord = async (body) => {
    const {
      edit, inlineEdit, create, primaryKey,
    } = this.props;
    const newEdit = edit || inlineEdit;
    await this.updateRecord({
      promise: body[primaryKey] && newEdit ? newEdit(body) : create(body),
      throwError: true,
    });
  }

  fetch = async () => {
    const {
      fetch, page, pagesize, sort, search, filter,
    } = this.props;
    fetch({
      page, pagesize, sort, search, filter,
    });
  }

  onChangeDateFilter = (mapKey, date) => {
    const { filter, updatePage, dateFilterSchemas } = this.props;
    const target = dateFilterSchemas.find(({ mapKey: mk }) => mk === mapKey);
    if ((!isArray(date) && !date)
    || (isArray(date) && (!date[0] || !date[1]))) {
      delete filter[mapKey];
      updatePage({ filter });
    } else if (isArray(date)) {
      updatePage({
        filter: {
          ...filter,
          [mapKey]: target.type === DATE
            ? [date[0].format('YYYY-MM-DD'), date[1].format('YYYY-MM-DD')]
            : [date[0].toISOString(), date[1].toISOString()],
        },
      });
    } else {
      updatePage({
        filter: {
          ...filter,
          [mapKey]: target.type === DATE
            ? date.format('YYYY-MM-DD')
            : date.toISOString(),
        },
      });
    }
  }

  hasAddButton() {
    const { create, hasCreateNew } = this.props;
    return !!create || hasCreateNew;
  }

  renderColumn({
    visibility, link, title, key, sort, mapKey, width,
    type, imageSize, renderValue, filters, enabledFilters,
    canFilter, inlineEdit, form: formConfig,
  }) {
    const { sort: currentSort, filter } = this.props;
    const filteredValue = (!(type === DATE || type === DATETIME) && has(filter, mapKey) ? String(filter[mapKey]) : '');
    let renderValueFunc = v => v;
    if (type === DATETIME) {
      renderValueFunc = v => (moment(v).isValid() ? moment(v).format('YYYY-MM-DD HH:mm:ss') : '');
    } else if (type === DATE) {
      renderValueFunc = v => (moment(v).isValid() ? moment(v).format('YYYY-MM-DD') : '');
    } else if (type === BOOL) {
      renderValueFunc = v => (v ? '是' : '否');
    }
    if (isFunction(renderValue)) {
      renderValueFunc = renderValue;
    } else if (isArray(filters) && type !== DATE && type !== DATETIME) {
      renderValueFunc = (v) => {
        const filtered = find(filters, f => f.value === v);
        return filtered ? filtered.text : v;
      };
    }
    if (visibility.table) {
      let render = v => v;

      if (link) {
        render = (value, record) => (
          <span>
            <RecordLink link={link} record={record}>
              {value}
            </RecordLink>
          </span>
        );
      } else if (type === IMAGE) {
        render = (value) => {
          const src = generateUpYunImageUrl(value, `/both/${imageSize || '100x100'}`);
          const style = width ? { width: isNumber(width) ? `${width}px` : width } : {};

          return <img alt="" src={src} style={style} />;
        };
      } else if (inlineEdit && type === STRING) {
        render = (value, record = {}) => (
          <Input.TextArea
            placeholder={formConfig && formConfig.placeholder ? formConfig.placeholder : `请输入${title}`}
            autoComplete="off"
            defaultValue={value}
            onBlur={({ relatedTarget, target: { value: editValue } = {} } = {}) => {
              if (formConfig && formConfig.rules) {
                const validator = new AsyncValidator({
                  [mapKey]: [{
                    required: !formConfig.optional,
                    message: `${title}不能为空`,
                    whitespace: true,
                  }].concat(formConfig.rules),
                });
                validator.validate({ [mapKey]: editValue }, (errors) => {
                  if (errors) {
                    message.error(errors[0].message);
                    if (relatedTarget && isFunction(relatedTarget.focus)) {
                      relatedTarget.focus();
                    }
                  } else {
                    this.editRecord({ ...record, [mapKey]: editValue });
                  }
                });
              } else {
                this.editRecord({ ...record, [mapKey]: editValue });
              }
            }}
          />
        );
      }

      const filterProps = canFilter && isArray(enabledFilters) && enabledFilters.length > 0 ? {
        filtered: !!filteredValue,
        filteredValue: filteredValue ? [filteredValue] : [],
        filterMultiple: false,
        filters: type === DATE || type === DATETIME ? [] : enabledFilters,
      } : {};

      return (
        <Column
          {...filterProps}
          className={classNames(sort)}
          title={title}
          dataIndex={key}
          key={key}
          sorter={!!sort}
          width={width || ''}
          sortOrder={currentSort && startsWith(currentSort, `${mapKey} `) ? `${split(currentSort, ' ')[1]}end` : false}
          render={
            (value, record) => render(renderValueFunc(value, record), record)
          }
        />
      );
    }

    return null;
  }

  renderAddButton() {
    const { hasCreateNew, schema } = this.props;
    if (hasCreateNew) {
      return (
        <Button className="add-button" type="primary">
          <Link to={`${window.location.pathname}/new`}>新建</Link>
        </Button>
      );
    }
    return (
      <RecordModal schema={schema} record={{}} onOk={this.editRecord}>
        <Button className="add-button" type="primary">添加</Button>
      </RecordModal>
    );
  }

  renderSchema() {
    const { schema } = this.props;

    return schema.map(definition => this.renderColumn({ ...definition }));
  }

  renderCustomRowActions(record) {
    const { customRowActions, match: { params: matchParams } } = this.props;

    return customRowActions.map(({
      title, type, handler, enable, render, confirmModal,
    }) => {
      if (isFunction(enable) && !enable(record)) {
        return null;
      }

      if (isFunction(render)) {
        return render(record, matchParams, this.fetch);
      }

      return (
        <Button
          key={title}
          type={type}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={
            confirmModal
              ? () => confirm({
                ...confirmModal,
                title: isFunction(confirmModal.title)
                  ? confirmModal.title(record) : (confirmModal.title || ''),
                content: isFunction(confirmModal.content)
                  ? confirmModal.content(record) : (confirmModal.content || ''),
                onOk: () => this.onCustomRowAction(record, handler),
              })
              : () => this.onCustomRowAction(record, handler)
          }
        >
          {title}
        </Button>
      );
    });
  }

  renderCustomMultipleActions() {
    const { selectedRows } = this.state;
    const hasSelected = selectedRows.length > 0;
    const { customMultipleActions } = this.props;

    return customMultipleActions.map(({
      title, type, handler, enable, confirmModal,
    }) => (
      <Button
        key={title}
        type={type}
        disabled={!hasSelected}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={
          confirmModal
            ? () => confirm({
              ...confirmModal,
              title: isFunction(confirmModal.title)
                ? confirmModal.title(selectedRows) : (confirmModal.title || ''),
              content: isFunction(confirmModal.content)
                ? confirmModal.content(selectedRows) : (confirmModal.content || ''),
              onOk: () => this.onCustomMultipleAction(handler, enable),
            })
            : () => this.onCustomMultipleAction(handler, enable)
        }
      >
        {title}
      </Button>
    ));
  }

  renderCustomGlobalActions() {
    const { customGlobalActions, match: { params: matchParams } } = this.props;

    return customGlobalActions.map(({
      title, type, handler, render,
    }) => {
      if (isFunction(render)) {
        return render(matchParams, this.fetch);
      }

      return (
        <Button
          key={title}
          type={type}
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => this.onCustomGlobalAction(handler)}
        >
          {title}
        </Button>
      );
    });
  }

  renderRowActions() {
    const {
      edit, remove, order, customRowActions, schema,
    } = this.props;
    return (edit || remove || customRowActions.length > 0) ? (
      <Column
        title="操作"
        key="action"
        render={(text, record) => ( // eslint-disable-line react/jsx-no-bind
          <span className="actions">
            {
              edit && (
                <RecordModal schema={schema} record={record} onOk={this.editRecord}>
                  <Button
                    type="primary"
                    shape="circle"
                    icon="edit"
                  />
                </RecordModal>
              )
            }
            {
              remove && (
                <Popconfirm
                  title="确认删除？"
                  // eslint-disable-next-line react/jsx-no-bind
                  onConfirm={() => this.onConfirmRemove(record)}
                >
                  <Button
                    type="danger"
                    shape="circle"
                    icon="delete"
                  />
                </Popconfirm>
              )
            }
            {
              order && (
                <React.Fragment>
                  <Button
                    shape="circle"
                    icon="up"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.onOrderChange(record, -1)}
                  />
                  <Button
                    shape="circle"
                    icon="down"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.onOrderChange(record, 1)}
                  />
                </React.Fragment>
              )
            }
            {this.renderCustomRowActions(record)}
          </span>
        )}
      />
    ) : null;
  }

  renderSearchs() {
    const { inputSearch } = this.state;
    const { searchFileds, search } = this.props;
    return searchFileds.map(definition => (
      <Search
        key={definition.mapKey}
        defaultValue={search[definition.mapKey]}
        placeholder={definition.title}
        value={inputSearch[definition.mapKey]}
        onSearch={value => this.onSearch(definition, value)}
        onChange={e => this.setState({ inputSearch: { [definition.mapKey]: e.target.value } })}
        style={{ width: 150 }}
        enterButton
      />
    ));
  }

  renderDateFilters() {
    const { dateFilterSchemas, filter } = this.props;
    return dateFilterSchemas.map(({
      key, mapKey, type, title, rangeFilter, filters,
    }) => {
      const ranges = {};
      if (rangeFilter && filters && filters.length) {
        filters.map(({ text, value }) => {
          if (!moment(value[0]).isValid() || !moment(value[1]).isValid()) {
            throw new Error(`mapKey: ${mapKey}: 存在RangePicker的filter的value是无效的moment`);
          }
          ranges[text] = [moment(value[0]), moment(value[1])];
          return null;
        });
      }
      return (
        <div key={key}>
          {`${title}：`}
          {
            rangeFilter
              ? (
                <DatePicker.RangePicker
                  showTime={type === DATETIME}
                  format={type === DATETIME ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                  value={has(filter, mapKey) && isArray(filter[mapKey])
                    && moment(filter[mapKey][0]).isValid()
                    && moment(filter[mapKey][1]).isValid()
                    ? [moment(filter[mapKey][0]), moment(filter[mapKey][1])]
                    : []
                  }
                  ranges={ranges}
                  onChange={newDate => (
                    this.onChangeDateFilter(mapKey, newDate)
                  )}
                />
              )
              : (
                <DatePickerWithPresets
                  value={has(filter, mapKey) && moment(filter[mapKey]).isValid()
                    ? moment(filter[mapKey]) : null}
                  showTime={type === DATETIME}
                  format={type === DATETIME ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                  presets={filters}
                  onChange={newDate => (
                    this.onChangeDateFilter(mapKey, newDate)
                  )}
                />
              )
          }
        </div>
      );
    });
  }

  renderContent() {
    const { dataSource, selectedRowKeys } = this.state;
    const {
      total, page, pagesize, primaryKey, searchFileds, dateFilterSchemas,
      customMultipleActions, customGlobalActions, isLoading,
    } = this.props;

    const rowSelection = customMultipleActions.length > 0 ? {
      selectedRowKeys, onChange: this.onSelectChange,
    } : null;
    const hasHeader = this.hasAddButton() || searchFileds.length > 0
      || customMultipleActions.length > 0 || customGlobalActions.length > 0;

    return (
      <React.Fragment>
        {
          hasHeader && (
            <div className="xms-records-page-content-header">
              <div className="xms-records-page-content-header-buttons">
                {this.hasAddButton() && this.renderAddButton()}
                {this.renderCustomGlobalActions()}
                {this.renderCustomMultipleActions()}
              </div>
              <div className="xms-records-page-content-header-searchs">
                {this.renderSearchs()}
              </div>
            </div>
          )
        }
        {
          dateFilterSchemas && dateFilterSchemas.length > 0 && (
            <div className="xms-records-page-content-header-filters">
              {this.renderDateFilters()}
            </div>
          )
        }
        <Table
          loading={isLoading}
          dataSource={dataSource}
          rowKey={primaryKey}
          rowSelection={rowSelection}
          pagination={false}
          onChange={this.onChange}
        >
          {this.renderSchema()}
          {this.renderRowActions()}
        </Table>
        <Pagination
          showQuickJumper
          showSizeChanger
          showTotal={RecordsPage.showTotal}
          className="ant-table-pagination"
          total={total}
          current={page}
          pagesize={pagesize}
          onChange={this.onChangePage}
          onShowSizeChange={this.onChangePage}
        />
      </React.Fragment>
    );
  }

  render() {
    const { component: Component, error } = this.props;

    return (
      <Page isError={!!error} errorMessage={error ? error.message : ''}>
        {Component ? <Component /> : null}
        {this.renderContent()}
      </Page>
    );
  }
}

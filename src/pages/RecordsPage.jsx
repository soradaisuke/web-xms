import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import {
  Table, Pagination, Button, Popconfirm, Input, message,
} from 'antd';
import {
  split, startsWith, isFunction, isArray, find, reduce, map, has, isEqual, isNumber,
} from 'lodash';
import moment from 'moment';
import { makeCancelablePromise, generateUpYunImageUrl } from 'web-core';
import DataType from '../constants/DataType';
import RecordLink from '../components/RecordLink';
import RecordModal from '../components/RecordModal';
import Page from './Page';
import './RecordsPage.less';

const { DATETIME, IMAGE, NUMBER } = DataType;
const { Column } = Table;
const { Search } = Input;

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
    errorMessage: '',
    isError: false,
    isLoading: true,
    records: Immutable.List(),
    dataSource: [],
    selectedRowKeys: [],
    selectedRows: [],
    inputSearch: {},
  };

  activePromise = null;

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

  componentWillUnmount() {
    if (this.activePromise) {
      this.activePromise.cancel();
      this.activePromise = null;
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

  onSearch = ({ type, key }, value) => {
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
      page: 1, pagesize, sort, filter, search: { [key]: searchValue },
    });
  }

  onChange = async (pagination, filters, sorter) => {
    const {
      schema, page, pagesize, search, updatePage, sort, filter,
    } = this.props;
    const { sort: schemaSort } = find(schema, { key: sorter.columnKey }) || {};
    let newSort;
    if (schemaSort && sorter && sorter.columnKey && sorter.order) {
      if (schemaSort[sorter.order.replace('end', '')]) {
        newSort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
      } else if (schemaSort.asc) {
        newSort = `${sorter.columnKey} asc`;
      } else if (schemaSort.desc) {
        newSort = `${sorter.columnKey} desc`;
      } else {
        newSort = '';
      }
    } else {
      newSort = '';
    }
    const newFilter = reduce(schema, (acc, { key, type, filterKey }) => {
      const value = filters[key];
      if (value && value.length > 0) {
        switch (type) {
          case NUMBER:
            acc[filterKey || key] = parseInt(value[0], 10);
            break;
          default:
            acc[filterKey || key] = String(value[0]);
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
      this.activePromise = makeCancelablePromise(promise);
      await this.activePromise;
      hide();
      await this.fetch();
    } catch (e) {
      hide();
      if (throwError) {
        this.activePromise = null;
        throw e;
      }
    }
    this.activePromise = null;
  }

  editRecord = async (body) => {
    const { edit, create, primaryKey } = this.props;
    await this.updateRecord({
      promise: body[primaryKey] && edit ? edit(body) : create(body),
      throwError: true,
    });
  }

  fetch = async () => {
    const {
      fetch, page, pagesize, sort, search, filter,
    } = this.props;
    this.setState({
      isLoading: true,
    });
    try {
      this.activePromise = makeCancelablePromise(fetch({
        page, pagesize, sort, search, filter,
      }));
      await this.activePromise;
      this.setState({
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        isError: true,
        isLoading: false,
      });
    }
    this.activePromise = null;
  }

  hasAddButton() {
    const { create } = this.props;
    return !!create;
  }

  renderColumn({
    visibility, link, title, key, sort, filterKey, width,
    type, imageSize, renderValue, filters, enabledFilters, canFilter,
  }) {
    const { sort: currentSort, filter } = this.props;
    const filteredValue = (has(filter, key) ? String(filter[key]) : '')
      || (has(filter, filterKey) ? String(filter[filterKey]) : '');
    let renderValueFunc = v => v;
    if (isFunction(renderValue)) {
      renderValueFunc = renderValue;
    } else if (isArray(filters)) {
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
      } else if (type === DATETIME) {
        render = (value) => {
          const datetime = moment(value);
          return (
            <span>
              {datetime.isValid() ? datetime.format('YYYY-MM-DD HH:mm:ss') : ''}
            </span>
          );
        };
      } else if (type === IMAGE) {
        render = (value) => {
          const src = generateUpYunImageUrl(value, `/both/${imageSize || '100x100'}`);
          const style = width ? { width: isNumber(width) ? `${width}px` : width } : {};

          return <img alt="" src={src} style={style} />;
        };
      }

      const filterProps = canFilter && isArray(enabledFilters) && enabledFilters.length > 0 ? {
        filtered: !!filteredValue,
        filteredValue: filteredValue ? [filteredValue] : [],
        filterMultiple: false,
        filters: enabledFilters,
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
          sortOrder={currentSort && startsWith(currentSort, `${key} `) ? `${split(currentSort, ' ')[1]}end` : false}
          render={
            (value, record) => render(renderValueFunc(value), record)
          }
        />
      );
    }

    return null;
  }

  renderSchema() {
    const { schema } = this.props;

    return schema.map(definition => this.renderColumn({ ...definition }));
  }

  renderCustomRowActions(record) {
    const { customRowActions, match: { params: matchParams } } = this.props;

    return customRowActions.map(({
      title, type, handler, enable, render,
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
          onClick={() => this.onCustomRowAction(record, handler)}
        >
          {title}
        </Button>
      );
    });
  }

  renderCustomMultipleActions() {
    const { selectedRowKeys } = this.state;
    const hasSelected = selectedRowKeys.length > 0;
    const { customMultipleActions } = this.props;

    return customMultipleActions.map(({
      title, type, handler, enable,
    }) => (
      <Button
        key={title}
        type={type}
        disabled={!hasSelected}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => this.onCustomMultipleAction(handler, enable)}
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
        key={definition.key}
        defaultValue={search[definition.key]}
        placeholder={definition.title}
        value={inputSearch[definition.key]}
        onSearch={value => this.onSearch(definition, value)}
        onChange={e => this.setState({ inputSearch: { [definition.key]: e.target.value } })}
        style={{ width: 150 }}
        enterButton
      />
    ));
  }

  renderContent() {
    const { isLoading, dataSource, selectedRowKeys } = this.state;
    const {
      total, page, pagesize, primaryKey, schema, searchFileds,
      customMultipleActions, customGlobalActions,
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
                {
                  this.hasAddButton() && (
                    <RecordModal schema={schema} record={{}} onOk={this.editRecord}>
                      <Button className="add-button" type="primary">添加</Button>
                    </RecordModal>
                  )
                }
                {this.renderCustomGlobalActions()}
                {this.renderCustomMultipleActions()}
              </div>
              <div className="xms-records-page-content-header-searchs">
                {this.renderSearchs()}
              </div>
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
    const { isError, errorMessage } = this.state;
    const { component: Component } = this.props;

    return (
      <Page isError={isError} errorMessage={errorMessage}>
        {Component ? <Component /> : null}
        {this.renderContent()}
      </Page>
    );
  }
}

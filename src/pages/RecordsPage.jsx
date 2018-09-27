import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import {
  Table, Pagination, Button, Popconfirm, Input, message,
} from 'antd';
import {
  split, startsWith, isFunction, isArray, find, reduce,
  map, has, isNaN, filter as arrayFilter,
} from 'lodash';
import moment from 'moment';
import Img from '../components/Img';
import DataType from '../constants/DataType';
import RecordLink from '../components/RecordLink';
import RecordModal from '../components/RecordModal';
import makeCancelable from '../utils/makeCancelable';
import Page from './Page';
import './RecordsPage.less';

const { DATETIME, IMAGE } = DataType;
const { Column } = Table;
const { Search } = Input;

export default class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    canSearch: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      link: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
          url: PropTypes.string,
          type: PropTypes.oneOf(['relative', 'absolute', 'external']),
        }),
      ]),
      visibility: PropTypes.shape({
        create: PropTypes.bool,
        edit: PropTypes.bool,
        table: PropTypes.bool,
      }),
    })).isRequired,
    updatePage: PropTypes.func.isRequired,
    create: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    customActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    order: PropTypes.func,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    edit: PropTypes.func,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    primaryKey: PropTypes.string,
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    remove: PropTypes.func,
    search: PropTypes.string,
    searchPlaceHolder: PropTypes.string,
    sort: PropTypes.string,
    total: PropTypes.number,
  };

  static defaultProps = {
    create: null,
    component: null,
    customActions: [],
    edit: null,
    filter: {},
    primaryKey: 'id',
    remove: null,
    records: Immutable.List(),
    order: null,
    page: 1,
    pagesize: 10,
    search: '',
    searchPlaceHolder: '',
    sort: null,
    total: 0,
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
  }

  state = {
    isError: false,
    isLoading: true,
    records: Immutable.List(),
    dataSource: [],
    selectedRowKeys: [],
    selectedRows: [],
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

  onSearch = (search) => {
    const {
      updatePage, page, pagesize, sort, filter,
    } = this.props;
    updatePage({
      page, pagesize, sort, filter, search,
    });
  }

  onChange = async (pagination, filters, sorter) => {
    let { sort } = this.props;
    const {
      page, pagesize, search, updatePage,
    } = this.props;
    if (sorter && sorter.columnKey && sorter.order) {
      sort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
    }
    updatePage({
      page,
      pagesize,
      sort,
      search,
      filter: reduce(filters, (acc, value, key) => {
        if (value && key && value.length > 0) {
          const number = parseInt(value[0], 10);
          acc[key] = isNaN(number) ? value[0] : number;
        }
        return acc;
      }, {}),
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

  onCustomAction = async (record, handler) => {
    if (isFunction(handler)) {
      const { match: { params: matchParams } } = this.props;
      await this.updateRecord({ promise: handler(record, matchParams) });
    }
  }

  onCustomRowAction = async (handler, enable) => {
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

  updateRecord = async ({ promise, loadingMessage = '正在保存……', throwError = false }) => {
    const hide = message.loading(loadingMessage, 0);
    try {
      this.activePromise = makeCancelable(promise);
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
      this.activePromise = makeCancelable(fetch({
        page, pagesize, sort, search, filter,
      }));
      await this.activePromise;
      this.setState({
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
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

  hasHeader() {
    const { canSearch } = this.props;
    return this.hasAddButton() || canSearch;
  }

  renderColumn({
    visibility, link, title, key, sort,
    type, imageSize, renderValue, filters, canFilter,
  }) {
    const { sort: currentSort, filter } = this.props;
    const filteredValue = has(filter, key) ? String(filter[key]) : '';
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
        render = value => (
          <Img useImg src={value} format={`/both/${imageSize || '100x100'}`} />
        );
      }

      const filterProps = canFilter && isArray(filters) && filters.length > 0 ? {
        filtered: !!filteredValue,
        filteredValue: filteredValue ? [filteredValue] : [],
        filterMultiple: false,
        filters,
      } : {};

      return (
        <Column
          {...filterProps}
          className={classNames(sort)}
          title={title}
          dataIndex={key}
          key={key}
          sorter={!!sort}
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

  renderActions() {
    const {
      edit, remove, order, customActions, schema, match: { params: matchParams },
    } = this.props;
    return (edit || remove || customActions.length > 0) ? (
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
            {
              customActions.map(({
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
                    onClick={() => this.onCustomAction(record, handler)}
                  >
                    {title}
                  </Button>
                );
              })
            }
          </span>
        )}
      />
    ) : null;
  }

  renderContent() {
    const { isLoading, dataSource, selectedRowKeys } = this.state;
    const {
      total, page, pagesize, customActions,
      schema, search, searchPlaceHolder, canSearch,
      primaryKey,
    } = this.props;

    const rowActions = customActions ? arrayFilter(customActions, ({ rowSelection }) => (
      rowSelection
    )) : [];
    const rowSelection = rowActions.length > 0 ? { selectedRowKeys, onChange: this.onSelectChange }
      : null;
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <React.Fragment>
        {
          this.hasHeader() && (
            <div className="xms-records-page-content-header">
              {
                this.hasAddButton() && (
                  <RecordModal schema={schema} record={{}} onOk={this.editRecord}>
                    <Button className="add-button" type="primary">添加</Button>
                  </RecordModal>
                )
              }
              {
                canSearch && (
                  <Search
                    defaultValue={search}
                    placeholder={searchPlaceHolder}
                    onSearch={this.onSearch}
                    style={{ width: 200 }}
                    enterButton
                  />
                )
              }
            </div>
          )
        }
        {
          rowActions.length > 0 && (
            <div className="xms-records-page-content-header">
              {
                rowActions.map(({
                  title, type, handler, enable,
                }) => (
                  <Button
                    key="title"
                    type={type}
                    disabled={!hasSelected}
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.onCustomRowAction(handler, enable)}
                  >
                    {title}
                  </Button>
                ))
              }
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
          {this.renderActions()}
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
    const { isError } = this.state;
    const { component: Component } = this.props;

    return (
      <Page isError={isError}>
        {Component ? <Component /> : null}
        {this.renderContent()}
      </Page>
    );
  }
}

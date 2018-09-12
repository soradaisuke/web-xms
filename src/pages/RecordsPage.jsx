import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { withRouter } from 'react-router';
import {
  Table, Pagination, Button, Popconfirm, Input, message,
} from 'antd';
import {
  forEach, split, startsWith, isFunction, find, mapValues, isNaN, has, isArray,
} from 'lodash';
import moment from 'moment';
import Img from '../components/Img';
import DataType from '../constants/DataType';
import RecordLink from '../components/RecordLink';
import Page from './Page';
import './RecordsPage.less';

const { DATETIME, IMAGE } = DataType;
const { Column } = Table;
const { Search } = Input;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    canSearch: PropTypes.bool.isRequired,
    fetch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.oneOfType([
        PropTypes.shape({
          path: PropTypes.string,
          key: PropTypes.string,
        }),
        PropTypes.bool,
      ]),
      visibility: PropTypes.shape({
        table: PropTypes.bool,
      }),
    })).isRequired,
    updatePage: PropTypes.func.isRequired,
    create: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    customActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    modal: PropTypes.func,
    order: PropTypes.func,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    edit: PropTypes.func,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
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
    remove: null,
    records: Immutable.List(),
    modal: null,
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
  }

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
    if (sorter && sorter.columnKey && sorter.order && this.checkSort({ key: sorter.columnKey, order: sorter.order.replace('end', '') })) {
      sort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
    }
    updatePage({
      page,
      pagesize,
      sort,
      search,
      filter: mapValues(filters, (value) => {
        const number = parseInt(value[0], 10);
        return isNaN(number) ? value : number;
      }),
    });
  }

  onOrderChange = async (body, diff) => {
    const { order } = this.props;
    const hide = message.loading('正在保存……', 0);
    try {
      await order(body, diff);
      hide();
      await this.fetch();
    } catch (e) {
      hide();
    }
  }

  onConfirmRemove = async (record) => {
    const { remove } = this.props;
    const hide = message.loading('正在删除……', 0);
    try {
      await remove(record.id);
      hide();
      await this.fetch();
    } catch (e) {
      hide();
    }
  }

  onCustomAction = async (record, handler) => {
    if (isFunction(handler)) {
      const hide = message.loading('正在保存……', 0);
      try {
        await handler(record);
        hide();
        await this.fetch();
      } catch (e) {
        hide();
      }
    }
  }

  editRecord = async (body) => {
    const { edit, create, match: { params } } = this.props;
    const hide = message.loading('正在保存……', 0);
    try {
      if (body.id && edit) {
        await edit(body);
      } else if (create) {
        await create(body, params);
      }
      hide();
      await this.fetch();
    } catch (e) {
      hide();
      throw e;
    }
  }

  checkSort({ key, order }) {
    const { schema } = this.props;
    let canSort = false;
    let title;
    forEach(schema, (definition) => {
      if (definition.key === key) {
        const { sort, title: t } = definition;
        canSort = sort && sort[order];
        title = t;

        return false;
      }

      return true;
    });

    if (!canSort) {
      message.error(`${title}不支持${order === 'asc' ? '升序' : '降序'}排序`);
    }

    return canSort;
  }

  async fetch() {
    const {
      fetch, page, pagesize, sort, search, filter, match: { params },
    } = this.props;
    this.setState({
      isLoading: true,
    });
    try {
      await fetch({
        page, pagesize, sort, search, filter, params,
      });
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
  }

  hasAddButton() {
    const { modal, create } = this.props;
    return modal && create;
  }

  hasHeader() {
    const { canSearch } = this.props;
    return this.hasAddButton() || canSearch;
  }

  renderColumn({
    visibility, link, title, key, sort,
    type, imageSize, renderValue, filters,
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
        render = value => (
          <span>
            {moment(value).format('YYYY-MM-DD HH:mm:ss')}
          </span>
        );
      } else if (type === IMAGE) {
        render = value => (
          <Img useImg src={value} format={`/both/${imageSize || '100x100'}`} />
        );
      }

      const filterProps = isArray(filters) && filters.length > 0 ? {
        filtered: !!filteredValue,
        filteredValue: filteredValue ? [filteredValue] : [],
        filterMultiple: false,
        filters,
      } : {};

      return (
        <Column
          {...filterProps}
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
      modal: Modal, edit, remove, order, customActions,
    } = this.props;
    return (edit || remove || customActions.length > 0) ? (
      <Column
        title="操作"
        key="action"
        render={(text, record) => ( // eslint-disable-line react/jsx-no-bind
          <span>
            {
              Modal && edit && (
                <Modal record={record} onOk={this.editRecord}>
                  <Button
                    className="action-button"
                    type="primary"
                    shape="circle"
                    icon="edit"
                  />
                </Modal>
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
                    className="action-button"
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
                    className="action-button"
                    shape="circle"
                    icon="up"
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={() => this.onOrderChange(record, -1)}
                  />
                  <Button
                    className="action-button"
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
                title, type, handler, enable,
              }) => {
                if (isFunction(enable) && !enable(record)) {
                  return null;
                }

                return (
                  <Button
                    key={title}
                    type={type}
                    className="action-button"
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
    const { isLoading, dataSource } = this.state;
    const {
      modal: Modal, total, page, pagesize,
      schema, search, searchPlaceHolder, canSearch,
    } = this.props;
    return (
      <React.Fragment>
        {
          this.hasHeader() && (
            <div className="xms-records-page-content-header">
              {
                this.hasAddButton() && (
                  <Modal schema={schema} record={{}} onOk={this.editRecord}>
                    <Button className="add-button" type="primary">添加</Button>
                  </Modal>
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
        <Table
          loading={isLoading}
          dataSource={dataSource}
          rowKey={record => record.id} // eslint-disable-line react/jsx-no-bind
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

export default withRouter(RecordsPage);

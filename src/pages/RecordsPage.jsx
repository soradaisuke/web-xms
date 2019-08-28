import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Immutable from 'immutable';
import classNames from 'classnames';
import { Table, Pagination, message, Card, Spin, Popover, Icon } from 'antd';
import {
  split,
  startsWith,
  isArray,
  isEqual,
  get,
  set,
  unset,
  isUndefined,
  isNull,
  cloneDeep,
  filter as filterFunc
} from 'lodash';
import TableType from '../schema/Table';
import TableActions from '../actions/TableActions';
import Group from '../components/Group';
import Page from './Page';
import './RecordsPage.less';

const { Column } = Table;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    actions: PropTypes.instanceOf(TableActions).isRequired,
    fetch: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    table: PropTypes.instanceOf(TableType).isRequired,
    updatePage: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    error: PropTypes.instanceOf(Error),
    isLoading: PropTypes.bool,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    inline: PropTypes.bool,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    sort: PropTypes.string,
    total: PropTypes.number,
    user: PropTypes.instanceOf(Immutable.Map),
    paginationComponentProps: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    component: null,
    error: null,
    isLoading: false,
    filter: {},
    records: Immutable.List(),
    page: 1,
    pagesize: 10,
    sort: '',
    total: 0,
    inline: false,
    user: null,
    paginationComponentProps: {}
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
  }

  constructor(props) {
    super(props);

    this.state = {
      records: Immutable.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: []
    };

    props.table.columns.forEach(column => {
      column.resetFilters();
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.records !== nextProps.records) {
      return {
        records: nextProps.records,
        dataSource: nextProps.records.toJS()
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { pagesize, page, sort, filter } = this.props;
    if (
      prevProps.pagesize !== pagesize ||
      prevProps.page !== page ||
      prevProps.sort !== sort ||
      !isEqual(prevProps.filter, filter)
    ) {
      this.fetch();
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onChangePage = (page, pagesize) => {
    const { updatePage, sort, filter } = this.props;
    updatePage({
      page,
      pagesize,
      sort,
      filter
    });
  };

  onChange = (pagination, filters, sorter, columns, onlyFilters = false) => {
    const { page, pagesize, updatePage, sort, filter } = this.props;

    const newFilter = cloneDeep(filter);
    columns.forEach(column => {
      if (column.canFilterInTable()) {
        unset(newFilter, column.getTableFilterKey());

        if (column.parentColumn) {
          let parentFilteredValue = filters[column.parentColumn.getKey()];
          parentFilteredValue = column.parentColumn.canFilterMultipleInTable()
            ? parentFilteredValue
            : parentFilteredValue[0];

          if (
            !isEqual(
              parentFilteredValue,
              get(filter, column.parentColumn.getTableFilterKey())
            )
          ) {
            return true;
          }
        }
        const value = filters[column.getKey()];
        if (value && value.length > 0) {
          if (column.canFilterMultipleInTable()) {
            if (
              filterFunc(value, v => !isUndefined(v) && !isNull(v)).length > 0
            ) {
              set(newFilter, column.getTableFilterKey(), value);
            }
          } else if (!isUndefined(value[0]) && !isNull(value[0])) {
            set(newFilter, column.getTableFilterKey(), value[0]);
          }
        }
      }
      return true;
    });

    let newPage = page;
    let newSort = sort;

    if (!onlyFilters) {
      if (sorter && sorter.columnKey && sorter.order) {
        newSort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
      } else {
        newSort = '';
      }

      if (sort !== newSort) {
        newPage = 1;
      }
    }

    if (!isEqual(filter, newFilter)) {
      newPage = 1;
    }

    updatePage({
      page: newPage,
      pagesize,
      sort: newSort,
      filter: newFilter
    });
  };

  updateRecord = async ({
    promise,
    loadingMessage,
    throwError = false,
    reload = false
  }) => {
    let hide;
    if (loadingMessage) {
      hide = message.loading(loadingMessage, 0);
    }

    try {
      await promise;
      if (hide) {
        hide();
      }
    } catch (e) {
      if (hide) {
        hide();
      }
      message.error(e.message);
      if (throwError) {
        throw e;
      }
    }
    if (reload) {
      this.fetch();
    }
  };

  fetch = async () => {
    const { fetch, page, pagesize, sort, filter } = this.props;
    fetch({
      page,
      pagesize,
      sort,
      filter
    });
  };

  renderColumn(column) {
    const { sort, filter, actions, user } = this.props;

    const filterProps = {};

    if (column.canFilterInTable()) {
      const parentFilteredValue = column.parentColumn
        ? get(filter, column.parentColumn.getTableFilterKey())
        : null;

      let filteredValue = get(filter, column.getTableFilterKey());

      if (!isUndefined(filteredValue)) {
        if (column.canFilterRangeInTable() || !isArray(filteredValue)) {
          filteredValue = [filteredValue];
        }
      } else {
        filteredValue = [];
      }

      const filters = column.getFilters(parentFilteredValue, 'disableInFilter');
      const valueOptionsRequest = column.getValueOptionsRequest();

      if (filters) {
        filterProps.filters = filters;
        filterProps.filtered = !!filteredValue.length;
        filterProps.filteredValue = filteredValue;
        filterProps.filterMultiple = column.canFilterMultipleInTable();
      } else if (valueOptionsRequest) {
        if (
          (isArray(parentFilteredValue) && parentFilteredValue.length > 0) ||
          !isUndefined(parentFilteredValue)
        ) {
          filterProps.filterDropdown = () => <Spin style={{ width: '100%' }} />;
          column
            .fetchValueOptions(parentFilteredValue)
            .then(() => this.forceUpdate())
            .catch(() => {});
        }
      } else if (column.canRenderFilterDropDown()) {
        filterProps.filtered = !!filteredValue.length;
        filterProps.filteredValue = filteredValue;
        filterProps.filterDropdown = column.renderFilterDropDown;
        filterProps.filterIcon = filtered => (
          <Icon
            type={column.getFilterIcon()}
            style={{ color: filtered ? '#1890ff' : undefined }}
          />
        );
      }

      filterProps.parentFilteredValue = parentFilteredValue;
    }

    return (
      <Column
        {...filterProps}
        title={column.getTableTitle(filterProps)}
        dataIndex={column.getKey()}
        key={column.getKey()}
        width={column.getTableWidth()}
        fixed={column.getTableFixed()}
        sorter={column.canSortInTable()}
        sortDirections={column.getTableSortDirections().toArray()}
        sortOrder={
          sort && startsWith(sort, `${column.getKey()} `)
            ? `${split(sort, ' ')[1]}end`
            : false
        }
        render={(value, record) => {
          const children = column.renderInTable({
            value,
            record,
            user,
            ...filterProps
          });
          const editAction = actions.getEditAction();
          if (column.canShowEditInTable() && editAction) {
            const action = this.renderAction(editAction, { record, column });
            if (action) {
              return (
                <React.Fragment>
                  {children}
                  <Popover content={action}>
                    <Icon style={{ marginLeft: '1rem' }} type="info-circle" />
                  </Popover>
                </React.Fragment>
              );
            }
          }

          return children;
        }}
      />
    );
  }

  renderFilterGroup() {
    const { table, user } = this.props;
    const columns = table
      .getColumns()
      .filter(
        column => !column.canShowInTable(user) && column.canFilterInTable()
      );
    if (columns.size === 0) {
      return null;
    }

    return (
      <Table
        bordered
        className="filters-table"
        rowKey={table.getPrimaryKey()}
        pagination={false}
        onChange={(pagination, filters, sorter) =>
          this.onChange(pagination, filters, sorter, columns, true)
        }
      >
        {columns.map(column => this.renderColumn(column))}
      </Table>
    );
  }

  renderAction(action, { record, records, column } = {}) {
    const {
      user,
      remove,
      edit,
      create,
      table,
      match: { params: matchParams }
    } = this.props;

    let props = {
      user,
      matchParams,
      remove,
      edit,
      create,
      table,
      column,
      confirm: this.fetch,
      submit: this.updateRecord
    };

    if (record) {
      props = { ...props, record };
    } else if (records) {
      props = {
        ...props,
        records,
        submit: async params => {
          await this.updateRecord({ ...params, throwError: true });
          this.setState({ selectedRowKeys: [], selectedRows: [] });
        }
      };
    }

    return action.render(props);
  }

  renderRowActions() {
    const { actions, user } = this.props;
    const rowActions = actions
      .getRowActions()
      .filter(action => action.isVisible(user));

    return rowActions.size > 0 ? (
      <Column
        title="操作"
        key="action"
        render={(
          text,
          record // eslint-disable-line react/jsx-no-bind
        ) => (
          <div className="actions">
            {rowActions.map(action => this.renderAction(action, { record }))}
          </div>
        )}
      />
    ) : null;
  }

  renderGlobalActions(multipleActions) {
    const { actions, user } = this.props;
    const globalActions = actions
      .getGlobalActions()
      .filter(action => action.isVisible(user));

    if (
      globalActions.size === 0 &&
      (!multipleActions || multipleActions.size === 0)
    ) {
      return null;
    }

    const { selectedRows: records } = this.state;

    return (
      <Group title="操作">
        <div className="actions">
          {globalActions.map(action => this.renderAction(action))}
          {multipleActions &&
            multipleActions.map(action =>
              this.renderAction(action, { records })
            )}
        </div>
      </Group>
    );
  }

  renderContent() {
    const { dataSource, selectedRowKeys } = this.state;
    const {
      total,
      page,
      pagesize,
      table,
      isLoading,
      user,
      actions,
      paginationComponentProps
    } = this.props;

    const multipleActions = actions
      .getMultipleActions()
      .filter(action => action.isVisible(user));

    const rowSelection =
      multipleActions.size > 0
        ? {
            selectedRowKeys,
            onChange: this.onSelectChange
          }
        : null;

    const columns = table
      .getColumns()
      .filter(column => column.canShowInTable(user));

    return (
      <React.Fragment>
        {this.renderGlobalActions(multipleActions)}
        <Group title="列表">
          {this.renderFilterGroup()}
          <Table
            bordered
            loading={isLoading}
            dataSource={dataSource}
            rowKey={table.getPrimaryKey()}
            rowSelection={rowSelection}
            pagination={false}
            scroll={
              table.getScrollWidth() > 0 ? { x: table.getScrollWidth() } : {}
            }
            onChange={(pagination, filters, sorter) =>
              this.onChange(pagination, filters, sorter, columns)
            }
          >
            {columns.map(column => this.renderColumn(column))}
            {this.renderRowActions()}
          </Table>
          <Pagination
            showQuickJumper
            showSizeChanger
            showTotal={RecordsPage.showTotal}
            {...paginationComponentProps}
            className="ant-table-pagination"
            total={total}
            current={page}
            pageSize={pagesize}
            onChange={this.onChangePage}
            onShowSizeChange={this.onChangePage}
          />
        </Group>
      </React.Fragment>
    );
  }

  render() {
    const { component: Component, error, inline } = this.props;
    return (
      <Page
        isError={!!error}
        errorMessage={error ? error.message : ''}
        showWatermark={!inline}
      >
        {Component ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            <Component />
          </Card>
        ) : null}
        <Card className={classNames('content-card', inline ? 'inline' : '')}>
          {this.renderContent()}
        </Card>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RecordsPage);

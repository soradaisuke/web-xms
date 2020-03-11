import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Immutable from 'immutable';
import classNames from 'classnames';
import {
  Table,
  Pagination,
  message,
  Card,
  Spin,
  Popover,
  Icon,
  Button,
  Popconfirm,
  Row,
  Radio,
  Checkbox,
  Col
} from 'antd';
import {
  split,
  startsWith,
  isArray,
  isEqual,
  size,
  map,
  get,
  set,
  unset,
  isUndefined,
  isNull,
  cloneDeep,
  isFunction,
  groupBy,
  isBoolean,
  filter as filterFunc
} from 'lodash';
import TableType from '../schema/Table';
import TableActions from '../actions/TableActions';
import Group from '../components/Group';
import Page from './Page';
import showError from '../utils/showError';
import './RecordsPage.less';
import { DEFAULT_GROUP_NAME } from '../schema/Column';

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
    tableComponentProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
        const fixedFilterValue = isBoolean(column.getTableFilterRequired())
          ? column.getTableFilterDefault()
          : column.getTableFilterRequired();
        if (
          isUndefined(get(newFilter, column.getTableFilterKey())) &&
          column.getTableFilterRequired() &&
          fixedFilterValue
        ) {
          set(newFilter, column.getTableFilterKey(), fixedFilterValue);
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
    reload = false,
    onComplete
  }) => {
    let hide;
    if (loadingMessage) {
      hide = message.loading(loadingMessage, 0);
    }

    try {
      const result = await promise;
      if (hide) {
        hide();
      }
      if (isFunction(onComplete)) {
        onComplete({ result });
      }
    } catch (e) {
      if (hide) {
        hide();
      }
      showError(e.message);
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

  resetFilters = () => {
    const { updatePage, page, pagesize, sort } = this.props;
    updatePage({ page, pagesize, sort });
  };

  renderColumn(column, shouldRenderTableFilter = true) {
    const { sort, filter, actions, user } = this.props;

    const filterProps = {};

    if (column.canFilterInTable() && shouldRenderTableFilter) {
      const parentFilteredValue = column.parentColumn
        ? get(filter, column.parentColumn.getTableFilterKey())
        : null;

      let filteredValue = get(filter, column.getTableFilterKey());

      if (!isUndefined(filteredValue)) {
        if (
          column.canFilterRangeInTable() ||
          !column.canFilterMultipleInTable()
        ) {
          filteredValue = [filteredValue];
        }
      } else {
        filteredValue = [];
      }

      const filters = column.getFilters(parentFilteredValue, 'disableInFilter');
      const valueOptionsRequest = column.getValueOptionsRequest();

      if (filters || column.getTableFilterSearchRequest()) {
        filterProps.filters = filters;
        filterProps.filtered = !!filteredValue.length;
        filterProps.filteredValue = filteredValue;
        filterProps.filterMultiple = column.canFilterMultipleInTable();
        if (
          column.canFilterTreeInTable() ||
          column.getTableFilterSearchRequest()
        ) {
          filterProps.filterDropdown = column.getRenderFilterTree({
            parentValue: parentFilteredValue
          });
          filterProps.filterIcon = filtered => (
            <Icon
              type="filter"
              style={{ color: filtered ? '#1890ff' : undefined }}
            />
          );
        }
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
          if (column.canInlineEdit() && editAction) {
            let action = this.renderAction(editAction, {
              record,
              column,
              inline: true
            });
            if (action) {
              return action;
            }
            action = this.renderAction(editAction, { record, column });
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

  renderExpandFilters(column) {
    const { filter, pagesize, sort, updatePage } = this.props;

    const parentFilteredValue = column.parentColumn
      ? get(filter, column.parentColumn.getTableFilterKey())
      : null;

    const filteredValue = get(filter, column.getTableFilterKey());

    const filters = column.getFilters(parentFilteredValue, 'disableInFilter');
    const valueOptionsRequest = column.getValueOptionsRequest();
    const filterMultiple = column.canFilterMultipleInTable();

    if (
      !filters &&
      !column.getTableFilterSearchRequest() &&
      valueOptionsRequest
    ) {
      if (
        (isArray(parentFilteredValue) && parentFilteredValue.length > 0) ||
        !isUndefined(parentFilteredValue)
      ) {
        column
          .fetchValueOptions(parentFilteredValue)
          .then(() => this.forceUpdate())
          .catch(() => {});
      }
    }

    const options = filters
      ? filters.map(({ value, text: label }) => ({ value, label }))
      : [];
    const FilterComponent = filterMultiple ? Checkbox.Group : Radio.Group;
    let fixedFilterValue = isBoolean(column.getTableFilterRequired())
      ? column.getTableFilterDefault()
      : column.getTableFilterRequired();
    if (fixedFilterValue && isFunction(fixedFilterValue.toJS)) {
      fixedFilterValue = fixedFilterValue.toJS();
    }

    return (
      <Row type="flex" align="middle" style={{ marginBottom: '1rem' }}>
        {`${column.getTitle()}：`}
        <FilterComponent
          buttonStyle="solid"
          options={filterMultiple ? options : null}
          value={filteredValue}
          onChange={e => {
            let value;
            if (filterMultiple) {
              value = e;
            } else {
              value = e.target.value; // eslint-disable-line prefer-destructuring
            }
            const newFilter = cloneDeep(filter);
            if (
              (isUndefined(value) || (isArray(value) && !size(value))) &&
              column.getTableFilterRequired() &&
              fixedFilterValue
            ) {
              value = fixedFilterValue;
            }
            unset(newFilter, column.getTableFilterKey());
            updatePage({
              page: 1,
              pagesize,
              sort,
              filter: {
                ...newFilter,
                [column.getTableFilterKey()]: value
              }
            });
          }}
        >
          {!filterMultiple &&
            [{ value: fixedFilterValue, label: '全部' }, ...options].map(
              ({ label, value }) => (
                <Radio.Button value={value}>{label}</Radio.Button>
              )
            )}
        </FilterComponent>
      </Row>
    );
  }

  renderExpandFilterGroup() {
    const { table } = this.props;
    const columns = table
      .getColumns()
      .filter(column => column.shouldRenderExpandFilter());
    if (columns.size === 0) {
      return null;
    }

    return columns.map(column => this.renderExpandFilters(column));
  }

  renderFilterGroup() {
    const { table, user } = this.props;
    const columns = table
      .getColumns()
      .filter(column => column.shouldRenderOutsideFilter(user));
    if (columns.size === 0) {
      return null;
    }
    const renderFilterGroupTable = filterColumns => (
      <Table
        bordered
        className="filters-table"
        rowKey={table.getPrimaryKey()}
        pagination={false}
        onChange={(pagination, filters, sorter) =>
          this.onChange(pagination, filters, sorter, columns, true)
        }
        scroll={{}}
      >
        {filterColumns.map(column => this.renderColumn(column))}
      </Table>
    );
    const groupedColumns = groupBy(columns.toArray(), column =>
      column.getFilterGroup()
    );

    if (size(groupedColumns) === 1) {
      return renderFilterGroupTable(groupedColumns[DEFAULT_GROUP_NAME]);
    }
    return map(groupedColumns, (iColumns, groupName) => (
      <Row key={groupName} type="flex">
        <Col className="filter-group-name">{groupName}</Col>
        <Col style={{ flex: 1 }}>
          {renderFilterGroupTable(iColumns, groupName)}
        </Col>
      </Row>
    ));
  }

  renderAction(action, { record, records, column, inline } = {}) {
    const {
      user,
      remove,
      edit,
      create,
      table,
      match: { params: matchParams }
    } = this.props;

    let props = {
      inline,
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
      tableScroll,
      tableComponentProps,
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

    const defaultTableScroll =
      table.getScrollWidth() > 0 ? { x: table.getScrollWidth() } : {};

    const hasFilter = table.getHasFilter();
    return (
      <React.Fragment>
        {this.renderGlobalActions(multipleActions)}
        <Group title="列表">
          {this.renderExpandFilterGroup()}
          {this.renderFilterGroup()}
          {hasFilter && (
            <Popconfirm
              title="确认重置全部筛选项?"
              onConfirm={this.resetFilters}
            >
              <Button type="primary" style={{ marginBottom: '1rem' }}>
                重置
              </Button>
            </Popconfirm>
          )}
          <Table
            bordered
            scroll={tableScroll || defaultTableScroll}
            {...tableComponentProps}
            loading={isLoading}
            dataSource={dataSource}
            rowKey={table.getPrimaryKey()}
            rowSelection={rowSelection}
            pagination={false}
            onChange={(pagination, filters, sorter) =>
              this.onChange(pagination, filters, sorter, columns)
            }
          >
            {columns.map(column =>
              this.renderColumn(column, column.shouldRenderTableFilter(user))
            )}
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
        <Card
          className={classNames('content-card', inline ? 'inline' : '')}
          style={{ minHeight: '600px' }}
        >
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

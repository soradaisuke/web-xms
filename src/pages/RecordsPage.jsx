import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Immutable from 'immutable';
import classNames from 'classnames';
import { FilterOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Table,
  Pagination,
  Card,
  Spin,
  Popover,
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
  values,
  unset,
  isUndefined,
  isNull,
  cloneDeep,
  isFunction,
  groupBy,
  isBoolean,
  isObject,
  filter as filterFunc
} from 'lodash';
import EditableTableCell from '../components/EditableTableCell';
import EditableTableRow from '../components/EditableTableRow';
import TableType from '../schema/Table';
import TableActions from '../actions/TableActions';
import Group from '../components/Group';
import Page from './Page';
import visiblePromise from '../utils/visiblePromise';
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
    tableComponentProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    isLoading: PropTypes.bool,
    filterGroupTrigger: PropTypes.bool,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    inline: PropTypes.bool,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    sort: PropTypes.string,
    total: PropTypes.number,
    user: PropTypes.instanceOf(Immutable.Map),
    paginationComponentProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types,
    tableScroll: PropTypes.object // eslint-disable-line react/forbid-prop-types,
  };

  static defaultProps = {
    component: null,
    isLoading: false,
    filterGroupTrigger: false,
    filter: {},
    records: Immutable.List(),
    page: 1,
    pagesize: 10,
    sort: '',
    total: 0,
    inline: false,
    user: null,
    paginationComponentProps: {},
    tableScroll: null
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
  }

  constructor(props) {
    super(props);

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

  state = {
    records: Immutable.List(),
    dataSource: [],
    selectedRowKeys: [],
    pendingFilter: {},
    selectedRows: []
  };

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

  resetPendingFilter = () => {
    this.setState({
      pendingFilter: {}
    });
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

  checkFixedFilterValue = ({ filter, column }) => {
    const fixedFilterValue = column.getTableFixedFilterValue();
    if (
      isUndefined(get(filter, column.getTableFilterKey())) &&
      fixedFilterValue
    ) {
      set(filter, column.getTableFilterKey(), fixedFilterValue);
    }
  };

  onChange = ({ filters, sorter, columns, onlyFilters = false }) => {
    const { page, pagesize, updatePage, sort, filter } = this.props;

    const newFilter = cloneDeep(filter);
    columns.forEach(column => {
      if (
        column.shouldRenderTableFilter() ||
        column.shouldRenderOutsideFilter()
      ) {
        unset(newFilter, column.getTableFilterKey());

        if (column.parentColumn) {
          let parentFilteredValue = filters[column.parentColumn.getKey()];
          parentFilteredValue =
            column.parentColumn.canFilterMultipleInTable() ||
            !parentFilteredValue
              ? parentFilteredValue
              : parentFilteredValue[0];

          if (
            !isEqual(
              parentFilteredValue,
              get({ ...filter }, column.parentColumn.getTableFilterKey())
            )
          ) {
            set(newFilter, column.getTableFilterKey(), null);
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
        this.checkFixedFilterValue({
          filter: newFilter,
          column
        });
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

  onChangeTriggeredFilter = ({ filters, columns }) => {
    const { filter } = this.props;
    const { pendingFilter } = this.state;
    const newFilter = cloneDeep(pendingFilter);

    columns.forEach(column => {
      unset(newFilter, column.getTableFilterKey());

      if (column.parentColumn) {
        const parentFilteredValue =
          filters[column.parentColumn.getTableFilterKey()];

        if (
          !isEqual(
            parentFilteredValue,
            get(
              { ...filter, ...pendingFilter },
              column.parentColumn.getTableFilterKey()
            )
          )
        ) {
          set(newFilter, column.getTableFilterKey(), null);
          return true;
        }
      }
      const value = filters[column.getTableFilterKey()];
      set(newFilter, column.getTableFilterKey(), value);
      this.checkFixedFilterValue({
        filter: newFilter,
        column
      });
      return true;
    });

    this.setState({
      pendingFilter: newFilter
    });
  };

  updateRecord = async ({
    promise,
    loadingMessage,
    throwError = false,
    reload = false,
    onComplete
  }) => {
    await visiblePromise({
      promise,
      loadingMessage,
      throwError,
      onComplete: ({ result }) => {
        if (isFunction(onComplete)) {
          onComplete({ result });
        }
        if (reload) {
          this.fetch();
        }
      }
    });
  };

  fetch = async () => {
    const { fetch, page, pagesize, sort, filter } = this.props;

    this.resetTableState();

    fetch({
      page,
      pagesize,
      sort,
      filter
    });
  };

  resetFilters = () => {
    const {
      updatePage,
      page,
      pagesize,
      sort,
      table: { columns }
    } = this.props;
    this.setState({
      pendingFilter: {}
    });
    const filter = {};
    columns.forEach(column => {
      if (!column.canFilterInTable()) {
        return;
      }
      this.checkFixedFilterValue({
        filter,
        column
      });
    });
    updatePage({ page, pagesize, sort, filter });
  };

  onClickFilterGroupSearch = columns => {
    const { pagesize, updatePage, sort, filter } = this.props;
    const { pendingFilter } = this.state;
    const newFilter = { ...filter, ...pendingFilter };
    columns.forEach(column => {
      const filterKey = column.getTableFilterKey();
      if (!isUndefined(newFilter[filterKey])) {
        set(
          newFilter,
          filterKey,
          column.formatFormSubmitValue(newFilter[filterKey])
        );
      }
    });
    updatePage({
      page: 1,
      pagesize,
      sort,
      filter: newFilter
    });
    this.resetPendingFilter();
  };

  resetTableState() {
    const { selectedRowKeys, selectedRows } = this.state;
    if (selectedRowKeys.length || selectedRows.length) {
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      });
    }
  }

  renderColumn({
    column,
    columns,
    shouldRenderTableFilter = true,
    renderFilterInTitle = false
  }) {
    const {
      sort,
      filter: propsFilter,
      actions,
      table,
      edit,
      user,
      match: { params: matchParams },
      filterGroupTrigger
    } = this.props;
    const { pendingFilter } = this.state;
    const filter = { ...propsFilter, ...pendingFilter };
    const filterProps = {};
    const isAutoTrigger =
      !column.shouldRenderOutsideFilter() || !filterGroupTrigger;

    if (column.canFilterInTable() && shouldRenderTableFilter) {
      const parentFilteredValue = column.parentColumn
        ? get(filter, column.parentColumn.getTableFilterKey())
        : null;

      let filteredValue = get(filter, column.getTableFilterKey());

      if (filteredValue || filteredValue === 0 || isBoolean(filteredValue)) {
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
        filterProps.filtered =
          !!filteredValue.length &&
          !(filteredValue.length === 1 && filteredValue[0] === null);
        filterProps.filteredValue = filteredValue;
        filterProps.filterMultiple = column.canFilterMultipleInTable();
        if (
          column.canFilterTreeInTable() ||
          column.getTableFilterSearchRequest()
        ) {
          filterProps.filterDropdown = column.getRenderFilterTree({
            parentValue: parentFilteredValue,
            isAutoTrigger
          });
          filterProps.filterIcon = filtered => (
            <FilterOutlined
              style={{ color: filtered ? '#1890ff' : undefined }}
            />
          );
        }
      } else if (valueOptionsRequest) {
        if (
          (isArray(parentFilteredValue) &&
            parentFilteredValue.length > 0 &&
            parentFilteredValue[0] !== null) ||
          !isUndefined(parentFilteredValue)
        ) {
          filterProps.filterDropdown = () => <Spin style={{ width: '100%' }} />;
          column
            .fetchValueOptions(parentFilteredValue)
            .then(() => this.forceUpdate())
            .catch(() => {});
        }
      } else if (column.canRenderFilterDropDown() && !renderFilterInTitle) {
        filterProps.filtered = !!filteredValue.length;
        filterProps.filteredValue = filteredValue;
        filterProps.filterDropdown = dropDownParams =>
          column.renderFilterDropDown({
            ...dropDownParams,
            isAutoTrigger
          });
        filterProps.filterIcon = filtered => (
          <LegacyIcon
            type={column.getFilterIcon()}
            style={{ color: filtered ? '#1890ff' : undefined }}
          />
        );
      }

      filterProps.parentFilteredValue = parentFilteredValue;
    }
    const parentFilteredValue = column.parentColumn
      ? get(filter, column.parentColumn.getTableFilterKey())
      : undefined;
    const editAction = actions.getEditAction();
    const filteredValue = get(filter, column.getTableFilterKey());
    return (
      <Column
        {...(renderFilterInTitle ? {} : filterProps)}
        title={
          renderFilterInTitle ? (
            <Col>
              <div>{column.getTitle()}</div>
              {column.renderInForm({
                isFilter: true,
                // treeData: generateTreeData(filterProps.filters || []),
                formComponentProps: {
                  ...column.getTableFilterComponentProps(),
                  parentValue: parentFilteredValue,
                  treeCheckable: column.canFilterMultipleInTable(),
                  value:
                    isUndefined(filteredValue) || filteredValue === null
                      ? undefined
                      : column.formatFormFieldValue(filteredValue),
                  onChange: v => {
                    const value =
                      isObject(v) && isObject(v.target) ? v.target.value : v;
                    this.onChangeTriggeredFilter({
                      filters: {
                        ...filter,
                        [column.getTableFilterKey()]: isUndefined(value)
                          ? null
                          : value
                      },
                      columns
                    });
                  },
                  style: { width: 200 },
                  getPopupContainer: () =>
                    document.getElementsByClassName('xms-page')[0]
                }
              })}
            </Col>
          ) : (
            column.getTableTitle(filterProps)
          )
        }
        dataIndex={column.getKey()}
        key={column.getKey()}
        width={column.getTableWidth()}
        fixed={column.getTableFixed()}
        sorter={column.canSortInTable()}
        sortDirections={column.getTableSortDirections().toArray()}
        onCell={
          column.canShowFormItemInEditableTable() && column.canInlineEdit()
            ? record => ({
                record,
                column,
                table,
                user,
                submit:
                  editAction &&
                  editAction.isVisible() &&
                  isFunction(editAction.isDisabled) &&
                  !editAction.isDisabled({
                    user,
                    record,
                    table,
                    matchParams
                  })
                    ? body =>
                        this.updateRecord({
                          promise: editAction.getHandler({ edit })({
                            id: get(record, table.getPrimaryKey()),
                            body
                          }),
                          throwError: true,
                          reload: true,
                          loadingMessage: editAction.getHandlingMessage()
                        })
                    : null
              })
            : null
        }
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
            reload: this.fetch,
            ...filterProps
          });
          if (
            column.canInlineEdit() &&
            editAction &&
            !column.canShowFormItemInEditableTable()
          ) {
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
                <>
                  {children}
                  <Popover content={action}>
                    <InfoCircleOutlined style={{ marginLeft: '1rem' }} />
                  </Popover>
                </>
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
    const fixedFilterValue = column.getTableFixedFilterValue();

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
            [
              { value: fixedFilterValue, label: '全部' },
              ...options
            ].map(({ label, value }) => (
              <Radio.Button value={value}>{label}</Radio.Button>
            ))}
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
    const { table, user, filterGroupTrigger } = this.props;
    const columns = table
      .getColumns()
      .filter(column => column.shouldRenderOutsideFilter(user));
    const searchButton = (
      <Button
        type="primary"
        style={{ marginBottom: '0.5rem' }}
        onClick={() => this.onClickFilterGroupSearch(columns)}
      >
        搜索
      </Button>
    );
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
          this.onChange({
            pagination,
            filters,
            sorter,
            columns: filterColumns,
            onlyFilter: true
          })
        }
        scroll={{ x: true }}
        getPopupContainer={() => document.getElementsByClassName('xms-page')[0]}
      >
        {filterColumns.map(column =>
          this.renderColumn({
            column,
            columns: filterColumns,
            renderFilterInTitle: filterGroupTrigger
          })
        )}
      </Table>
    );
    const groupedColumns = groupBy(columns.toArray(), column =>
      column.getFilterGroup()
    );

    if (size(groupedColumns) === 1) {
      return (
        <>
          {renderFilterGroupTable(values(groupedColumns)[0])}
          {filterGroupTrigger && searchButton}
        </>
      );
    }
    return (
      <>
        {map(groupedColumns, (iColumns, groupName) => (
          <Row key={groupName} type="flex">
            <Col className="filter-group-name">{groupName}</Col>
            <Col style={{ flex: 1 }}>{renderFilterGroupTable(iColumns)}</Col>
          </Row>
        ))}
        {filterGroupTrigger && (
          <Row key="button" type="flex">
            <Col className="filter-group-name" />
            <Col style={{ flex: 1 }}>{searchButton}</Col>
          </Row>
        )}
      </>
    );
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
          this.resetTableState();
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

    const { records } = this.props;
    const { selectedRows } = this.state;

    return (
      <Group title="操作">
        <div className="actions">
          {globalActions.map(action => this.renderAction(action, { records }))}
          {multipleActions &&
            multipleActions.map(action =>
              this.renderAction(action, { records: selectedRows })
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
      <>
        {this.renderGlobalActions(multipleActions)}
        <Group title="列表">
          {this.renderExpandFilterGroup()}
          {this.renderFilterGroup()}
          {hasFilter && (
            <Row style={{ marginTop: 10 }}>
              <Popconfirm
                title="确认重置全部筛选项?"
                onConfirm={this.resetFilters}
              >
                <Button type="primary" style={{ marginBottom: '1rem' }}>
                  重置
                </Button>
              </Popconfirm>
            </Row>
          )}
          <Table
            bordered
            components={{
              body: {
                row: EditableTableRow,
                cell: EditableTableCell
              }
            }}
            rowClassName={() => 'editable-row'}
            scroll={tableScroll || defaultTableScroll}
            {...tableComponentProps}
            loading={isLoading}
            dataSource={dataSource}
            rowKey={table.getPrimaryKey()}
            rowSelection={rowSelection}
            pagination={false}
            onChange={(pagination, filters, sorter) =>
              this.onChange({ pagination, filters, sorter, columns })
            }
            getPopupContainer={() =>
              document.getElementsByClassName('xms-page')[0]
            }
          >
            {columns.map(column =>
              this.renderColumn({
                column,
                shouldRenderTableFilter: column.shouldRenderTableFilter(user)
              })
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
      </>
    );
  }

  render() {
    const { component: Component, inline, records } = this.props;
    return (
      <Page showWatermark={!inline}>
        {Component ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            <Component records={records} />
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

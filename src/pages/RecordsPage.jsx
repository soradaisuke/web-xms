import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Immutable from 'immutable';
import classNames from 'classnames';
import { Table, Card, Button, Form } from 'antd';
import {
  split,
  startsWith,
  isEqual,
  map,
  get,
  isBoolean,
  groupBy
} from 'lodash';
import EditableTableCell from '../components/Editable/EditableTableCell';
import EditableTableRow from '../components/Editable/EditableTableRow';
import TableType from '../schema/Table';
import TableActions from '../actions/TableActions';
import Group from '../components/Group';
import Page from './Page';
import Action from '../components/Action';
import FilterDropDown from '../components/Filter/FilterDropDown';
import FilterIcon from '../components/Filter/FilterIcon';
import FormItem from '../components/Filter/FormItem';
import PageFilterFormContext from '../contexts/PageFilterFormContext';
import './RecordsPage.less';

const { Column } = Table;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    actions: PropTypes.instanceOf(TableActions).isRequired,
    fetch: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    table: PropTypes.instanceOf(TableType).isRequired,
    updatePage: PropTypes.func.isRequired,
    tableProps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
    user: PropTypes.instanceOf(Immutable.Map)
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
    user: null
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
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
    selectedRows: []
  };

  form = React.createRef();

  constructor(props) {
    super(props);

    props.table.columns.forEach(column => {
      column.resetFilters();
    });
  }

  componentDidMount() {
    this.fetch();
    this.updateFilterForm();
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

      if (!isEqual(prevProps.filter, filter)) {
        this.updateFilterForm();
      }
    }
  }

  updateFilterForm = () => {
    const { filter } = this.props;

    // eslint-disable-next-line no-unused-expressions
    this.form.current?.setFieldsValue(filter);
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onFinish = filter => {
    const { page, pagesize, sort, updatePage } = this.props;
    updatePage({
      page,
      pagesize,
      sort,
      filter
    });
  };

  onChange = (pagination, _, sorter) => {
    const { updatePage, sort, filter } = this.props;

    let newPage = pagination.page;
    const newPageSize = pagination.pageSize;
    let newSort = '';

    if (sorter && sorter.columnKey && sorter.order) {
      newSort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
    }

    if (sort !== newSort) {
      newPage = 1;
    }

    updatePage({
      page: newPage,
      pagesize: newPageSize,
      sort: newSort,
      filter
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
    // eslint-disable-next-line no-unused-expressions
    this.form.current?.resetFields();
    // eslint-disable-next-line no-unused-expressions
    this.form.current?.submit();
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

  renderColumn(column) {
    const { sort, filter, user } = this.props;
    const filterProps = {};

    if (column.canFilterInTable()) {
      let filteredValue = get(filter, column.getFilterKey());

      if (filteredValue || filteredValue === 0 || isBoolean(filteredValue)) {
        if (column.canFilterRange() || !column.canFilterMultiple()) {
          filteredValue = [filteredValue];
        }
      } else {
        filteredValue = [];
      }

      filterProps.filtered =
        !!filteredValue.length &&
        !(filteredValue.length === 1 && filteredValue[0] === null);
      filterProps.filteredValue = filteredValue;
      filterProps.filterMultiple = column.canFilterMultiple();
      filterProps.filterDropdown = dropDownParams => (
        <FilterDropDown column={column} {...dropDownParams} />
      );
      filterProps.filterIcon = filtered => (
        <FilterIcon column={column} filtered={filtered} />
      );
    }
    return (
      <Column
        {...filterProps}
        title={column.getTitle()}
        dataIndex={column.getKey()}
        key={column.getKey()}
        width={column.getTableWidth()}
        fixed={column.getTableFixed()}
        sorter={column.canSortInTable()}
        sortDirections={column.getTableSortDirections().toArray()}
        onCell={record => ({
          record,
          column,
          onComplete: this.fetch
        })}
        sortOrder={
          sort && startsWith(sort, `${column.getKey()} `)
            ? `${split(sort, ' ')[1]}end`
            : false
        }
        render={(value, record) =>
          column.renderInTable({
            value,
            record,
            user,
            reload: this.fetch,
            ...filterProps
          })
        }
      />
    );
  }

  renderAction(action, { record, records } = {}) {
    return (
      <Action
        action={action}
        record={record}
        records={records}
        onComplete={this.fetch}
      />
    );
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

  renderFilterItems() {
    const { user, table } = this.props;

    const groupedColumns = groupBy(
      table
        .getColumns()
        .filter(
          column => column.canFilterInTable() && column.canShowInTable(user)
        )
        .toArray(),
      column => column.getFilterGroup()
    );

    return (
      <Form layout="inline" ref={this.form} onFinish={this.onFinish}>
        {map(groupedColumns, (cs, name) => (
          <React.Fragment key={name}>
            {name && <Form.Item label={name} />}
            {cs.map(column => (
              <FormItem key={column.getFilterKey()} column={column} />
            ))}
            <div className="line-break" style={{ width: '100%' }} />
          </React.Fragment>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            筛选
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            danger
            type="primary"
            htmlType="submit"
            onClick={this.resetFilters}
          >
            重置
          </Button>
        </Form.Item>
      </Form>
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
      tableProps
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
      <PageFilterFormContext.Provider value={this.form}>
        {this.renderGlobalActions(multipleActions)}
        <Group title="列表">
          {hasFilter && this.renderFilterItems()}
          <Table
            bordered
            scroll={defaultTableScroll}
            {...tableProps}
            components={{
              body: {
                row: EditableTableRow,
                cell: EditableTableCell
              }
            }}
            rowClassName={() => 'editable-row'}
            loading={isLoading}
            dataSource={dataSource}
            rowKey={table.getPrimaryKey()}
            rowSelection={rowSelection}
            onChange={this.onChange}
            getPopupContainer={() =>
              document.getElementsByClassName('xms-page')[0]
            }
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: RecordsPage.showTotal,
              ...(tableProps.pagination ?? {}),
              className: 'ant-table-pagination',
              total,
              current: page,
              pageSize: pagesize
            }}
          >
            {columns.map(column => this.renderColumn(column))}
            {this.renderRowActions()}
          </Table>
        </Group>
      </PageFilterFormContext.Provider>
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

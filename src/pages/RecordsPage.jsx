import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import { Table, Card, Button, Form } from 'antd';
import { split, startsWith, map, get, isBoolean, groupBy } from 'lodash';
import { useEventCallback } from '@qt/react';
import EditableTableCell from '../components/Editable/EditableTableCell';
import EditableTableRow from '../components/Editable/EditableTableRow';
import Group from '../components/Group';
import Page from './Page';
import Action from '../components/Action';
import FilterDropDown from '../components/Filter/FilterDropDown';
import FilterIcon from '../components/Filter/FilterIcon';
import FormItem from '../components/Filter/FormItem';
import PageFilterFormContext from '../contexts/PageFilterFormContext';
import useUser from '../hooks/useUser';
import usePageConfig from '../hooks/usePageConfig';
import './RecordsPage.less';

const { Column } = Table;

function showTotal(total, range) {
  return `${range[0]}-${range[1]}，共${total}个`;
}

function RecordsPage({
  page,
  pagesize,
  sort,
  filter,
  isLoading,
  records,
  total
}) {
  const [form] = Form.useForm();
  const user = useUser();
  const {
    component: Component,
    inline,
    table,
    fetch: fetchEffect,
    updatePage,
    tableProps,
    filterFormProps
  } = usePageConfig();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dataSource = useMemo(() => records.toJS(), [records]);
  const rowActions = useMemo(
    () => table.getRowActions().filter(action => action.isVisible(user)),
    [user, table]
  );
  const multipleActions = useMemo(
    () => table.getMultipleActions().filter(action => action.isVisible(user)),
    [user, table]
  );
  const globalActions = useMemo(
    () => table.getGlobalActions().filter(action => action.isVisible(user)),
    [user, table]
  );
  const columns = useMemo(
    () => table.getColumns().filter(column => column.canShowInTable(user)),
    [table, user]
  );
  const filterColumns = useMemo(
    () => columns.filter(column => column.canFilter()),
    [columns]
  );
  const hasOutsideFilter = useMemo(
    () => filterColumns.filter(column => column.canFilterOutside()).size > 0,
    [filterColumns]
  );
  const hasTableFilter = useMemo(
    () => filterColumns.filter(column => !column.canFilterOutside()).size > 0,
    [filterColumns]
  );
  const groupedFilterColumns = useMemo(
    () => groupBy(filterColumns.toArray(), column => column.getFilterGroup()),
    [filterColumns]
  );

  const onTableSelectChange = useEventCallback((rowKeys, rows) => {
    setSelectedRows(rows);
    setSelectedRowKeys(rowKeys);
  });

  const onFilterFinish = useEventCallback(f => {
    updatePage({
      page,
      pagesize,
      sort,
      filter: f
    });
  });

  const onTableChange = useEventCallback((pagination, _, sorter) => {
    let newPage = pagination.current;
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
  });

  const onResetFilters = useEventCallback(() => {
    form.resetFields();
    form.submit();
  });

  const rowSelection = useMemo(
    () =>
      multipleActions.size > 0
        ? {
            selectedRowKeys,
            onChange: onTableSelectChange
          }
        : null,
    [multipleActions, selectedRowKeys, onTableSelectChange]
  );

  const fetch = useCallback(() => {
    setSelectedRows([]);
    setSelectedRowKeys([]);

    fetchEffect({
      page,
      pagesize,
      sort,
      filter
    });
  }, [fetchEffect, filter, page, pagesize, sort]);

  const renderColumn = useCallback(
    column => {
      const filterProps = {};

      if (column.canFilter() && !column.canFilterOutside()) {
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
          {...column.getTableColumnProps()}
          {...filterProps}
          title={column.getTitle()}
          dataIndex={column.getKey()}
          key={column.getKey()}
          sorter={column.canSortInTable()}
          sortDirections={column.getTableSortDirections()}
          onCell={record => ({
            record,
            column,
            onComplete: fetch
          })}
          sortOrder={
            sort && startsWith(sort, `${column.getKey()} `)
              ? `${split(sort, ' ')[1]}end`
              : false
          }
        />
      );
    },
    [fetch, filter, sort]
  );

  useEffect(() => {
    table.columns.forEach(column => {
      column.resetFilters();
    });
  }, [table.columns]);

  useEffect(() => {
    form.setFieldsValue(filter);
  }, [filter, form]);

  useEffect(() => {
    fetch();
  }, [fetch, page, pagesize, sort, filter]);

  const filterFormChildren = useMemo(() => {
    return (
      (hasOutsideFilter || hasTableFilter) && (
        <Form
          layout="inline"
          {...filterFormProps}
          form={form}
          onFinish={onFilterFinish}
        >
          {map(groupedFilterColumns, (cs, name) => (
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
              onClick={onResetFilters}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      )
    );
  }, [
    filterFormProps,
    form,
    groupedFilterColumns,
    hasOutsideFilter,
    hasTableFilter,
    onFilterFinish,
    onResetFilters
  ]);

  const globalActionsChildren = useMemo(() => {
    return (
      globalActions.size > 0 && (
        <Group title="操作">
          <div className="actions">
            {globalActions &&
              globalActions.map(action => (
                <Action
                  key={action.getTitle()}
                  action={action}
                  records={
                    action.isMultipleAction() ? selectedRows : dataSource
                  }
                  onComplete={fetch}
                />
              ))}
          </div>
        </Group>
      )
    );
  }, [fetch, globalActions, dataSource, selectedRows]);

  const tableChildren = useMemo(() => {
    return (
      <Table
        bordered
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
        onChange={onTableChange}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal,
          ...(tableProps.pagination ?? {}),
          total,
          current: page,
          pageSize: pagesize
        }}
      >
        {columns.map(column => renderColumn(column))}
        {rowActions.size > 0 ? (
          <Column
            title="操作"
            key="action"
            render={(
              record // eslint-disable-line react/jsx-no-bind
            ) => (
              <div className="actions">
                {rowActions.map(action => (
                  <Action
                    key={action.getTitle()}
                    action={action}
                    record={record}
                    onComplete={fetch}
                  />
                ))}
              </div>
            )}
          />
        ) : null}
      </Table>
    );
  }, [
    columns,
    dataSource,
    fetch,
    isLoading,
    onTableChange,
    page,
    pagesize,
    renderColumn,
    rowActions,
    rowSelection,
    table,
    tableProps,
    total
  ]);

  return (
    <Page>
      {Component ? (
        <Card className={classNames('content-card', inline ? 'inline' : '')}>
          <Component />
        </Card>
      ) : null}
      <Card className={classNames('content-card', inline ? 'inline' : '')}>
        <PageFilterFormContext.Provider value={form}>
          {globalActionsChildren}
          <Group title="列表">
            {filterFormChildren}
            {tableChildren}
          </Group>
        </PageFilterFormContext.Provider>
      </Card>
    </Page>
  );
}

RecordsPage.propTypes = {
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  pagesize: PropTypes.number,
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
  sort: PropTypes.string,
  total: PropTypes.number
};

RecordsPage.defaultProps = {
  isLoading: false,
  filter: {},
  records: Immutable.List(),
  page: 1,
  pagesize: 10,
  sort: '',
  total: 0
};

export default React.memo(RecordsPage);

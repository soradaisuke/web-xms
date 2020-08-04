import React, { useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Table, Card, Button, Form } from 'antd';
import {
  split,
  startsWith,
  map,
  get,
  isBoolean,
  groupBy,
  isEqual,
} from 'lodash';
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
import usePageConfig from '../hooks/usePageConfig';
import usePageData from '../hooks/usePageData';
import './RecordsPage.less';
import useActionParams from '../hooks/useActionParams';
// import ResizableTitle from '../components/Table/ResizableTitle';

const { Column } = Table;

function showTotal(total, range) {
  return `${range[0]}-${range[1]}，共${total}个`;
}

function RecordsPage({ isLoading }) {
  const pageData = usePageData();
  const { page, pagesize, sort, filter, records, total } = pageData;
  const [form] = Form.useForm();
  const {
    component: Component,
    inline,
    table,
    fetch: fetchEffect,
    updatePage,
    tableProps,
    filterFormProps,
  } = usePageConfig();
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const params = useActionParams();
  const rowActions = useMemo(
    () => table.getRowActions().filter((a) => a.isVisible(params)),
    [table, params]
  );
  const multipleActions = useMemo(
    () => table.getMultipleActions().filter((a) => a.isVisible(params)),
    [table, params]
  );
  const globalActions = useMemo(
    () => table.getGlobalActions().filter((a) => a.isVisible(params)),
    [table, params]
  );
  const columns = useMemo(
    () => table.getColumns().filter((column) => column.canShowInTable(params)),
    [table, params]
  );
  const [widths] = useState(columns.map((c) => c.getTableWidth()));
  const filterColumns = useMemo(
    () => columns.filter((column) => column.canFilter()),
    [columns]
  );
  const hasOutsideFilter = useMemo(
    () => filterColumns.filter((column) => column.canFilterOutside()).size > 0,
    [filterColumns]
  );
  const hasTableFilter = useMemo(
    () => filterColumns.filter((column) => !column.canFilterOutside()).size > 0,
    [filterColumns]
  );
  const groupedFilterColumns = useMemo(
    () => groupBy(filterColumns.toArray(), (column) => column.getFilterGroup()),
    [filterColumns]
  );

  const onTableSelectChange = useEventCallback((rowKeys, rows) => {
    setSelectedRows(rows);
    setSelectedRowKeys(rowKeys);
  });

  const onFilterFinish = useEventCallback((f) => {
    updatePage({
      page: 1,
      pagesize,
      sort,
      filter: f,
    });
  });

  const onTableChange = useEventCallback(
    (pagination, filters, sorter) => {
      let newPage = pagination.current;
      const newPageSize = pagination.pageSize;
      let newSort = table.getFixedSortOrder() || '';

      if (sorter && sorter.columnKey && sorter.order) {
        newSort = `${sorter.columnKey} ${sorter.order.replace('end', '')}`;
      }

      if (sort !== newSort) {
        newPage = 1;
      }

      if (!isEqual(filter, filters)) {
        newPage = 1;
      }

      updatePage({
        page: newPage,
        pagesize: newPageSize,
        sort: newSort,
        filter,
      });
    },
    [table]
  );

  const onResetFilters = useEventCallback(() => {
    form.resetFields();
    form.submit();
  });

  // const handleResize = useMemo(
  //   () => index => (e, { size }) => {
  //     setWidths(pre => {
  //       return pre.set(index, size.width);
  //     });
  //   },
  //   [setWidths]
  // );

  const rowSelection = useMemo(
    () =>
      multipleActions.size > 0
        ? {
            selectedRowKeys,
            onChange: onTableSelectChange,
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
      filter,
    });
  }, [fetchEffect, filter, page, pagesize, sort]);

  const renderColumn = useCallback(
    (column, index) => {
      const filterProps = {};

      if (column.canFilter() && !column.canFilterOutside()) {
        let filteredValue = get(filter, column.getFilterKey());

        const parentFilteredValue = get(
          filter,
          column.parentColumn?.getFilterKey()
        );

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
        filterProps.filterDropdown = (dropDownParams) => (
          <FilterDropDown
            key={parentFilteredValue}
            column={column}
            {...dropDownParams}
          />
        );
        filterProps.filterIcon = (filtered) => (
          <FilterIcon column={column} filtered={filtered} />
        );
      }
      return (
        <Column
          {...column.getTableColumnProps()}
          {...filterProps}
          fixed={column.getTableFixed()}
          width={widths.get(index)}
          title={column.getTitle()}
          dataIndex={column.getKey()}
          key={column.getKey()}
          sorter={column.canSortInTable()}
          sortDirections={column.getTableSortDirections()}
          onCell={(record) => ({
            record,
            column,
            onComplete: fetch,
          })}
          // onHeaderCell={() => ({
          //   width: widths.get(index),
          //   onResize: handleResize(index)
          // })}
          sortOrder={
            sort && startsWith(sort, `${column.getKey()} `)
              ? `${split(sort, ' ')[1]}end`
              : false
          }
        />
      );
    },
    [fetch, filter, sort, widths]
  );

  useEffect(() => {
    table.columns.forEach((column) => {
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
              {cs.map((column) => (
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
    onResetFilters,
  ]);

  const globalActionsChildren = useMemo(() => {
    return (
      globalActions.size > 0 && (
        <Group title="操作">
          {globalActions &&
            globalActions.map((action) => (
              <Action
                key={action.getTitle()}
                action={action}
                records={action.isMultipleAction() ? selectedRows : null}
                onComplete={fetch}
              />
            ))}
        </Group>
      )
    );
  }, [fetch, globalActions, selectedRows]);

  const tableChildren = useMemo(() => {
    return (
      <Table
        bordered
        {...tableProps}
        components={{
          // header: {
          //   cell: ResizableTitle
          // },
          body: {
            row: EditableTableRow,
            cell: EditableTableCell,
          },
        }}
        rowClassName={() => 'editable-row'}
        loading={isLoading}
        dataSource={records}
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
          pageSize: pagesize,
        }}
      >
        {columns.map((column, index) => renderColumn(column, index))}
        {rowActions.size > 0 ? (
          <Column
            title="操作"
            key="action"
            render={(
              _,
              record // eslint-disable-line react/jsx-no-bind
            ) => (
              <>
                {rowActions.map((action) => (
                  <Action
                    key={action.getTitle()}
                    action={action}
                    record={record}
                    onComplete={fetch}
                  />
                ))}
              </>
            )}
          />
        ) : null}
      </Table>
    );
  }, [
    columns,
    records,
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
    total,
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
};

RecordsPage.defaultProps = {
  isLoading: false,
};

export default React.memo(RecordsPage);

import React, { useState, useEffect, useMemo } from 'react';
import { Transfer, Table } from 'antd';
import {
  difference,
  map,
  includes,
  find,
  filter,
  isFunction,
  concat,
  uniqBy,
} from 'lodash';
import PropTypes from 'prop-types';
import { useEventCallback } from '@qt/react';
import DraggableTable from '../Table/DraggableTable';
import getKeyByRowKey from '../../utils/getKeyByRowKey';
import './PaginationTableTransfer.less';

function PaginationTableTransfer({
  columns,
  dataSource,
  targetDataSource,
  leftTableProps,
  rightTableProps,
  onChange,
  rowKey,
  ...transferProps
}) {
  const [totalDataSource, setTotalDataSource] = useState([]);
  const [rightDataSource, setRightDataSource] = useState([]);
  const [leftDataSource, setLeftDataSource] = useState([]);
  const [targetKeys, setTargeKeys] = useState([]);
  const getKey = useMemo(() => getKeyByRowKey(rowKey), [rowKey]);

  useEffect(() => {
    setRightDataSource(targetDataSource);
    setTargeKeys(map(targetDataSource, getKey));
  }, [targetDataSource, getKey]);

  useEffect(() => {
    const data = map(dataSource, (item) => ({
      ...item,
      disabled: !!find(rightDataSource, (v) => getKey(item) === getKey(v)),
    }));
    setLeftDataSource(data);
  }, [dataSource, getKey, rightDataSource]);

  useEffect(() => {
    setTotalDataSource(
      uniqBy(concat(totalDataSource, dataSource, targetDataSource), getKey)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource, getKey, targetDataSource]);

  const onDraggableTableChange = useEventCallback(
    (val) => {
      setRightDataSource(val);
      // eslint-disable-next-line no-unused-expressions
      onChange?.(map(val, getKey), 'sort');
    },
    [onChange, getKey]
  );

  const onTransferChange = useEventCallback((tKeys, direction, moveKeys) => {
    let newRightDataSource;

    if (direction === 'left') {
      newRightDataSource = filter(rightDataSource, (v) =>
        includes(tKeys, getKey(v))
      );
    } else {
      newRightDataSource = concat(
        rightDataSource,
        filter(totalDataSource, (v) => includes(moveKeys, getKey(v)))
      );
    }
    setRightDataSource(newRightDataSource);

    const newTargetKeys = map(newRightDataSource, getKey);
    setTargeKeys(newTargetKeys);
    // eslint-disable-next-line no-unused-expressions
    onChange?.(newTargetKeys, direction, moveKeys);
  });

  function renderTable({
    direction,
    onItemSelectAll,
    onItemSelect,
    selectedKeys: listSelectedKeys,
    disabled: listDisabled,
  }) {
    const rowSelection = {
      getCheckboxProps: (item) => ({
        disabled: listDisabled || item.disabled,
      }),
      onSelectAll(selected, selectedRows) {
        const treeSelectedKeys = map(
          filter(selectedRows, (item) => !item.disabled),
          getKey
        );
        const diffKeys = selected
          ? difference(treeSelectedKeys, listSelectedKeys)
          : difference(listSelectedKeys, treeSelectedKeys);
        onItemSelectAll(diffKeys, selected);
      },
      onSelect(record, selected) {
        onItemSelect(getKey(record), selected);
      },
      selectedRowKeys: listSelectedKeys,
    };

    const onRow = ({ disabled: itemDisabled, ...record }) => {
      const func =
        direction === 'left' ? leftTableProps.onRow : rightTableProps.onRow;
      const key = getKey(record);
      return {
        onClick: () => {
          if (itemDisabled) return;
          const selected = !listSelectedKeys.includes(key);
          onItemSelect(key, selected);
        },
        ...(isFunction(func) ? func(record) : {}),
      };
    };

    if (direction === 'right') {
      return (
        <DraggableTable
          dataSource={rightDataSource}
          columns={columns}
          rowKey={rowKey}
          size="small"
          {...rightTableProps}
          rowSelection={rowSelection}
          onRow={onRow}
          onDataSourceChange={onDraggableTableChange}
        />
      );
    }

    return (
      <Table
        dataSource={leftDataSource}
        columns={columns}
        size="small"
        rowKey={rowKey}
        {...leftTableProps}
        rowSelection={rowSelection}
        onRow={onRow}
      />
    );
  }

  return (
    <Transfer
      {...transferProps}
      targetKeys={targetKeys}
      dataSource={dataSource}
      onChange={onTransferChange}
      className="xms-pagination-table-transfer"
      showSelectAll={false}
    >
      {renderTable}
    </Transfer>
  );
}

PaginationTableTransfer.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  targetDataSource: PropTypes.arrayOf(PropTypes.object),
  leftTableProps: PropTypes.shape({
    onRow: PropTypes.func,
  }),
  rightTableProps: PropTypes.shape({
    onRow: PropTypes.func,
  }),
  onChange: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  direction: PropTypes.oneOf(['left', 'right']),
  onItemSelectAll: PropTypes.func,
  onItemSelect: PropTypes.func,
  selectedKeys: PropTypes.arrayOf(PropTypes.number),
  disabled: PropTypes.bool,
};

PaginationTableTransfer.defaultProps = {
  targetDataSource: [],
  leftTableProps: {
    onRow: null,
  },
  rightTableProps: {
    onRow: null,
  },
  onChange: () => {},
  rowKey: 'id',
  direction: undefined,
  onItemSelectAll: undefined,
  onItemSelect: undefined,
  selectedKeys: undefined,
  disabled: undefined,
};

export default React.memo(PaginationTableTransfer);

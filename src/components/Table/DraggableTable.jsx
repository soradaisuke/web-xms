import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Table } from 'antd';
import { DndProvider, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEventCallback } from '@qt/react';
import PropTypes from 'prop-types';
import DragableBodyRow from './DragableBodyRow';
import getKeyByRowKey from '../../utils/getKeyByRowKey';

const dndContext = createDndContext(HTML5Backend);

const components = {
  body: {
    row: DragableBodyRow,
  },
};

function DraggableTable({
  onRow,
  onChange,
  onDataSourceChange,
  dataSource,
  pagination,
  rowKey,
  ...tableProps
}) {
  const [current, setCurrent] = useState();
  const [pageSize, setPageSize] = useState();

  useEffect(() => {
    setCurrent(pagination?.current || 1);
  }, [pagination]);

  useEffect(() => {
    setPageSize(pagination?.pageSize || 10);
  }, [pagination]);

  const getKey = useMemo(() => getKeyByRowKey(rowKey), [rowKey]);

  const moveRow = useEventCallback(
    (dragIndex, hoverIndex) => {
      const copyDataSource = [...dataSource];
      const dragRow = copyDataSource[dragIndex];
      copyDataSource.splice(dragIndex, 1);
      copyDataSource.splice(hoverIndex, 0, dragRow);
      onDataSourceChange(copyDataSource, [
        getKey(dataSource[dragIndex], getKey(dataSource[hoverIndex])),
      ]);
    },
    [dataSource, onDataSourceChange, getKey]
  );

  const onTableChange = useEventCallback((...args) => {
    // eslint-disable-next-line  no-unused-expressions
    onChange?.(...args);
    setCurrent(args[0].current);
    setPageSize(args[0].pageSize);
  });

  const composeOnRow = useCallback(
    (record, index) => {
      const prevTotalRows = (current - 1) * pageSize;
      return {
        ...onRow(record, index),
        index: index + prevTotalRows,
        moveRow,
        showArrowUp: current !== 1 && index === 0,
        showArrowDown:
          index === pageSize - 1 && index !== dataSource.length - 1,
      };
    },
    [moveRow, onRow, current, pageSize, dataSource.length]
  );

  return (
    <DndProvider manager={dndContext.dragDropManager}>
      <Table
        dataSource={dataSource}
        components={components}
        pagination={pagination}
        onRow={composeOnRow}
        rowKey={rowKey}
        onChange={onTableChange}
        {...tableProps}
      />
    </DndProvider>
  );
}

DraggableTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRow: PropTypes.func,
  onDataSourceChange: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    onChange: PropTypes.func,
  }),
};

DraggableTable.defaultProps = {
  onChange: null,
  onRow: () => {},
  pagination: null,
  rowKey: 'id',
};

export default React.memo(DraggableTable);

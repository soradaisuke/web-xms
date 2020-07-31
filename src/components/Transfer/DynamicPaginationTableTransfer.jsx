import React, {
  useState,
  useCallback,
  useEffect,
  isValidElement,
  useMemo
} from 'react';
import { Button, message } from 'antd';
import { isString, map, isEqual } from 'lodash';
import { useEventCallback } from '@qt/react';
import PropTypes from 'prop-types';
import Page from '../../pages/Page';
import PaginationTableTransfer from './PaginationTableTransfer';
import getKeyByRowKey from '../../utils/getKeyByRowKey';
import './DynamicPaginationTableTransfer.less';

const request = async (requsetFunc, params, callback) => {
  try {
    const res = await requsetFunc(params);
    callback(res);
  } catch (err) {
    message.error(err.message);
  }
};

function DynamicPaginationTableTransfer({
  fetch,
  onCancel,
  onOk,
  onChange,
  footer,
  okText,
  cancelText,
  rowKey,
  leftTableProps,
  rightTableProps,
  ...restProps
}) {
  const [leftTableDataSource, setLeftTableDataSource] = useState([]);
  const [rightTableDataSource, setRightTableDataSource] = useState([]);
  const [leftTablePagination, setLeftTablePagination] = useState({
    current: 1,
    pageSize: leftTableProps?.pagination?.pageSize || 10,
    total: 0
  });
  const [leftLoading, setLeftLoading] = useState(false);
  const [rightLoading, setRightLoading] = useState(false);
  const [targetKeys, setTargetKeys] = useState({});

  const getKey = useMemo(() => getKeyByRowKey(rowKey), [rowKey]);

  const getLeftDataSource = useEventCallback(
    async (page, pageSize) => {
      setLeftLoading(true);
      await request(fetch.left, { page, pagesize: pageSize }, res => {
        setLeftTableDataSource(res.items);
        setLeftTablePagination({
          current: page,
          pageSize,
          total: res.total
        });
      });
      setLeftLoading(false);
    },
    [fetch.left]
  );

  const getRightDataSource = useCallback(async () => {
    setRightLoading(true);
    await request(fetch.right, { page: 1, pagesize: 99 }, res => {
      setRightTableDataSource(res.items);
      const keys = map(res.items, getKey);
      setTargetKeys({
        initial: keys,
        recently: keys
      });
    });
    setRightLoading(false);
  }, [fetch.right, getKey]);

  const onLeftTableChange = useEventCallback((...args) => {
    // eslint-disable-next-line no-unused-expressions
    leftTableProps?.onChange?.(...args);
    const [pagination] = args;
    if (
      pagination.current !== leftTablePagination.current ||
      pagination.pageSize !== leftTablePagination.pageSize
    ) {
      getLeftDataSource(pagination.current, pagination.pageSize);
    }
  });

  const onTransferChange = useEventCallback(
    (val, direction, moveKeys) => {
      setTargetKeys({
        ...targetKeys,
        recently: val
      });
      // eslint-disable-next-line no-unused-expressions
      onChange?.(val, direction, moveKeys);
    },
    [targetKeys, onChange]
  );

  const onClickOk = useEventCallback(async () => {
    if (onOk) {
      setRightLoading(true);
      await request(onOk, targetKeys.recently, getRightDataSource);
      setRightLoading(false);
    }
  }, [onOk, getRightDataSource, targetKeys]);

  const renderFooter = useCallback(() => {
    let footerNode;
    if (footer === null) {
      return;

      // eslint-disable-next-line no-else-return
    } else if (isString(footer) || isValidElement(footer)) {
      footerNode = footer;
    } else {
      const disabled = isEqual(targetKeys.recently, targetKeys.initial);
      footerNode = (
        <div className="xms-dynamic-pagination-table-transfer-footer">
          <Button onClick={onCancel}>{cancelText}</Button>
          <Button disabled={disabled} onClick={onClickOk} type="primary">
            {okText}
          </Button>
        </div>
      );
    }
    // eslint-disable-next-line consistent-return
    return footerNode;
  }, [footer, onCancel, onClickOk, okText, cancelText, targetKeys]);

  useEffect(() => {
    getLeftDataSource(1, leftTablePagination.pageSize);
  }, [getLeftDataSource, leftTablePagination.pageSize]);

  useEffect(() => {
    getRightDataSource();
  }, [getRightDataSource]);

  return (
    <Page>
      <PaginationTableTransfer
        rowKey={rowKey}
        {...restProps}
        leftTableProps={{
          ...(leftTableProps ?? {}),
          onChange: onLeftTableChange,
          loading: leftLoading,
          pagination: {
            ...(leftTableProps?.pagination || {}),
            ...leftTablePagination
          }
        }}
        rightTableProps={{
          ...(rightTableProps ?? {}),
          loading: rightLoading
        }}
        dataSource={leftTableDataSource}
        targetDataSource={rightTableDataSource}
        onChange={onTransferChange}
      />
      {renderFooter()}
    </Page>
  );
}

DynamicPaginationTableTransfer.propTypes = {
  fetch: PropTypes.shape({
    left: PropTypes.func,
    right: PropTypes.func
  }).isRequired,
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  footer: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  // eslint-disable-next-line react/forbid-prop-types
  leftTableProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  rightTableProps: PropTypes.object
};

DynamicPaginationTableTransfer.defaultProps = {
  rowKey: 'id',
  onCancel: () => window.history.back(),
  onOk: null,
  onChange: null,
  footer: undefined,
  okText: '确定',
  cancelText: '取消',
  leftTableProps: {},
  rightTableProps: {}
};

export default React.memo(DynamicPaginationTableTransfer);

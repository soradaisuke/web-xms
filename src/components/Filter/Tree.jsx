import React from 'react';
import PropTypes from 'prop-types';
import { useEventCallback } from '@qt/react';
import { Tree, Input, Spin } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import useColumnFilterOptions from '../../hooks/useColumnFilterOptions';
import Column from '../../schema/Column';
import './Tree.less';

const { Search } = Input;

function FilterTree({ column, setSelectedKeys, selectedKeys, ...props }) {
  const [options, onSearch] = useColumnFilterOptions(column, generateTreeData);

  const onCheck = useEventCallback(
    (checkedKeys, { node: { key } = {} } = {}) => {
      if (column.canFilterMultiple()) {
        setSelectedKeys(checkedKeys);
      } else {
        setSelectedKeys([key]);
      }
    }
  );

  if (!options) {
    return <Spin style={{ width: '100%' }} />;
  }

  const treeProps = {
    ...props,
    treeData: options,
    className: 'tree-filter',
    multiple: column.canFilterMultiple(),
    checkable: true,
    checkedKeys: selectedKeys,
    onCheck
  };

  if (column.getFilterSearchRequest()) {
    return (
      <>
        <Search
          enterButton
          placeholder={`请输入${column.getTitle()}`}
          onSearch={onSearch}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Tree {...treeProps} />
      </>
    );
  }

  return <Tree {...treeProps} />;
}

FilterTree.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  selectedKeys: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setSelectedKeys: PropTypes.func.isRequired
};

export default React.memo(FilterTree);

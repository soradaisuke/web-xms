import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import useColumnFilterOptions from '../../hooks/useColumnFilterOptions';
import Column from '../../schema/Column';
import './Tree.less';

function FilterTreeSelect({ column, ...props }) {
  const [options, onSearch] = useColumnFilterOptions(column, generateTreeData);

  return (
    <TreeSelect
      {...props}
      allowClear
      showSearch
      treeData={options}
      treeCheckable={column.canFilterMultiple()}
      treeNodeFilterProp="title"
      filterTreeNode={column.getFilterSearchRequest() ? false : null}
      onSearch={onSearch}
    />
  );
}

FilterTreeSelect.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired
};

export default React.memo(FilterTreeSelect);

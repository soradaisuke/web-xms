import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';
import './Tree.less';

function FilterTreeSelect({ column, forForm, ...props }) {
  const [options, onSearch] = useColumnValueOptions(
    column,
    generateTreeData,
    forForm
  );

  return (
    <TreeSelect
      {...props}
      allowClear
      showSearch
      treeData={options}
      treeCheckable={forForm ? column.isArray() : column.canFilterMultiple()}
      treeNodeFilterProp="title"
      filterTreeNode={column.getValueOptionsSearchRequest() ? false : null}
      onSearch={onSearch}
    />
  );
}

FilterTreeSelect.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  forForm: PropTypes.bool
};

FilterTreeSelect.defaultProps = {
  forForm: false
};

export default React.memo(FilterTreeSelect);

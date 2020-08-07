import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TreeSelect } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';
import './Tree.less';

const FilterTreeSelect = React.forwardRef(
  ({ column, forForm, initialValueOptions, className, ...props }, ref) => {
    const [options, onSearch] = useColumnValueOptions(
      column,
      generateTreeData,
      forForm,
      initialValueOptions
    );

    return (
      <TreeSelect
        {...props}
        className={classNames('treeselect', className)}
        ref={ref}
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
);

FilterTreeSelect.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  className: PropTypes.string,
  forForm: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  initialValueOptions: PropTypes.array
};

FilterTreeSelect.defaultProps = {
  className: '',
  forForm: false,
  initialValueOptions: null
};

export default React.memo(FilterTreeSelect);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { find, isNil } from 'lodash';
import { TreeSelect } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';
import './Tree.less';

const FilterTreeSelect = React.forwardRef(
  ({ column, forForm, initialValueOptions, className, isEdit, onChange, value, ...props }, ref) => {
    const [options, onSearch] = useColumnValueOptions(
      column,
      generateTreeData,
      forForm,
      initialValueOptions,
      isEdit
    );

    useEffect(() => {
      const defaultOption = find(options, ({ default: defaultSelect }) => defaultSelect);
      if (defaultOption && isNil(value)) {
        onChange(defaultOption.value);
      }
    }, [options, value, onChange]);

    return (
      <TreeSelect
        {...props}
        value={value}
        onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  isEdit: PropTypes.bool,
  className: PropTypes.string,
  forForm: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  initialValueOptions: PropTypes.array
};

FilterTreeSelect.defaultProps = {
  value: undefined,
  isEdit: false,
  className: '',
  forForm: false,
  initialValueOptions: null
};

export default React.memo(FilterTreeSelect);

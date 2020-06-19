import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { isArray, debounce, isFunction } from 'lodash';

export default class Select extends React.PureComponent {
  static displayName = 'Select';

  static propTypes = {
    treeData: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    // eslint-disable-next-line react/require-default-props
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string)
    ]),
    treeCheckStrictly: PropTypes.bool,
    formFieldValues: PropTypes.shape({}),
    onSearch: PropTypes.func, // (value, formFieldValues, cb) => cb(newOptions)
    showSearch: PropTypes.bool,
    treeNodeFilterProp: PropTypes.string,
    filterOptions: PropTypes.func
  };

  static defaultProps = {
    showSearch: false,
    onSearch: null,
    formFieldValues: {},
    treeNodeFilterProp: 'title',
    treeCheckStrictly: false,
    filterOptions: null
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    treeData: this.props.treeData
  };

  onSearch = debounce(value => {
    const { onSearch, showSearch, formFieldValues } = this.props;
    if (showSearch && isFunction(onSearch)) {
      onSearch(value, formFieldValues, newTreeData =>
        this.setState({ treeData: newTreeData })
      );
    }
  }, 400);

  onChange = value => {
    const { onChange, treeCheckStrictly } = this.props;
    if (treeCheckStrictly && isArray(value)) {
      onChange(value.map(v => (v ? v.value : null)));
    } else {
      onChange(value);
    }
  };

  render() {
    const {
      value,
      onChange,
      onSearch,
      filterOptions,
      formFieldValues,
      treeData: td,
      ...props
    } = this.props;
    const { treeData: tds } = this.state;
    const treeData = isFunction(onSearch) ? tds : td;
    const newTreeData = isFunction(filterOptions)
      ? filterOptions(treeData, formFieldValues)
      : treeData;
    return (
      <TreeSelect
        allowClear
        placeholder="请选择一个选项"
        value={value}
        treeData={newTreeData}
        getPopupContainer={trigger => trigger.parentNode}
        onSearch={this.onSearch}
        onChange={this.onChange}
        {...props}
      />
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import {
  isArray, debounce, isFunction,
} from 'lodash';

export default class Select extends React.PureComponent {
  static displayName = 'Select';

  static propTypes = {
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    value: PropTypes.oneOfType([ // eslint-disable-line react/require-default-props
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.arrayOf(PropTypes.string),
    ]),
    formFieldValues: PropTypes.shape({}).isRequired,
    onSearch: PropTypes.func, // (value, formFieldValues, cb) => cb(newOptions)
    showSearch: PropTypes.bool,
    treeNodeFilterProp: PropTypes.string,
  };

  static defaultProps = {
    showSearch: false,
    onSearch: () => {},
    treeNodeFilterProp: 'title',
  };

  constructor(props) {
    super(props);

    this.state = {
      treeData: props.treeData,
    };
  }

  onSearch = debounce((value) => {
    const { onSearch, showSearch, formFieldValues } = this.props;
    if (showSearch) {
      onSearch(value, formFieldValues, newTreeData => this.setState({ treeData: newTreeData }));
    }
  }, 400)

  onChange = (value) => {
    const { onChange, treeCheckStrictly } = this.props;
    if (treeCheckStrictly && isArray(value)) {
      onChange(value.map(v => (v ? v.value : null)));
    } else {
      onChange(value);
    }
  }

  render() {
    const {
      value, onChange, onSearch, filterOptions,
      formFieldValues, treeData: td, ...props
    } = this.props;
    const { treeData } = this.state;
    const newTreeData = isFunction(filterOptions)
      ? filterOptions(treeData, formFieldValues) : treeData;

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

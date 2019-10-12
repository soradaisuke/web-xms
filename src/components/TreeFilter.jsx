import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Input } from 'antd';
import { map } from 'lodash';
import generateTreeData from '../utils/generateTreeData';
import './TreeFilter.less';

const { Search } = Input;

export default class TreeFilter extends React.PureComponent {
  static propTypes = {
    selectedKeys: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    setSelectedKeys: PropTypes.func.isRequired,
    parentValue: PropTypes.any // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    parentValue: null
  };

  state = {};

  onCheck = checkedKeys => {
    const { setSelectedKeys, column } = this.props;
    setSelectedKeys(map(checkedKeys, key => column.formatFilterValue(key)));
  };

  onSearch = async value => {
    const { column } = this.props;
    const tableFilterSearchRequest = column.getTableFilterSearchRequest();

    if (tableFilterSearchRequest) {
      const filters = await tableFilterSearchRequest(value);
      this.setState({
        treeData: generateTreeData(filters)
      });
    }
  };

  render() {
    const { column, parentValue, selectedKeys } = this.props;
    const valueOptionsRequest = column.getValueOptionsRequest();
    let { treeData } = this.state;

    if (!treeData) {
      const filters = column.getFilters(parentValue, 'disableInFilter');
      if (filters) {
        treeData = filters ? generateTreeData(filters) : [];
      } else if (valueOptionsRequest) {
        column
          .fetchValueOptions(parentValue)
          .then(() => this.forceUpdate())
          .catch(() => {});
      }
    }

    treeData = treeData || [];

    const props = {
      treeData,
      className: 'tree-filter'
    };

    if (column.canFilterMultipleInTable()) {
      props.checkable = true;
      props.checkedKeys = map(selectedKeys, key => String(key));
      props.onCheck = this.onCheck;
    } else {
      props.selectedKeys = map(selectedKeys, key => String(key));
      props.onSelect = this.onCheck;
    }

    if (column.getTableFilterSearchRequest()) {
      return (
        <>
          <Search
            enterButton
            placeholder={`请输入${column.getTitle()}`}
            onSearch={this.onSearch}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Tree {...props} />
        </>
      );
    }

    return <Tree {...props} />;
  }
}

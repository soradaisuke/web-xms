import React from 'react';
import { isArray, map, debounce } from 'lodash';
import { TreeSelect } from 'antd';

const generateTreeData = filters => {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text, children, ...item }) => ({
    value,
    key: value,
    title: text,
    children: generateTreeData(children),
    ...item
  }));
};

export default class XMSTreeSelect extends React.PureComponent {
  state = {};

  onSearch = debounce(value => {
    const { column, parentValue } = this.props;
    const searchRequest = column.getFormSearchRequest();

    if (searchRequest) {
      searchRequest(value, parentValue).then(filters =>
        this.setState({ treeData: generateTreeData(filters) })
      );
    }
  }, 500);

  render() {
    const { column, parentValue, ...props } = this.props;
    const valueOptionsRequest = column.getValueOptionsRequest();
    let { treeData } = this.state;

    if (!treeData) {
      const filters = column.getFilters(parentValue, 'disableInForm');

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

    return (
      <TreeSelect
        {...props}
        allowClear
        showSearch
        treeCheckable={column.canSelectMutipleInForm()}
        getPopupContaine={trigger => trigger.parentNode}
        placeholder={column.getFormPlaceholder(true)}
        searchPlaceholder={column.getSearchPlaceholder()}
        treeData={treeData}
        filterTreeNode={!column.getFormSearchRequest()}
        onSearch={this.onSearch}
      />
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { TreeSelect, Radio } from 'antd';
import generateTreeData from '../../utils/generateTreeData';
import './TreeSelect.less';

export default class XMSTreeSelect extends React.PureComponent {
  static propTypes = {
    parentValue: PropTypes.any // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    parentValue: null
  };

  constructor(props) {
    super(props);

    const { column } = this.props;
    const radioOptions = column.getFormRadioOptions();
    const defaultOption = radioOptions.find(option => option.get('default'));

    if (defaultOption) {
      this.state = { radioValue: defaultOption.get('value') };
    } else {
      this.state = {};
    }
  }

  onSearch = debounce(value => {
    if (value === '') {
      return;
    }

    const { column, parentValue } = this.props;
    const { radioValue } = this.state;
    const searchRequest = column.getFormSearchRequest();

    if (searchRequest) {
      searchRequest({ value, parentValue, radioValue }).then(filters =>
        this.setState({ treeData: generateTreeData(filters) })
      );
    }
  }, 500);

  onChange = e => {
    this.setState({ radioValue: e.target.value });
  };

  renderRadioOptions() {
    const { column } = this.props;
    const { radioValue } = this.state;
    const radioOptions = column.getFormRadioOptions();

    if (radioOptions && radioOptions.size > 0) {
      return (
        <Radio.Group onChange={this.onChange} value={radioValue}>
          {radioOptions.map(option => (
            <Radio key={option.get('value')} value={option.get('value')}>
              {option.get('text')}
            </Radio>
          ))}
        </Radio.Group>
      );
    }

    return null;
  }

  render() {
    const {
      column,
      parentValue,
      treeData: treeDataProps,
      ...props
    } = this.props;
    const valueOptionsRequest = column.getValueOptionsRequest();
    let { treeData } = this.state;

    if (!treeData && !treeDataProps) {
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

    treeData = treeData || treeDataProps || [];

    return (
      <React.Fragment>
        {this.renderRadioOptions()}
        <TreeSelect
          placeholder={column.getFormPlaceholder(true)}
          searchPlaceholder={column.getFormSearchPlaceholder()}
          treeCheckable={column.canSelectMutipleInForm()}
          getPopupContainer={trigger => trigger.parentNode}
          {...props}
          className="xms-tree-select"
          allowClear
          showSearch
          treeData={treeData}
          treeNodeFilterProp="title"
          filterTreeNode={column.getFormSearchRequest() ? false : null}
          onSearch={this.onSearch}
        />
      </React.Fragment>
    );
  }
}

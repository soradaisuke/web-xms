import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import { isUndefined } from 'lodash';

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
  };

  static defaultProps = {
    showSearch: false,
    onSearch: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      options: props.options,
    };
  }

  onSearch = (value) => {
    const { onSearch, showSearch, formFieldValues } = this.props;
    if (showSearch) {
      onSearch(value, formFieldValues, newOptions => this.setState({ options: newOptions }));
    }
  }

  onChange = (value) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      value, onChange, onSearch, ...props
    } = this.props;
    const { options } = this.state;
    return (
      <AntdSelect
        allowClear
        value={value}
        placeholder="请选择一个选项"
        getPopupContainer={trigger => trigger.parentNode}
        onSearch={this.onSearch}
        onChange={this.onChange}
        {...props}
      >
        {
          options.map(({ children, value, ...opProps }) => (
            <AntdSelect.Option
              value={isUndefined(value) ? opProps.key : value}
              {...opProps}
            >
              {children}
            </AntdSelect.Option>
          ))
        }
      </AntdSelect>
    );
  }
}

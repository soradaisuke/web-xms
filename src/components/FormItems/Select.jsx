import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import { isUndefined, debounce, isFunction } from 'lodash';

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

  onSearch = debounce((value) => {
    const { onSearch, showSearch, formFieldValues } = this.props;
    if (showSearch) {
      onSearch(value, formFieldValues, newOptions => this.setState({ options: newOptions }));
    }
  }, 400)

  onChange = (value) => {
    const { onChange } = this.props;
    onChange(value);
  }

  render() {
    const {
      value, onChange, onSearch, filterOptions, formFieldValues, ...props
    } = this.props;
    const { options } = this.state;
    const newOptions = isFunction(filterOptions)
      ? filterOptions(options, formFieldValues) : options;
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
          newOptions.map(({ children, value: v, ...opProps }) => (
            <AntdSelect.Option
              value={isUndefined(v) ? opProps.key : v}
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

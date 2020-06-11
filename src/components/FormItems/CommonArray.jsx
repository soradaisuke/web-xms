import React from 'react';
import PropTypes from 'prop-types';
import { size, remove } from 'lodash';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Row, Input, Button, Col } from 'antd';

export default class CommonArray extends React.PureComponent {
  static displayName = 'CommonArray';

  static propTypes = {
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    value: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line react/require-default-props
    generateValue: PropTypes.func, // (preValue, nextValue) => newValue
    renderValue: PropTypes.func, // (value, index) => renderValue(string)
    style: PropTypes.shape({}),
    max: PropTypes.number,
    placeholder: PropTypes.string,
    enableAdd: PropTypes.bool,
    formItemProps: PropTypes.shape({})
  };

  static defaultProps = {
    max: 99,
    style: { marginTop: '10px', width: '80%', marginRight: 8 },
    placeholder: '请输入一个值',
    enableAdd: true,
    generateValue: (_, nextValue) => nextValue || '',
    renderValue: v => v,
    formItemProps: {}
  };

  componentDidMount() {
    const { value, enableAdd } = this.props;
    if (!size(value) && enableAdd) {
      this.add();
    }
  }

  add = () => {
    const { onChange, value, generateValue } = this.props;
    if (!value) {
      onChange([generateValue()]);
    } else {
      onChange(value.concat([generateValue()]));
    }
  };

  remove = index => {
    const { onChange, value } = this.props;
    onChange(remove(value, (_, i) => i !== index));
  };

  onChange = (index, v) => {
    const { onChange, value, generateValue } = this.props;
    onChange(
      value.map((preValue, i) =>
        i === index ? generateValue(preValue, v) : preValue
      )
    );
  };

  render() {
    const {
      value,
      max,
      style,
      placeholder,
      enableAdd,
      renderValue,
      formItemProps
    } = this.props;
    return (
      <Col>
        {size(value) > 0 &&
          value.map((v, i) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <Row key={i}>
              <Input
                placeholder={placeholder}
                style={style}
                value={renderValue(v)}
                onChange={e => this.onChange(i, e.target.value)}
                {...formItemProps}
              />
              {size(value) > 1 && (
                <MinusCircleOutlined
                  style={{ fontSize: '18px', color: 'rgb(255, 0, 0)' }}
                  onClick={() => this.remove(i)}
                />
              )}
            </Row>
          ))}
        {enableAdd && size(value) <= max && (
          <Button
            type="dashed"
            onClick={this.add}
            style={{ marginTop: '10px', width: '60%' }}
          >
            <PlusOutlined />
            添加
          </Button>
        )}
      </Col>
    );
  }
}

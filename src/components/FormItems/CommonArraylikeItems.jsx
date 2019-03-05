import React from 'react';
import PropTypes from 'prop-types';
import { keys, size } from 'lodash';
import shortId from 'shortid';
import {
  Icon, Row, Input, Button, Col,
} from 'antd';

export default class CommonArraylikeItems extends React.PureComponent {
  static displayName = 'CommonArraylikeItems';

  static propTypes = {
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    value: PropTypes.shape({}), // eslint-disable-line react/require-default-props
    style: PropTypes.shape({}),
    max: PropTypes.number,
    placeholder: PropTypes.string,
    enableAdd: PropTypes.bool,
  };

  static defaultProps = {
    max: 99,
    style: { marginTop: '10px', width: '80%', marginRight: 8 },
    placeholder: '请输入一个值',
    enableAdd: true,
  };

  componentDidMount() {
    const { value, onChange, enableAdd } = this.props;
    if (!size(value) && enableAdd) {
      onChange({
        [shortId.generate()]: '',
      });
    }
  }

  add = () => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      [shortId.generate()]: '',
    });
  }

  remove = (k) => {
    const { onChange, value } = this.props;
    delete value[k];
    onChange({
      ...value,
    });
  }

  onChange = (k, v) => {
    const { onChange, value } = this.props;
    onChange({
      ...value,
      [k]: v,
    });
  }

  render() {
    const {
      value, max, style, placeholder, enableAdd,
    } = this.props;
    return (
      <Col>
        {
          size(value) > 0 && keys(value).map(k => (
            <Row key={k}>
              <Input
                placeholder={placeholder}
                style={style}
                value={value[k]}
                onChange={e => this.onChange(k, e.target.value)}
              />
              {
                size(value) > 1 && (
                  <Icon
                    style={{ fontSize: '18px', color: 'rgb(255, 0, 0)' }}
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                  />
                )
              }
            </Row>
          ))
        }
        {
          enableAdd && size(value) <= max && (
            <Button type="dashed" onClick={this.add} style={{ marginTop: '10px', width: '60%' }}>
              <Icon type="plus" />
              添加
            </Button>
          )
        }
      </Col>
    );
  }
}

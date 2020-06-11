import React from 'react';
import PropTypes from 'prop-types';
import { trim } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { Row, message, Tag, Input } from 'antd';

export default class Tags extends React.PureComponent {
  static displayName = 'Tags';

  static propTypes = {
    onChange: PropTypes.func, // eslint-disable-line react/require-default-props
    value: PropTypes.arrayOf(PropTypes.string), // eslint-disable-line react/require-default-props
    style: PropTypes.shape({}),
    max: PropTypes.number
  };

  static defaultProps = {
    max: 99,
    style: null
  };

  state = {
    inputValue: '',
    inputVisible: false
  };

  saveInputRef = input => {
    this.input = input;
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onInputConfirm = () => {
    const { value: tags, onChange } = this.props;
    const { inputValue } = this.state;
    if (!trim(inputValue)) {
      message.warn('要添加的标签不能为空');
      this.setState({ inputVisible: false, inputValue: '' });
    } else if (tags.indexOf(inputValue) !== -1) {
      message.warn('要添加的标签已经存在了');
    } else {
      onChange([...tags, inputValue]);
      this.setState({ inputVisible: false, inputValue: '' });
    }
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  onRemoveTag = tag => {
    const { value, onChange } = this.props;
    onChange(value.filter(tagStr => tag !== tagStr));
  };

  render() {
    const { value: tags, max, style } = this.props;
    const { inputVisible, inputValue } = this.state;
    return (
      <Row type="flex" style={style}>
        {tags &&
          tags.length > 0 &&
          tags.map(tag => (
            <Tag closable key={tag} afterClose={() => this.onRemoveTag(tag)}>
              {tag}
            </Tag>
          ))}
        {inputVisible && (
          <Input
            type="text"
            size="small"
            ref={this.saveInputRef}
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.onInputChange}
            onBlur={this.onInputConfirm}
            onPressEnter={this.onInputConfirm}
          />
        )}
        {!inputVisible && tags.length < max && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <PlusOutlined />
            添加标签
          </Tag>
        )}
      </Row>
    );
  }
}

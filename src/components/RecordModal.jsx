import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form } from 'antd';

class RecordModal extends React.PureComponent {
  static displayName = 'RecordModal';

  static propTypes = {
    activator: PropTypes.node.isRequired,
    form: PropTypes.shape({
      validateFields: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    onOk: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onOk(this.props.record.id, values);
        this.hideModelHandler();
      }
    });
  };

  showModelHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { activator } = this.props;

    return (
      <span>
        <span role="button" onClick={this.showModelHandler}>
          { activator }
        </span>
        {
          this.state.visible && (
            <Modal
              title={this.props.record.id ? '编辑' : '添加'}
              visible={this.state.visible}
              onOk={this.onOk}
              onCancel={this.hideModelHandler}
            >
              <Form horizontal="true" onSubmit={this.okHandler} />
            </Modal>
          )
        }
      </span>
    );
  }
}

export default Form.create()(RecordModal);

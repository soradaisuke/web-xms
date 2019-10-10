import React from 'react';
import PropTypes from 'prop-types';
import { isBoolean, isFunction } from 'lodash';
import { Modal } from 'antd';
import showError from '../utils/showError';

export default class ActivatorModal extends React.PureComponent {
  static displayName = 'ActivatorModal';

  static propTypes = {
    activator: PropTypes.node.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    onVisibleChange: PropTypes.func
  };

  static defaultProps = {
    onCancel: null,
    onOk: null,
    onVisibleChange: null
  };

  state = {
    visible: false,
    confirmLoading: false
  };

  showModalHandler = e => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true
    });

    const { onVisibleChange } = this.props;
    if (onVisibleChange) {
      onVisibleChange(true);
    }
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
      confirmLoading: false
    });
    const { onVisibleChange } = this.props;
    if (onVisibleChange) {
      onVisibleChange(false);
    }
  };

  onOk = async () => {
    const { onOk } = this.props;

    if (onOk) {
      this.setState({ confirmLoading: true });
      try {
        const hide = await onOk();
        if (!isBoolean(hide) || hide) {
          this.hideModalHandler();
        }
      } catch (e) {
        showError(e.message);
      }

      this.setState({ confirmLoading: false });
    } else {
      this.hideModalHandler();
    }
  };

  onCancel = async () => {
    const { onCancel } = this.props;

    if (onCancel) {
      const hide = await onCancel();
      if (!isBoolean(hide) || hide) {
        this.hideModalHandler();
      }
    } else {
      this.hideModalHandler();
    }
  };

  render() {
    const { activator, children, ...props } = this.props;
    const { visible, confirmLoading } = this.state;

    return (
      <span>
        <span
          role="button"
          tabIndex={0}
          onClick={this.showModalHandler}
          onKeyPress={this.showModalHandler}
        >
          {activator}
        </span>
        <Modal
          {...props}
          confirmLoading={confirmLoading}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        >
          {isFunction(children) ? children() : children}
        </Modal>
      </span>
    );
  }
}

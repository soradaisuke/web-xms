import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

export default class ActivatorModal extends React.PureComponent {
  static displayName = 'ActivatorModal';

  static propTypes = {
    activator: PropTypes.node.isRequired,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
  };

  static defaultProps = {
    onCancel: null,
    onOk: null,
  };


  state = {
    visible: false,
  };

  showModalHandler = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState({
      visible: true,
    });
  };

  hideModalHandler = () => {
    this.setState({
      visible: false,
    });
  };

  onOk = async () => {
    const { onOk } = this.props;

    if (onOk) {
      await onOk();
    }

    this.hideModalHandler();
  };

  onCancel = async () => {
    const { onCancel } = this.props;

    if (onCancel) {
      await onCancel();
    }

    this.hideModalHandler();
  };

  render() {
    const { activator } = this.props;
    const { visible } = this.state;

    return (
      <span>
        <span role="button" tabIndex={0} onClick={this.showModalHandler} onKeyPress={this.showModalHandler}>{activator}</span>
        <Modal
          {...this.props}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </span>
    );
  }
}

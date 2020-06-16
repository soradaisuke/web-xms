import { Button, Modal } from 'antd';
import React from 'react';
import { useEventCallback } from '@qt/react';
import PropTypes from 'prop-types';

function ConfirmButton({
  title,
  content,
  onOk,
  onCancel,
  ...props
}) {

  const onClick = useEventCallback(() => {
    Modal.confirm({
      title,
      content,
      onOk,
      onCancel
    });
  }, [
    title,
    content,
    onOk,
    onCancel
  ]);

  return <Button {...props} onClick={onClick} />;
}

ConfirmButton.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  onOk: PropTypes.func,
  onCancel: PropTypes.func
}

ConfirmButton.defaultProps = {
  title: '',
  content: null,
  onOk: null,
  onCancel: null
}

export default React.memo(ConfirmButton);

import React from 'react';
import { notification } from 'antd';

export default function showError(description, message = '发生错误') {
  notification.error({
    message: <span style={{ whiteSpace: 'pre-wrap' }}>{message}</span>,
    description: <span style={{ whiteSpace: 'pre-wrap' }}>{description}</span>,
    duration: 0
  });
}

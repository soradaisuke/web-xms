import { notification } from 'antd';

export default function showError(description, message = '发生错误') {
  notification.error({ message, description, duration: 0 });
}

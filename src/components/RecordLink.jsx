import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { isFunction, startsWith } from 'lodash';
import textToPath from '../utils/textToPath';

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    record: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // eslint-disable-next-line react/forbid-prop-types
    buttonProps: PropTypes.object,
    children: PropTypes.node
  };

  static defaultProps = {
    buttonProps: {},
    children: null,
    record: null
  };

  getUrl() {
    const { link, record } = this.props;

    if (isFunction(link)) {
      return textToPath(link(record));
    }

    return textToPath(link);
  }

  render() {
    const { children, buttonProps } = this.props;
    let url = this.getUrl();

    if (startsWith(url, 'http')) {
      return (
        <Button href={url} target="_blank" type="link" {...buttonProps}>
          {buttonProps.children || children}
        </Button>
      );
    }

    if (!startsWith(url, '/')) {
      url = `${window.location.pathname}/${url}`;
    }

    return (
      <Link to={url}>
        <Button type="link" {...buttonProps}>
          {buttonProps.children || children}
        </Button>
      </Link>
    );
  }
}

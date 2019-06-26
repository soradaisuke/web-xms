import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { isFunction, startsWith } from 'lodash';
import textToPath from '../utils/textToPath';

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    children: PropTypes.node
  };

  static defaultProps = {
    children: null
  };

  getUrl() {
    const { link, record } = this.props;

    if (isFunction(link)) {
      return textToPath(link(record));
    }

    return textToPath(link);
  }

  render() {
    const { children } = this.props;
    let url = this.getUrl();

    if (startsWith(url, 'http')) {
      return (
        <a href={this.getUrl()} rel="noopener noreferrer" target="_blank">
          {children}
        </a>
      );
    }

    if (!startsWith(url, '/')) {
      url = `${window.location.pathname}/${url}`;
    }

    return <Link to={url}>{children}</Link>;
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isFunction, startsWith } from 'lodash';
import textToPath from '../utils/textToPath';

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    link: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node
  };

  static defaultProps = {
    style: {},
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
    const { children, style } = this.props;
    let url = this.getUrl();

    if (startsWith(url, 'http')) {
      return (
        <a
          style={style}
          href={this.getUrl()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {children}
        </a>
      );
    }

    if (!startsWith(url, '/')) {
      url = `${window.location.pathname}/${url}`;
    }

    return (
      <Link style={style} to={url}>
        {children}
      </Link>
    );
  }
}

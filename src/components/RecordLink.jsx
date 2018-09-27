import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isFunction } from 'lodash';

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    children: PropTypes.node.isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    link: PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.oneOf(['relative', 'absolute', 'external']),
    }).isRequired,
  };

  getUrl() {
    const { link: { url }, record } = this.props;

    if (isFunction(url)) {
      return url(record);
    }

    return url;
  }

  getLink() {
    const { link, record } = this.props;

    if (link === true) {
      return `${window.location.pathname}/${record.id}`;
    }

    switch (link.type) {
      case 'absolute':
        return this.getUrl();
      case 'relative':
      default:
        return `${window.location.pathname}/${this.getUrl()}`;
    }
  }

  render() {
    const { children, link } = this.props;

    if (link.type === 'external') {
      return <a href={this.getUrl()} rel="noopener noreferrer" target="_blank">{children}</a>;
    }

    return (
      <Link to={this.getLink()}>
        {children}
      </Link>
    );
  }
}

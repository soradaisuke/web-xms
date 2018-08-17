import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    children: PropTypes.node.isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    link: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        absolute: PropTypes.string,
        relative: PropTypes.string,
      }),
    ]).isRequired,
  };

  getLink() {
    const { link, record } = this.props;

    let relative = record.id;
    let absolute = window.location.pathname;

    if (link === true) {
      return `${absolute}/${relative}`;
    }

    absolute = link.absolute || absolute;

    if (link.relative) {
      relative = link.relative; // eslint-disable-line prefer-destructuring
      const match = relative.match(/\{(\w+)\}/g);
      if (match) {
        match.forEach((pattern) => {
          const key = pattern.substring(1, pattern.length - 1);
          relative = relative.replace(pattern, record[key] || '');
        });
      }
    }

    return `${absolute}${relative}`;
  }

  render() {
    const { children } = this.props;
    return (
      <Link to={this.getLink()}>
        {children}
      </Link>
    );
  }
}

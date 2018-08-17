import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function getTextFromTemplate(template, record) {
  if (!template || !record) {
    return template;
  }

  let result = template;
  const match = result.match(/\{(\w+)\}/g);
  if (match) {
    match.forEach((pattern) => {
      const key = pattern.substring(1, pattern.length - 1);
      result = result.replace(pattern, record[key] || '');
    });
  }

  return result;
}

export default class RecordLink extends React.PureComponent {
  static displayName = 'RecordLink';

  static propTypes = {
    children: PropTypes.node.isRequired,
    record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    link: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        url: PropTypes.string,
        type: PropTypes.oneOf(['relative', 'absolute', 'external']),
      }),
    ]).isRequired,
  };

  getLink() {
    const { link, record } = this.props;

    if (link === true) {
      return `${window.location.pathname}/${record.id}`;
    }

    switch (link.type) {
      case 'absolute':
        return getTextFromTemplate(link.template, record);
      case 'relative':
      default:
        return `${window.location.pathname}/${getTextFromTemplate(link.template, record)}`;
    }
  }

  render() {
    const { children, link, record } = this.props;

    if (link.type === 'external') {
      return <a href={getTextFromTemplate(link.template, record)} target="_blank">{children}</a>;
    }

    return (
      <Link to={this.getLink()}>
        {children}
      </Link>
    );
  }
}

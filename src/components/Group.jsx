import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Group.less';

function Group({ title, children, className }) {
  return (
    <div className={classNames('xms-group', className)}>
      <div className="xms-group-title">{title}</div>
      <div className="xms-group-content">{children}</div>
    </div>
  );
}

Group.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};

Group.defaultProps = {
  className: ''
};

export default React.memo(Group);

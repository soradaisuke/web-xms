import React from 'react';
import PropTypes from 'prop-types';
import './Group.less';

function Group({ title, children }) {
  return (
    <div className="xms-group">
      <div className="xms-group-title">{title}</div>
      <div className="xms-group-content">{children}</div>
    </div>
  );
}

Group.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default React.memo(Group);

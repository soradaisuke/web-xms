import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import './Header.less';

function Header({ name, children }) {
  return (
    <Layout.Header className="xms-header">
      <Row align="middle" type="flex">
        <Col>{`蜻蜓FM ${name}`}</Col>
        <Col>{children}</Col>
      </Row>
    </Layout.Header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

export default Header;

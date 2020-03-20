import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Layout, Row, Col } from 'antd';
import isTuboshu from '../utils/isTuboshu';
import './Header.less';

function Header({ name, children }) {
  return (
    <Layout.Header
      className={classNames('xms-header', isTuboshu ? 'tuboshu' : '')}
    >
      <Row align="middle" type="flex">
        <Col>{`${isTuboshu ? '土拨鼠' : '蜻蜓FM'} ${name}`}</Col>
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

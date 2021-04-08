import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card } from 'antd';
import Page from './Page';

const { Title } = Typography;

function WelcomePage({ title }) {
  return (
    <Card>
      <Page>
        <Title>{`欢迎使用${title}`}</Title>
      </Page>
    </Card>
  );
}

WelcomePage.propTypes = {
  title: PropTypes.node.isRequired,
};

export default React.memo(WelcomePage);

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Page from './Page';

export default class RecordPage extends React.PureComponent {
  static displayName = 'RecordPage';

  static propTypes = {
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    routes: PropTypes.arrayOf(PropTypes.shape({
      component: PropTypes.bode,
    })),
  };

  static defaultProps = {
    component: null,
    routes: [],
  };

  state = {
    isLoading: false,
    isError: false,
  };

  renderRoutes() {
    const { routes } = this.props;
    if (routes && routes.length) {
      return map(routes, ({ component: Component, path, title = '' }) => (
        <React.Fragment key={path}>
          {
            title && (
              <span style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>
                {title}
              </span>
            )
          }
          <Component />
        </React.Fragment>
      ));
    }

    return null;
  }

  render() {
    const { component: Component } = this.props;
    const { isLoading, isError } = this.state;

    return (
      <Page isLoading={isLoading} isError={isError}>
        {Component ? <Component /> : null}
        {this.renderRoutes()}
      </Page>
    );
  }
}

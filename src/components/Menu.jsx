import React from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash/fp';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { Menu } from 'antd';
import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import history from '../utils/history';

const { SubMenu } = Menu;

const validMenues = filter(({ title, inline }) => !!title && !inline);

function findNextKey({ pathname, routes, selectedKeys, openKeys }) {
  forEach(routes, route => {
    if (matchPath(pathname, { path: route.path })) {
      selectedKeys.push(route.path);

      const subMenues = validMenues(route.routes);
      if (subMenues.length > 0) {
        openKeys.push(route.path);

        findNextKey({ pathname, routes: subMenues, selectedKeys, openKeys });
      }
    }
  });
}

const selector = createSelector(
  [props => props.location.pathname, props => props.routes],
  (pathname, routes) => {
    const selectedKeys = [];
    const openKeys = [];
    findNextKey({ pathname, routes, selectedKeys, openKeys });

    return { selectedKeys, openKeys };
  }
);

function renderMenus(routes) {
  return validMenues(routes).map(
    ({ path, title, icon, routes: childRoutes }) => {
      const subRoutes = validMenues(childRoutes);

      if (subRoutes.length > 0) {
        return (
          <SubMenu key={path} title={title} icon={icon}>
            {renderMenus(subRoutes)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={path} icon={icon}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      );
    }
  );
}

class NavMenu extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  };

  componentDidUpdate() {
    const { location } = this.props;
    if (location.state?.unmatch) {
      history.replace(location.pathname);
    }
  }

  render() {
    const { selectedKeys, openKeys } = selector(this.props);
    const {
      routes,
      location: { state }
    } = this.props;

    if (state?.unmatch) return null;

    return (
      <Menu
        className="xms-menu"
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
      >
        {renderMenus(routes)}
      </Menu>
    );
  }
}

export default withRouter(NavMenu);

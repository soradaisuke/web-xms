import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { forEach, filter } from 'lodash';
import './NavMenu.less';

function MenuItem({
  path, navIcon, navTitle, component,
}) {
  if (!navTitle || !component) {
    return null;
  }

  return (
    <Menu.Item key={path}>
      <Link to={path}>
        { !!navIcon && <Icon type={navIcon} /> }
        {navTitle}
      </Link>
    </Menu.Item>
  );
}

MenuItem.propTypes = {
  component: PropTypes.node.isRequired,
  navTitle: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  navIcon: PropTypes.string,
};

MenuItem.defaultProps = {
  navIcon: '',
};

function SubMenu({
  path, navTitle, navIcon, routes,
}) {
  const items = filter(routes.map(route => MenuItem(route)), i => i);

  if (items.length === 0) {
    return null;
  }

  return (
    <Menu.SubMenu
      key={path}
      title={(
        <span>
          { !!navIcon && <Icon type={navIcon} /> }
          {navTitle}
        </span>
      )}
    >
      {items}
    </Menu.SubMenu>
  );
}

SubMenu.propTypes = {
  navTitle: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  navIcon: PropTypes.string,
};

SubMenu.defaultProps = {
  navIcon: '',
};

export default class NavMenu extends React.PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  state = {
    selectedKeys: [],
  }

  static getDerivedStateFromProps(nextProps) {
    const { pathname, routes } = nextProps;
    const selectedKeys = [];
    forEach(routes, (route) => {
      if (matchPath(pathname, { path: route.path, exact: !!route.component })) {
        selectedKeys.push(route.path);
        if (route.routes && route.routes.length > 0) {
          forEach(route.routes, (childRoute) => {
            if (matchPath(pathname, { path: childRoute.path, exact: !!childRoute.component })) {
              selectedKeys.push(childRoute.path);
            }
          });
        }
      }
    });
    return { selectedKeys };
  }

  render() {
    return (
      <Menu
        className="xms-nav-menu"
        theme="dark"
        mode="horizontal"
        selectedKeys={this.state.selectedKeys}
      >
        {
          this.props.routes.map((route) => {
            if (route.routes && route.routes.length > 0) {
              return SubMenu(route);
            }
            return MenuItem(route);
          })
        }
      </Menu>
    );
  }
}

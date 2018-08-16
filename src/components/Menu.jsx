import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter, matchPath } from 'react-router';
import { Menu } from 'antd';
import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import './Menu.less';

const { SubMenu } = Menu;

const selector = createSelector(
  [
    props => props.location.pathname,
    props => props.routes,
  ],
  (pathname, routes) => {
    const selectedKeys = [];
    const openKeys = [];
    forEach(routes, (route) => {
      if (matchPath(pathname, { path: route.path })) {
        if (route.routes && route.routes.length > 0) {
          openKeys.push(route.path);

          forEach(route.routes, (childRoute) => {
            if (matchPath(pathname, { path: childRoute.path })) {
              selectedKeys.push(childRoute.path);
            }
          });
        } else {
          selectedKeys.push(route.path);
        }
      }
    });

    return { selectedKeys, openKeys };
  },
);

class NavMenu extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  render() {
    const { selectedKeys, openKeys } = selector(this.props);
    const { routes } = this.props;
    return (
      <Menu
        className="xms-menu"
        theme="dark"
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
      >
        {
          routes.filter(({ title }) => !!title).map(({ path, title, routes: childRoutes }) => {
            if (childRoutes && childRoutes.length > 0) {
              const subMenus = childRoutes.filter(({ childTitle }) => !!childTitle)
                .map(({ path: subPath, title: childTitle }) => (
                  <Menu.Item key={subPath}>
                    <Link to={subPath}>
                      {childTitle}
                    </Link>
                  </Menu.Item>
                ));

              if (subMenus.length > 0) {
                return (
                  <SubMenu
                    key={path}
                    title={title}
                  >
                    {subMenus}
                  </SubMenu>
                );
              }
            }

            return (
              <Menu.Item key={path}>
                <Link to={path}>
                  {title}
                </Link>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
}

export default withRouter(NavMenu);

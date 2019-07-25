import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import { filter } from 'lodash/fp';
import './Menu.less';

const { SubMenu } = Menu;

const validMenues = filter(({ title, inline }) => !!title && !inline);

const selector = createSelector(
  [props => props.location.pathname, props => props.routes],
  (pathname, routes) => {
    const selectedKeys = [];
    const openKeys = [];
    forEach(routes, route => {
      if (matchPath(pathname, { path: route.path })) {
        const subMenues = validMenues(route.routes);
        if (subMenues.length > 0) {
          openKeys.push(route.path);

          forEach(subMenues, childRoute => {
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
  }
);

class NavMenu extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  };

  state = {
    collapsed: false
  };

  onClickCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { selectedKeys, openKeys } = selector(this.props);
    const { routes } = this.props;

    return (
      <div
        className={classNames('xms-side-menu', collapsed ? 'collapsed' : '')}
      >
        <Icon
          className="xms-collapse"
          type={`double-${collapsed ? 'right' : 'left'}`}
          onClick={this.onClickCollapse}
        />
        {!collapsed && (
          <Menu
            className="xms-menu"
            mode="inline"
            selectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
          >
            {validMenues(routes).map(({ path, title, routes: childRoutes }) => {
              const subMenus = validMenues(childRoutes).map(
                ({ path: subPath, title: childTitle }) => (
                  <Menu.Item key={subPath}>
                    <Link to={subPath}>{childTitle}</Link>
                  </Menu.Item>
                )
              );

              if (subMenus.length > 0) {
                return (
                  <SubMenu key={path} title={title}>
                    {subMenus}
                  </SubMenu>
                );
              }

              return (
                <Menu.Item key={path}>
                  <Link to={path}>{title}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        )}
      </div>
    );
  }
}

export default withRouter(NavMenu);

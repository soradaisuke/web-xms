import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, withRouter, matchPath } from 'react-router-dom';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';
import { createSelector } from 'reselect';
import { forEach } from 'lodash';
import history from '../utils/history';
import './Menu.less';

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
  return validMenues(routes).map(({ path, title, routes: childRoutes }) => {
    const subRoutes = validMenues(childRoutes);

    if (subRoutes.length > 0) {
      return (
        <SubMenu key={path} title={title}>
          {renderMenus(subRoutes)}
        </SubMenu>
      );
    }

    return (
      <Menu.Item key={path}>
        <Link to={path}>{title}</Link>
      </Menu.Item>
    );
  });
}

class NavMenu extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  };

  state = {
    collapsed: false
  };

  componentDidUpdate() {
    const { location } = this.props;
    if (location.state?.unmatch) {
      history.replace(location.pathname);
    }
  }

  onClickCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  render() {
    const { collapsed } = this.state;
    const { selectedKeys, openKeys } = selector(this.props);
    const {
      routes,
      location: { state }
    } = this.props;

    if (state?.unmatch) return null;

    return (
      <div
        className={classNames('xms-side-menu', collapsed ? 'collapsed' : '')}
      >
        <Menu
          className="xms-menu"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
        >
          {renderMenus(routes)}
        </Menu>
        <LegacyIcon
          className="xms-collapse"
          type={collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          onClick={this.onClickCollapse}
        />
      </div>
    );
  }
}

export default withRouter(NavMenu);

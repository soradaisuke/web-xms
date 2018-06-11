import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { includes, split, forEach, filter, tail } from 'lodash';
import Styles from './NavMenu.less';

function MenuItem({ path, icon, title }) {
  if (includes(path, ':')) {
    return null;
  }

  return (
    <Menu.Item key={path}>
      <Link to={path}>
        { !!icon && <Icon type={icon} /> }
        {title}
      </Link>
    </Menu.Item>
  );
}

MenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string,
  title: PropTypes.string,
};

MenuItem.defaultProps = {
  icon: '',
  title: '',
};

function SubMenu({
  path, title, icon, routes,
}) {
  return (
    <Menu.SubMenu
      key={path}
      title={(
        <span>
          { !!icon && <Icon type={icon} /> }
          {title}
        </span>
      )}
    >
      {
        routes.map(route => MenuItem({ path: `${path}${route.path}`, icon: route.icon, title: route.title }))
      }
    </Menu.SubMenu>
  );
}

SubMenu.propTypes = {
  path: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  icon: PropTypes.string,
  title: PropTypes.string,
};

SubMenu.defaultProps = {
  icon: '',
  title: '',
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
    const selectedKeys = [];
    const paths = tail(split(nextProps.pathname, '/'));
    forEach(nextProps.routes, ({ path, routes }) => {
      if (path === `/${paths[0]}`) {
        selectedKeys.push(path);
        if (routes && routes.length > 0) {
          forEach(routes, ({ path: childPath }) => {
            if (childPath === `/${paths[1]}`) {
              selectedKeys.push(`${path}${childPath}`);
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
        className={Styles.navMenu}
        theme="dark"
        mode="horizontal"
        selectedKeys={this.state.selectedKeys}
      >
        {
          this.props.routes.map(({
            path, title, icon, routes,
          }) => {
            if (routes && routes.length > 0 && filter(routes, route => !includes(route.path, ':')).length > 0) {
              return SubMenu({
                path, title, icon, routes,
              });
            }
            return MenuItem({ path, icon, title });
          })
        }
      </Menu>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { includes, split, forEach, filter } from 'lodash';
import { Breadcrumb } from 'antd';
import './NavBreadcrumb.less';

export default class NavBreadcrumb extends React.PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderBreadcrumbItems() {
    const items = [];
    let { routes } = this.props;

    forEach(routes, (route) => {
      if (route.path === '/') {
        items.push((
          <Breadcrumb.Item key={route.path}>
            <Link to={route.path}>
              {route.title}
            </Link>
          </Breadcrumb.Item>
        ));
        return false;
      }
      return true;
    });

    const { pathname } = this.props;
    const paths = filter(split(pathname, '/'), p => p);
    let url = '';

    forEach(paths, (path) => {
      let matched = false;
      forEach(routes, (route) => {
        if (route.path === `/${path}` || (path && includes(route.path, ':'))) {
          routes = route.routes;
          matched = true;
          url = `${url}/${path}`;
          if (route.component) {
            items.push((
              <Breadcrumb.Item key={url}>
                <Link to={url}>
                  {includes(route.path, ':') ? `${route.title}${path}` : route.title}
                </Link>
              </Breadcrumb.Item>
            ));
          }
          return false;
        }
        return true;
      });
      return matched;
    });

    return items;
  }

  render() {
    return (
      <Breadcrumb className="xms-nav-breadcrumb">
        {this.renderBreadcrumbItems()}
      </Breadcrumb>
    );
  }
}

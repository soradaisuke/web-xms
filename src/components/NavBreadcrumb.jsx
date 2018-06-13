import React from 'react';
import PropTypes from 'prop-types';
import { matchPath } from 'react-router';
import { Link } from 'react-router-dom';
import { forEach } from 'lodash';
import { Breadcrumb } from 'antd';
import './NavBreadcrumb.less';

function addBreadcrumbItem(pathname, routes, items) {
  forEach(routes, ({
    path, component, navTitle, routes: childRoutes,
  }) => {
    if (path === '/' || matchPath(pathname, { path })) {
      if (component && navTitle) {
        items.push((
          <Breadcrumb.Item key={path}>
            <Link to={path}>
              {navTitle}
            </Link>
          </Breadcrumb.Item>
        ));
      }

      if (childRoutes && childRoutes.length > 0) {
        addBreadcrumbItem(pathname, childRoutes, items);
      }
    }
  });
}

export default class NavBreadcrumb extends React.PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderBreadcrumbItems() {
    const items = [];
    const { routes, pathname } = this.props;

    addBreadcrumbItem(pathname, routes, items);

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

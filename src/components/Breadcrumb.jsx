import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, matchPath } from 'react-router';
import { NavLink } from 'react-router-dom';
import { forEach } from 'lodash';
import { Breadcrumb } from 'antd';
import './Breadcrumb.less';

function addBreadcrumbItem(pathname, routes, items) {
  forEach(routes, ({
    path, component, title, routes: childRoutes,
  }) => {
    if (matchPath(pathname, { path })) {
      if (component) {
        items.push((
          <Breadcrumb.Item key={path}>
            <NavLink exact to={path}>
              {title}
            </NavLink>
          </Breadcrumb.Item>
        ));
      }

      if (childRoutes && childRoutes.length > 0) {
        addBreadcrumbItem(pathname, childRoutes, items);
      }
    }
  });
}

class NavBreadcrumb extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderBreadcrumbItems() {
    const items = [];
    const { routes, location } = this.props;

    addBreadcrumbItem(location.pathname, routes, items);

    return items;
  }

  render() {
    return (
      <Breadcrumb className="xms-breadcrumb">
        {this.renderBreadcrumbItems()}
      </Breadcrumb>
    );
  }
}

export default withRouter(NavBreadcrumb);

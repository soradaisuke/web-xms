import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter, matchPath } from 'react-router-dom';
import { forEach, isFunction, isString, split, take, join } from 'lodash';
import { Breadcrumb } from 'antd';
import pathToText from '../utils/pathToText';

function addBreadcrumbItem({ pathname, routes, items, params }) {
  forEach(
    routes,
    ({ path, component, title, inline, breadcrumb, routes: childRoutes }) => {
      if (matchPath(pathname, { path })) {
        if ((title || breadcrumb) && !inline) {
          let breadcrumbTitle;

          if (isFunction(breadcrumb)) {
            breadcrumbTitle = breadcrumb(params);
          } else if (isString(breadcrumb)) {
            breadcrumbTitle = breadcrumb;
          }

          breadcrumbTitle = pathToText(breadcrumbTitle) || title;

          items.push(
            <Breadcrumb.Item key={path}>
              {component ? (
                <NavLink
                  exact
                  to={join(
                    take(split(pathname, '/'), split(path, '/').length),
                    '/'
                  )}
                >
                  {breadcrumbTitle}
                </NavLink>
              ) : (
                breadcrumbTitle
              )}
            </Breadcrumb.Item>
          );
        }

        if (childRoutes && childRoutes.length > 0) {
          addBreadcrumbItem({
            pathname,
            routes: childRoutes,
            items,
            params
          });
        }

        return false;
      }

      return true;
    }
  );
}

class NavBreadcrumb extends React.PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    routes: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  };

  renderBreadcrumbItems() {
    const items = [];
    const {
      routes,
      match: { params },
      location: { pathname }
    } = this.props;

    addBreadcrumbItem({
      pathname,
      routes,
      items,
      params
    });

    return items;
  }

  render() {
    return <Breadcrumb>{this.renderBreadcrumbItems()}</Breadcrumb>;
  }
}

export default withRouter(NavBreadcrumb);

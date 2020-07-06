import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { matchPath, useLocation } from 'react-router-dom';
import { forEach } from 'lodash';
import { Breadcrumb } from 'antd';
import BreadcrumbContent from './BreadcrumbContent';

function addBreadcrumbItem({ pathname, routes, items }) {
  forEach(
    routes,
    ({
      path,
      component,
      title,
      inline,
      breadcrumb,
      namespace,
      routes: childRoutes
    }) => {
      if (matchPath(pathname, { path })) {
        if ((title || breadcrumb) && !inline) {
          items.push(
            <Breadcrumb.Item key={path}>
              <BreadcrumbContent
                namespace={namespace}
                hasLink={!!component}
                path={path}
                title={title}
                breadcrumb={breadcrumb}
              />
            </Breadcrumb.Item>
          );
        }

        if (childRoutes && childRoutes.length > 0) {
          addBreadcrumbItem({
            pathname,
            routes: childRoutes,
            items
          });
        }

        return false;
      }

      return true;
    }
  );
}

function NavBreadcrumb({ routes }) {
  const { pathname } = useLocation();
  const items = useMemo(() => {
    const array = [];

    addBreadcrumbItem({
      pathname,
      routes,
      items: array
    });

    return array;
  }, [routes, pathname]);

  return <Breadcrumb>{items}</Breadcrumb>;
}

NavBreadcrumb.propTypes = {
  routes: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
};

export default React.memo(NavBreadcrumb);

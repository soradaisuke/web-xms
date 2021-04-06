import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { router, useSelector } from 'dva';
import { isFunction, isString, isObject, split, take, join, has } from 'lodash';
import pathToText from '../../utils/pathToText';
import AsyncBreadcrumb from './AsyncBreadcrumb';

const { NavLink, useLocation, useRouteMatch } = router;

function BreadcrumbContent({ namespace, hasLink, path, breadcrumb, title }) {
  const { pathname } = useLocation();
  const { params: matchParams } = useRouteMatch(path);
  const data = useSelector((state) => state[namespace]);
  const pageData = useMemo(() => data?.toJS() ?? {}, [data]);
  const breadcrumbTitle = useMemo(() => {
    let bTitle;
    if (isFunction(breadcrumb)) {
      bTitle = breadcrumb({
        matchParams,
        pageData,
      });
    } else if (isString(breadcrumb)) {
      bTitle = breadcrumb;
    } else if (isObject(breadcrumb) && has(breadcrumb, 'getBreadcrumb')) {
      const { defaultTitle, ...res } = breadcrumb;
      return (
        <AsyncBreadcrumb
          {...res}
          path={path}
          defaultTitle={defaultTitle ?? title}
        />
      );
    }

    return pathToText(bTitle) || title;
  }, [breadcrumb, title, matchParams, pageData, path]);
  const to = useMemo(
    () => join(take(split(pathname, '/'), split(path, '/').length), '/'),
    [pathname, path]
  );

  return hasLink ? (
    <NavLink exact to={to}>
      {breadcrumbTitle}
    </NavLink>
  ) : (
    breadcrumbTitle
  );
}

BreadcrumbContent.propTypes = {
  hasLink: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  breadcrumb: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      getBreadcrumb: PropTypes.func.isRequired,
      dependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
      defaultTitle: PropTypes.string,
    }),
  ]),
  namespace: PropTypes.string,
  title: PropTypes.string,
};

BreadcrumbContent.defaultProps = {
  title: '',
  breadcrumb: null,
  namespace: null,
};

export default React.memo(BreadcrumbContent);

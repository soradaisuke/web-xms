import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { isFunction, isString, split, take, join } from 'lodash';
import { useSelector } from 'dva';
import pathToText from '../../utils/pathToText';

function BreadcrumbContent({ namespace, hasLink, path, breadcrumb, title }) {
  const { pathname } = useLocation();
  const { params } = useRouteMatch(path);
  const data = useSelector(state => state[namespace]);
  const dataJS = useMemo(() => data?.toJS() ?? {}, [data]);
  const breadcrumbTitle = useMemo(() => {
    let bTitle;
    if (isFunction(breadcrumb)) {
      bTitle = breadcrumb({
        ...params,
        ...dataJS
      });
    } else if (isString(breadcrumb)) {
      bTitle = breadcrumb;
    }

    return pathToText(bTitle) || title;
  }, [breadcrumb, title, params, dataJS]);
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
  breadcrumb: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    .isRequired,
  namespace: PropTypes.string,
  title: PropTypes.string
};

BreadcrumbContent.defaultProps = {
  title: '',
  namespace: null
};

export default React.memo(BreadcrumbContent);

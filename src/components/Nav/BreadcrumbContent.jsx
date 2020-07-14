import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { router, useSelector } from 'dva';
import { isFunction, isString, split, take, join } from 'lodash';

import pathToText from '../../utils/pathToText';

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
    }

    return pathToText(bTitle) || title;
  }, [breadcrumb, title, matchParams, pageData]);
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
  breadcrumb: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  namespace: PropTypes.string,
  title: PropTypes.string,
};

BreadcrumbContent.defaultProps = {
  title: '',
  breadcrumb: null,
  namespace: null,
};

export default React.memo(BreadcrumbContent);

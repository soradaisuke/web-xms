import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { router } from 'dva';
import { pick, isEqual } from 'lodash';
import { useAsync } from 'react-async';
import { useEventCallback } from '@qt/react';

const { useRouteMatch } = router;

function AsyncBreadcrumb({ getBreadcrumb, dependencies, defaultTitle, path }) {
  const { params: matchParams } = useRouteMatch(path);
  const [params, setParams] = useState(pick(matchParams, dependencies));

  useEffect(() => {
    setParams((prevParams) =>
      isEqual(prevParams, pick(matchParams, dependencies))
        ? prevParams
        : pick(matchParams, dependencies)
    );
  }, [dependencies, matchParams]);

  const getTitle = useEventCallback(async () => {
    try {
      const title = await getBreadcrumb(params);
      return title;
    } catch (error) {
      return defaultTitle;
    }
  });

  const { data: title } = useAsync({
    promiseFn: getTitle,
    watch: params,
  });

  return <span>{title ?? defaultTitle}</span>;
}

AsyncBreadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  getBreadcrumb: PropTypes.func.isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultTitle: PropTypes.string,
};

AsyncBreadcrumb.defaultProps = {
  defaultTitle: '',
};

export default React.memo(AsyncBreadcrumb);

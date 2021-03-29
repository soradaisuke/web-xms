import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { router } from 'dva';
import { pick, isEqual } from 'lodash';
import { useAsync } from 'react-async';
import { useEventCallback } from '@qt/react';

const { useRouteMatch } = router;

function AsyncBreadcrumb({ request, dependences, defaultTitle, path }) {
  const { params: matchParams } = useRouteMatch(path);
  const [params, setParams] = useState(pick(matchParams, dependences));

  useEffect(() => {
    setParams((prevParams) =>
      isEqual(prevParams, pick(matchParams, dependences))
        ? prevParams
        : pick(matchParams, dependences)
    );
  }, [dependences, matchParams]);

  const getTitle = useEventCallback(async () => {
    try {
      const title = await request(params);
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
  request: PropTypes.func.isRequired,
  dependences: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultTitle: PropTypes.string,
};

AsyncBreadcrumb.defaultProps = {
  defaultTitle: '',
};

export default React.memo(AsyncBreadcrumb);

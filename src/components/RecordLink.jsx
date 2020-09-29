import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { router } from 'dva';
import { isFunction, startsWith } from 'lodash';
import textToPath from '../utils/textToPath';
import usePageData from '../hooks/usePageData';

const { Link } = router;

function RecordLink({ link, record, buttonProps, children }) {
  const pageData = usePageData();

  const filter = pageData?.filter ?? null;

  const url = useMemo(() => {
    const linkInternal = isFunction(link) ? link({ record, filter }) : link;
    if (!startsWith(linkInternal, 'http')) {
      return textToPath(linkInternal);
    }

    return linkInternal;
  }, [link, record, filter]);

  const style = useMemo(() => ({
    userSelect: 'all',
    ...(buttonProps.style || {})
  }), [buttonProps]);

  if (startsWith(url, 'http')) {
    return (
      <Button href={url} target="_blank" type="link" {...buttonProps} style={style}>
        {buttonProps.children || children}
      </Button>
    );
  }

  return (
    <Link
      to={!startsWith(url, '/') ? `${window.location.pathname}/${url}` : url}
    >
      <Button type="link" {...buttonProps} style={style}>
        {buttonProps.children || children}
      </Button>
    </Link>
  );
}

RecordLink.propTypes = {
  link: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  record: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  // eslint-disable-next-line react/forbid-prop-types
  buttonProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node,
};

RecordLink.defaultProps = {
  buttonProps: {},
  children: null,
  record: null,
};

export default React.memo(RecordLink);

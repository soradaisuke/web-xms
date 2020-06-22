import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import NumberColumn from '../../schema/NumberColumn';
import StringColumn from '../../schema/StringColumn';
import Column from '../../schema/Column';
import './FilterDropDown.less';

function FilterIcon({ column, filtered }) {
  const style = useMemo(() => ({ color: filtered ? '#1890ff' : undefined }), [
    filtered
  ]);

  if (column instanceof StringColumn) {
    return <SearchOutlined style={style} />;
  }

  if (column instanceof NumberColumn) {
    return column.canFilterRange() ? (
      <FilterOutlined style={style} />
    ) : (
      <SearchOutlined style={style} />
    );
  }

  return <FilterOutlined style={style} />;
}

FilterIcon.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  filtered: PropTypes.bool.isRequired
};

export default React.memo(FilterIcon);

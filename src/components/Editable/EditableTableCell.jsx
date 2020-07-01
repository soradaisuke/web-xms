import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { removeUrlProtocol } from '@qt/web-common';
import { map, isNumber, get, isFunction } from 'lodash';
import LinesEllipsis from 'react-lines-ellipsis';
import Column from '../../schema/Column';
import EditableCell from './EditableCell';
import useParentFilterValue from '../../hooks/useParentFilterValue';
import InlineAudioPlayer from '../Common/InlineAudioPlayer';
import DateTimeColumn from '../../schema/DateTimeColumn';
import DurationColumn from '../../schema/DurationColumn';
import ImageColumn from '../../schema/ImageColumn';
import ObjectColumn from '../../schema/ObjectColumn';
import AudioColumn from '../../schema/AudioColumn';
import ZoomImg from '../ZoomImg';
import RecordLink from '../RecordLink';
import './EditableTableCell.less';

function renderInTable({ column, value, parentFilterValue }) {
  if (column instanceof AudioColumn) {
    return value ? (
      <InlineAudioPlayer
        showPlaybackRate={column.showPlaybackRate()}
        showChangeProgress={column.showChangeProgress()}
        url={value}
      />
    ) : null;
  }

  if (column instanceof DateTimeColumn) {
    return value && moment(value).isValid()
      ? moment(value).format(column.getFormat())
      : '';
  }

  if (column instanceof DurationColumn) {
    return isNumber(value)
      ? moment()
          .startOf('day')
          .add(value, 's')
          .format(column.getFormat())
      : '';
  }

  if (column instanceof ImageColumn) {
    const src = removeUrlProtocol(value);
    return <ZoomImg thumbnailWidth={column.getTableWidth()} src={src} />;
  }

  if (column instanceof ObjectColumn) {
    return JSON.stringify(value);
  }

  const option = column.getFilterOption({ value, parentFilterValue });
  if (option) {
    return option.text;
  }

  const maxLines = column.getTableMaxLines();
  if (maxLines > 0) {
    return (
      <LinesEllipsis
        text={value || ''}
        maxLine={maxLines}
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
    );
  }
  return value;
}

function EditableTableCell({
  children,
  record,
  column,
  onComplete,
  ...restProps
}) {
  const parentFilterValue = useParentFilterValue(column);
  const value = useMemo(() => get(record, column?.getKey()), [column, record]);
  const valueNode = useMemo(() => {
    if (!column) {
      return children;
    }

    const render = column.getTableRender();

    if (isFunction(render)) {
      return render({ value, record, reload: onComplete });
    }

    const link = column.getTableLink();

    if (link) {
      return (
        <RecordLink link={link} record={record}>
          {renderInTable({ value, parentFilterValue, column })}
        </RecordLink>
      );
    }

    if (column.isArray()) {
      return (
        <>
          {map(value, v => (
            <React.Fragment key={v}>
              {renderInTable({
                value: v,
                column,
                parentFilterValue
              })}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    }
    return renderInTable({ value, parentFilterValue, column });
  }, [column, value, parentFilterValue, children, record, onComplete]);

  const childrenNode = useMemo(() => {
    if (column && column.canInlineEdit()) {
      return (
        <EditableCell record={record} column={column} onComplete={onComplete}>
          {valueNode}
        </EditableCell>
      );
    }
    return valueNode;
  }, [column, valueNode, record, onComplete]);

  return <td {...restProps}>{childrenNode}</td>;
}

EditableTableCell.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  column: PropTypes.instanceOf(Column),
  onComplete: PropTypes.func,
  record: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

EditableTableCell.defaultProps = {
  children: null,
  column: null,
  onComplete: null,
  record: {}
};

export default React.memo(EditableTableCell);

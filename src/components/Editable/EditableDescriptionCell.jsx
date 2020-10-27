import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { removeUrlProtocol } from '@qt/web-common';
import { map, isNumber, get, isFunction } from 'lodash';
import LinesEllipsis from '../LinesEllipsis';
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
import toKey from '../../utils/toKey';

function renderInDescription({ column, value, parentFilterValue }) {
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
      ? moment().startOf('day').add(value, 's').format(column.getFormat())
      : '';
  }

  if (column instanceof ImageColumn) {
    const src = removeUrlProtocol(value);
    return (
      <ZoomImg thumbnailWidth={column.getDescriptionImageWidth()} src={src} />
    );
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
      />
    );
  }
  return value;
}

function EditableDescriptionCell({ record, column, reload }) {
  const parentFilterValue = useParentFilterValue(column);
  const value = useMemo(() => get(record, column?.getKey()), [column, record]);
  const valueNode = useMemo(() => {
    if (!column) {
      return null;
    }

    const render = column.getDescriptionRender();

    if (isFunction(render)) {
      return render({ value, record, reload });
    }

    const link = column.getDescriptionLink();

    if (link) {
      return (
        <RecordLink
          buttonProps={{
            style: column.getTableWidth() ? { whiteSpace: 'break-spaces' } : null
          }}
          link={link}
          record={record}
        >
          {renderInDescription({ value, parentFilterValue, column })}
        </RecordLink>
      );
    }

    if (column.isArray()) {
      return (
        <>
          {map(value, (v) => (
            <React.Fragment key={toKey(v)}>
              {renderInDescription({
                value: v,
                column,
                parentFilterValue,
              })}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    }
    return renderInDescription({ value, parentFilterValue, column });
  }, [column, value, parentFilterValue, record, reload]);

  const childrenNode = useMemo(() => {
    if (column && column.canInlineEdit()) {
      return (
        <EditableCell record={record} column={column} reload={reload}>
          {valueNode}
        </EditableCell>
      );
    }
    return valueNode;
  }, [column, valueNode, record, reload]);

  return childrenNode ?? null;
}

EditableDescriptionCell.propTypes = {
  column: PropTypes.instanceOf(Column),
  reload: PropTypes.func,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

EditableDescriptionCell.defaultProps = {
  column: null,
  reload: null,
  record: {},
};

export default React.memo(EditableDescriptionCell);

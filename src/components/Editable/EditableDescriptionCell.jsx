import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { removeUrlProtocol } from '@qt/web-common';
import { map, isArray, isNumber, get, isFunction } from 'lodash';
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
      ? moment(value).format(column.getInTableFormat())
      : '';
  }

  if (column instanceof DurationColumn) {
    return isNumber(value)
      ? moment()
          .startOf('day')
          .add(value, 's')
          .format(column.getInTableFormat())
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
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
    );
  }
  return value;
}

function EditableDescriptionCell({ record, column, onComplete }) {
  const parentFilterValue = useParentFilterValue(column);
  const value = useMemo(() => get(record, column?.getKey()), [column, record]);
  const valueNode = useMemo(() => {
    if (!column) {
      return null;
    }

    const render = column.getDescriptionRender();

    if (isFunction(render)) {
      return render({ value, record, reload: onComplete });
    }

    const link = column.getTableLink();

    if (link) {
      return (
        <RecordLink link={link} record={record}>
          {renderInDescription({ value, parentFilterValue, column })}
        </RecordLink>
      );
    }

    if (isArray(value)) {
      return (
        <>
          {map(value, v => (
            <React.Fragment key={v}>
              {renderInDescription({
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
    return renderInDescription({ value, parentFilterValue, column });
  }, [column, value, parentFilterValue, record, onComplete]);

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

  return childrenNode;
}

EditableDescriptionCell.propTypes = {
  column: PropTypes.instanceOf(Column),
  onComplete: PropTypes.func,
  record: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

EditableDescriptionCell.defaultProps = {
  column: null,
  onComplete: null,
  record: {}
};

export default React.memo(EditableDescriptionCell);

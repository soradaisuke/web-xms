import moment from 'moment';
import { padCharsStart } from 'lodash/fp';

const toFixedTwoDigitsNumber = padCharsStart('0')(2);

export default function formatDuration(duration, { format, toObject } = {}) {
  const diff = moment.duration(duration);

  if (toObject) {
    return {
      days: toFixedTwoDigitsNumber(Math.floor(diff.as('d'))),
      hours: toFixedTwoDigitsNumber(diff.get('h')),
      minutes: toFixedTwoDigitsNumber(diff.get('m')),
      seconds: toFixedTwoDigitsNumber(diff.get('s'))
    };
  }

  if (format) {
    return moment.utc(Math.abs(diff)).format(format);
  }

  if (diff.as('days') >= 1) {
    return `${toFixedTwoDigitsNumber(Math.floor(diff.as('days')))}:${moment
      .utc(Math.abs(diff))
      .format('HH:mm:ss')}`;
  }

  if (diff.as('hours') >= 1) {
    return moment.utc(Math.abs(diff)).format('HH:mm:ss');
  }

  return moment.utc(Math.abs(diff)).format('mm:ss');
}

import NumberColumn from './NumberColumn';
import StringColumn from './StringColumn';
import BooleanColumn from './BooleanColumn';
import DateColumn from './DateColumn';
import DateTimeColumn from './DateTimeColumn';
import TimeColumn from './TimeColumn';
import OrderColumn from './OrderColumn';
import ImageColumn from './ImageColumn';
import UrlColumn from './UrlColumn';
import AudioColumn from './AudioColumn';
import ArrayColumn from './ArrayColumn';
import ObjectColumn from './ObjectColumn';

export default {
  Number: config => new NumberColumn(config),
  String: config => new StringColumn(config),
  Boolean: config => new BooleanColumn(config),
  Date: config => new DateColumn(config),
  DateTime: config => new DateTimeColumn(config),
  Time: config => new TimeColumn(config),
  Order: config => new OrderColumn(config),
  Image: config => new ImageColumn(config),
  Url: config => new UrlColumn(config),
  Audio: config => new AudioColumn(config),
  Array: (column, config) => new ArrayColumn(column, config),
  Object: config => new ObjectColumn(config)
};

import NumberColumn from './NumberColumn';
import StringColumn from './StringColumn';
import BooleanColumn from './BooleanColumn';
import DateColumn from './DateColumn';
import DurationColumn from './DurationColumn';
import ImageColumn from './ImageColumn';
import UrlColumn from './UrlColumn';
import AudioColumn from './AudioColumn';
import ObjectColumn from './ObjectColumn';

export default {
  Number: config => new NumberColumn(config),
  String: config => new StringColumn(config),
  Boolean: config => new BooleanColumn(config),
  Date: config => new DateColumn(config),
  Duration: config => new DurationColumn(config),
  Image: config => new ImageColumn(config),
  Url: config => new UrlColumn(config),
  Audio: config => new AudioColumn(config),
  Object: config => new ObjectColumn(config)
};

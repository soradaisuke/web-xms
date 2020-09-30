import NumberColumn from './NumberColumn';
import StringColumn from './StringColumn';
import BooleanColumn from './BooleanColumn';
import DateTimeColumn from './DateTimeColumn';
import DurationColumn from './DurationColumn';
import ImageColumn from './ImageColumn';
import UrlColumn from './UrlColumn';
import AudioColumn from './AudioColumn';
import ObjectColumn from './ObjectColumn';
import FileColumn from './FileColumn';

export default {
  Number: (config) => new NumberColumn(config),
  String: (config) => new StringColumn(config),
  Boolean: (config) => new BooleanColumn(config),
  Date: ({ form, ...config }) => {
    console.warn('Column.Date is deprecated, please use Column.DateTime');

    return new DateTimeColumn({
      ...config,
      format: 'YYYY-MM-DD',
      form: {
        ...(form ?? {}),
        formItemComponentProps: {
          picker: 'date',
        },
      },
    });
  },
  Time: ({ form, ...config }) => {
    console.warn('Column.Time is deprecated, please use Column.DateTime');

    return new DateTimeColumn({
      ...config,
      format: 'HH:mm:ss',
      form: {
        ...(form ?? {}),
        formItemComponentProps: {
          picker: 'time',
        },
      },
    });
  },
  Month: ({ form, ...config }) => {
    console.warn('Column.Month is deprecated, please use Column.DateTime');

    return new DateTimeColumn({
      ...config,
      format: 'YYYY-MM',
      form: {
        ...(form ?? {}),
        formItemComponentProps: {
          picker: 'month',
        },
      },
    });
  },
  DateTime: (config) => new DateTimeColumn(config),
  Duration: (config) => new DurationColumn(config),
  Image: (config) => new ImageColumn(config),
  Url: (config) => new UrlColumn(config),
  Audio: (config) => new AudioColumn(config),
  Object: (config) => new ObjectColumn(config),
  File: (config) => new FileColumn(config),
};

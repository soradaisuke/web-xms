import { map, get } from 'lodash';
import Table from '../schema/Table';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';

export default function processListConfig({
  config,
  path,
  useFormPage
}) {
  const { columns = [], actions = [] } = config;
  const newTable = new Table(columns);

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: new Table(
      columns,
      map(actions, action => {
        if (action instanceof CreateAction && useFormPage) {
          return action.setLink('new/edit');
        }

        if (action instanceof EditAction && useFormPage) {
          return action.setLink(
            ({ record }) => `${get(record, newTable.getPrimaryKey())}/edit`
          );
        }

        return action;
      })
    )
  };
}

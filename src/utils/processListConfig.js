import { map, get } from 'lodash';
import Table from '../schema/Table';
import TableActions from '../actions/TableActions';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';

export default function processListConfig({ config, path, useFormPage }) {
  const { table = [], actions = [] } = config;
  const newTable = new Table(table);

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: newTable,
    actions: new TableActions(
      map(actions, action => {
        if (action instanceof CreateAction && useFormPage) {
          return action.setLink('new/edit');
        }

        if (action instanceof EditAction && useFormPage) {
          return action.setLink(
            record => `${get(record, newTable.getPrimaryKey())}/edit`
          );
        }

        return action;
      })
    )
  };
}

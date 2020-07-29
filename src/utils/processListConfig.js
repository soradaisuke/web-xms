import { map, get } from 'lodash';
import Table from '../schema/Table';
import TableActions from '../actions/TableActions';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';

export default function processListConfig({
  config,
  path,
  useFormPage,
  inline,
  prefix
}) {
  const { table = [], actions = [] } = config;
  const newTable = new Table(table);

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: newTable,
    actions: new TableActions(
      map(actions, action => {
        if (action instanceof CreateAction && useFormPage) {
          return action.setLink(
            `${
              prefix && inline ? `${path.slice(prefix.length + 1)}/` : ''
            }new/edit`
          );
        }

        if (action instanceof EditAction && useFormPage) {
          return action.setLink(
            record =>
              `${
                prefix && inline ? `${path.slice(prefix.length + 1)}/` : ''
              }${get(record, newTable.getPrimaryKey())}/edit`
          );
        }

        return action;
      })
    )
  };
}

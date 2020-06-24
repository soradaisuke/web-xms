import { map, get, concat, filter } from 'lodash';
import Table from '../schema/Table';
import TableActions from '../actions/TableActions';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';

export default function processListConfig({ config, path, formPageConfig = {}, useFormPage }) {
  const { table = [], actions = [] } = config;
  const newTable = new Table(table);

  return {
    ...config,
    namespace: path.replace(/(\/|:)/g, '@'),
    table: newTable,
    formPageConfig: {
      ...formPageConfig,
      actions: concat(
        filter(actions, action =>
          (action instanceof CreateAction ||
            action instanceof EditAction ||
            action instanceof DeleteAction
          ) && useFormPage
        ),
        formPageConfig.actions || []
      )
    },
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

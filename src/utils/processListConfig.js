import { map, get, concat, filter } from 'lodash';
import Table from '../schema/Table';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';

export default function processListConfig({
  config,
  path,
  formPageConfig = {},
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
            record => `${get(record, newTable.getPrimaryKey())}/edit`
          );
        }

        return action;
      })
    ),
    formPageConfig: {
      ...config,
      ...formPageConfig,
      actions: concat(
        filter(
          actions,
          action =>
            (action instanceof CreateAction ||
              action instanceof EditAction ||
              action instanceof DeleteAction) &&
            useFormPage
        ),
        formPageConfig.actions || []
      )
    }
  };
}

import Action from './Action';
import CreateAction from './CreateAction';
import DeleteAction from './DeleteAction';
import EditAction from './EditAction';

export default {
  Custom: config => new Action(config),
  Delete: config => new DeleteAction(config),
  Create: config => new CreateAction(config),
  Edit: config => new EditAction(config)
};

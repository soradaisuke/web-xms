import Immutable from 'immutable';
import { isFunction } from 'lodash';

export default class Action {
  constructor(config = {}) {
    this.config = Immutable.fromJS(config);

    if (config.columns) {
      this.columns = Immutable.List(config.columns);
      this.findCascadeColumn();
    }
  }

  findCascadeColumn() {
    this.columns.forEach(column => {
      const parentKey = column.getParentKey();
      if (parentKey) {
        const parentColumn = this.columns.find(c => c.getKey() === parentKey);
        if (parentColumn) {
          // eslint-disable-next-line no-param-reassign
          column.parentColumn = parentColumn;
          parentColumn.childColumn = (parentColumn.childColumn || []).concat(
            column
          );
        }
      }
    });
  }

  isRowAction() {
    return !this.config.get('global');
  }

  isMultipleAction() {
    return this.config.get('multiple');
  }

  isGlobalAction() {
    return this.config.get('global') && !this.config.get('multiple');
  }

  getTitle() {
    return this.config.get('title');
  }

  getType() {
    return this.config.get('type', 'primary');
  }

  getShape() {
    return this.config.get('shape');
  }

  getIcon() {
    return this.config.get('icon');
  }

  getConfirmType() {
    return this.config.getIn(['confirm', 'type']);
  }

  getConfirmTitle() {
    return this.config.getIn(['confirm', 'title']);
  }

  getConfirmContent() {
    return this.config.getIn(['confirm', 'content']);
  }

  getConfirmProps() {
    if (!this.confirmProps) {
      this.confirmProps = this.config
        .getIn(['confirm', 'confirmProps'], Immutable.Map())
        .toJS();
    }
    return this.confirmProps;
  }

  showConfirmModal() {
    return !!this.config.get('confirm');
  }

  getLink() {
    return this.config.get('link');
  }

  getHandler(defaultHandler) {
    return this.config.get('handler', defaultHandler);
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage');
  }

  getColumns() {
    return this.columns;
  }

  getOnComplete() {
    return this.config.get('onComplete');
  }

  getEnable() {
    return this.config.get('enable');
  }

  getRender() {
    return this.config.get('render');
  }

  getModalProps() {
    if (!this.modalProps) {
      this.modalProps = this.config
        .get('modalProps', Immutable.Map())
        .toJS();
    }
    return this.modalProps;
  }

  getButtonProps() {
    if (!this.buttonProps) {
      this.buttonProps = this.config
        .get('buttonProps', Immutable.Map())
        .toJS();
    }
    return this.buttonProps;
  }

  needReload() {
    return this.config.get('reload');
  }

  // eslint-disable-next-line class-methods-use-this
  checkVisibility() {
    return false;
  }

  isVisible(user) {
    const invisible = this.config.get('invisible');
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible({ user });
    }

    return !invisible;
  }

  canHandleGlobal() {
    return this.isMultipleAction() && !this.isRowAction();
  }
}

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
    return this.config.get('global');
  }

  getTitle() {
    return this.config.get('title');
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

  getInvisible() {
    return this.config.get('invisible');
  }

  getRender() {
    return this.config.get('render');
  }

  getModalProps() {
    if (!this.modalProps) {
      this.modalProps = this.config.get('modalProps', Immutable.Map()).toJS();
    }
    return this.modalProps;
  }

  needReload() {
    return this.config.get('reload');
  }

  isFormAction() {
    return this.config.get('form');
  }

  getButtonProps() {
    if (!this.buttonProps) {
      this.buttonProps = this.config.get('buttonProps', Immutable.Map()).toJS();
    }
    return this.buttonProps;
  }

  getType() {
    return this.config.getIn(
      ['buttonProps', 'type'],
      this.config.get('type', 'primary')
    );
  }

  getShape() {
    return this.config.getIn(
      ['buttonProps', 'shape'],
      this.config.get('shape')
    );
  }

  getIcon() {
    return this.config.getIn(['buttonProps', 'icon'], this.config.get('icon'));
  }

  isVisible(params) {
    const invisible = this.getInvisible();
    if (isFunction(invisible)) {
      return !invisible(params);
    }
    return !invisible;
  }
}

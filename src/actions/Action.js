import Immutable from 'immutable';
import { isFunction, isUndefined, includes } from 'lodash';
import findCascadeColumn from '../utils/findCascadeColumn';

function migrateConfig({
  link,
  confirm: { componentProps, ...confirm } = {},
  ...config
}) {
  if (link && isFunction(link) && !includes(link.toString(), '(_ref')) {
    console.error(
      "Action's config.link(record) is deprecated, please use config.link({ record })"
    );
  }
  if (componentProps) {
    console.warn(
      "Action's config.confirm.componentProps is deprecated, please use config.confirm.confirmProps"
    );
  }

  return {
    link,
    confirm: {
      confirmProps: componentProps,
      ...(confirm ?? {}),
    },
    ...config,
  };
}

export default class Action {
  constructor(config = {}) {
    this.config = Immutable.fromJS(migrateConfig(config));

    if (config.columns) {
      this.columns = Immutable.List(config.columns);
      findCascadeColumn(this.columns);
    }
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

  getSuccessMessage() {
    return this.config.get('successMessage');
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

  getPermissions() {
    if (isUndefined(this.permissions)) {
      this.permissions = this.config.get('permissions', null);
      if (Immutable.isList(this.permissions)) {
        this.permissions = this.permissions.toJS();
      }
    }
    return this.permissions;
  }

  getIcon() {
    return this.config.getIn(
      ['buttonProps', 'icon'],
      this.config.get('icon')?.toJS?.() ?? this.config.get('icon')
    );
  }

  getNormalize() {
    return this.config.get('normalize');
  }

  isVisible(params) {
    const invisible = this.getInvisible();
    if (isFunction(invisible)) {
      try {
        return !invisible(params);
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }

  isEnable(params) {
    const enable = this.getEnable();
    if (isFunction(enable)) {
      try {
        return enable(params);
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return true;
  }
}

import {
  isArray,
  isFunction,
  isUndefined,
  map,
  isEqual,
  get,
  filter,
  forEach,
  flatten,
} from 'lodash';
import Immutable from 'immutable';
import { migrateColumn } from '../utils/migrate';

export default class Column {
  static VALUE_OPTIONS_KEYS = {
    NORMAL: 'normal',
    DISABLED_IN_FILTER: 'disabledInFilter',
    DISABLED_IN_FORM: 'disabledInForm',
    SEARCH: 'search',
  };

  static SEARCH_REQUEST_TYPES = {
    FILTER: 'filter',
    FORM: 'form',
    ALL: 'all',
  };

  static isOptionsDisabled(option, key) {
    if (key === Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER) {
      return (
        get(option, Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER) ||
        get(option, Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER)
      );
    }
    if (key === Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM) {
      return (
        get(option, Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM) ||
        get(option, Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM)
      );
    }
    return false;
  }

  static generateValidOptions(options, disableKey) {
    if (options && options.length > 0) {
      return map(
        filter(
          options,
          (o) => !disableKey || !Column.isOptionsDisabled(o, disableKey)
        ),
        (o) => ({
          ...o,
          children: Column.generateValidOptions(o.children),
        })
      );
    }

    return options;
  }

  static generateFilters(options) {
    return Immutable.Map({
      normal: Column.generateValidOptions(options),
      disabledInFilter: Column.generateValidOptions(
        options,
        Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER
      ),
      disabledInForm: Column.generateValidOptions(
        options,
        Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FORM
      ),
    });
  }

  static findOption(options, value) {
    if (!options) {
      return null;
    }

    let option;

    forEach(options, (o) => {
      if (isEqual(o.value, value)) {
        option = o;
      }
      if (!option) {
        option = Column.findOption(o.children, value);
      }

      return !option;
    });

    return option;
  }

  constructor(config = {}) {
    this.config = Immutable.fromJS(migrateColumn(config));

    this.activeValueOptionsRequests = {};

    this.resetFilters();
  }

  getKey() {
    if (!this.key) {
      this.key = this.config.get('key');

      if (this.key instanceof Immutable.List) {
        this.key = this.key.toArray();
      }
    }
    return this.key;
  }

  getTitle() {
    return this.config.get('title', '');
  }

  getValueOptions() {
    return this.config.get('valueOptions');
  }

  getValueOptionsRequest() {
    return this.config.get('valueOptionsRequest');
  }

  getValueOptionsSearchRequest() {
    return this.config.get('valueOptionsSearchRequest');
  }

  getParentKey() {
    return this.config.get('parentKey');
  }

  isPrimaryKey() {
    return this.config.get('primaryKey');
  }

  isArray() {
    return this.config.get('array');
  }

  // table

  getTableLink() {
    return this.config.getIn(['table', 'link']);
  }

  getTableRender() {
    return this.config.getIn(['table', 'render']);
  }

  getTableDefaultSortDirection() {
    return this.config.getIn(['table', 'defaultSortDirection']);
  }

  getTableFixedSortDirection() {
    return this.config.getIn(['table', 'fixedSortDirection']);
  }

  getTableMaxLines() {
    return this.config.getIn(['table', 'maxLines']);
  }

  getTableColumnProps() {
    if (!this.tableColumnProps) {
      this.tableColumnProps = this.config
        .getIn(['table', 'columnProps'], Immutable.Map())
        .toJS();
    }

    return this.tableColumnProps;
  }

  getTableWidth() {
    return this.config.getIn(
      ['table', 'columnProps', 'width'],
      this.config.getIn(['table', 'width'], 0)
    );
  }

  getTableFixed() {
    return this.config.getIn(
      ['table', 'columnProps', 'fixed'],
      this.config.getIn(['table', 'fixed'], false)
    );
  }

  getTableSortDirections() {
    if (!this.sortDirections) {
      this.sortDirections = this.config
        .getIn(
          ['table', 'columnProps', 'sortDirections'],
          this.config.getIn(['table', 'sortDirections'], Immutable.List())
        )
        .toArray();
    }

    return this.sortDirections;
  }

  canSortInTable() {
    return this.getTableSortDirections().length > 0;
  }

  canShowInTable(params) {
    const invisible = this.config.getIn(['table', 'invisible']);
    if (isFunction(invisible)) {
      return !invisible(params);
    }

    return !invisible;
  }

  getUseValueOptionsSearchRequest() {
    return this.config.get(
      'useValueOptionsSearchRequest',
      Column.SEARCH_REQUEST_TYPES.ALL
    );
  }

  // filter

  getFilters(parentFilteredValue, key = Column.VALUE_OPTIONS_KEYS.NORMAL) {
    if (this.getParentKey() && key !== Column.VALUE_OPTIONS_KEYS.SEARCH) {
      if (isArray(parentFilteredValue)) {
        const filters = filter(
          map(parentFilteredValue, (v) => this.filters.getIn([v, key])),
          (v) => !!v
        );
        if (parentFilteredValue.length !== filters.length) {
          return null;
        }

        return flatten(filters);
      }
      return this.filters
        ? this.filters.getIn([parentFilteredValue, key])
        : null;
    }
    return this.filters ? this.filters.get(key) : null;
  }

  getFilterOption({ value, parentFilterValue }) {
    const filters = this.getFilters(parentFilterValue);
    return Column.findOption(filters, value);
  }

  resetFilters() {
    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = Column.generateFilters(valueOptions.toJS());
    } else {
      this.filters = Immutable.Map();
    }
  }

  getFilterDefault() {
    if (!this.filterDefault) {
      this.filterDefault = this.config.getIn(['table', 'filterDefault']);
      if (this.filterDefault?.toJS) {
        this.filterDefault = this.filterDefault.toJS();
      }
    }
    return this.filterDefault;
  }

  getFilterRequired() {
    return this.config.getIn(['table', 'filterRequired']);
  }

  getFilterGroup() {
    return this.config.getIn(['table', 'filterGroup'], '');
  }

  canFilter(user) {
    const configFilter = this.config.getIn(['table', 'filter']);
    if (isFunction(configFilter)) {
      return configFilter({ user });
    }
    return configFilter;
  }

  canFilterExpandable() {
    return this.config.getIn(['table', 'filterExpandable']);
  }

  canFilterMultiple() {
    return this.config.getIn(['table', 'filterMultiple']);
  }

  canFilterRange() {
    return this.config.getIn(['table', 'filterRange']);
  }

  canFilterOutside() {
    return this.config.getIn(['table', 'filterOutside'], true);
  }

  canFilterAuto() {
    return this.config.getIn(['table', 'filterAuto'], true);
  }

  getFilterFormItemProps() {
    if (!this.filterFormItemProps) {
      this.filterFormItemProps = this.config
        .getIn(['table', 'filterFormItemProps'], Immutable.Map())
        .toJS();
    }

    return this.filterFormItemProps;
  }

  getFilterKey() {
    if (!this.filterKey) {
      this.filterKey = this.config.getIn(
        ['table', 'filterFormItemProps', 'name'],
        this.config.getIn(['table', 'filterKey'], this.getKey())
      );
      if (this.filterKey.toArray) {
        this.filterKey = this.filterKey.toArray();
      }
    }
    return this.filterKey;
  }

  getFilterFormItemComponentProps() {
    if (!this.filterFormItemComponentProps) {
      this.filterFormItemComponentProps = this.config
        .getIn(['table', 'filterFormItemComponentProps'], Immutable.Map())
        .toJS();
    }

    return this.filterFormItemComponentProps;
  }

  // form
  canEdit({ user, record }) {
    return (
      this.canShowInEditFrom({ user, record }) &&
      !this.isImmutableInForm({ user, record })
    );
  }

  getFormRender() {
    return this.config.getIn(['form', 'render']);
  }

  isImmutableInForm({ user, record }) {
    const immutableInForm = this.config.getIn(['form', 'immutable']);
    if (isFunction(immutableInForm)) {
      return immutableInForm({ user, record });
    }
    return immutableInForm;
  }

  canShowInCreateFrom({ user }) {
    const creatable = this.config.getIn(['form', 'creatable']);
    if (isFunction(creatable)) {
      return creatable({ user });
    }

    return creatable;
  }

  canShowInEditFrom({ user, record }) {
    const editable = this.config.getIn(['form', 'editable']);
    if (isFunction(editable)) {
      return editable({ user, record });
    }

    return editable;
  }

  canInlineEdit() {
    return this.config.getIn(['form', 'inlineEdit']);
  }

  canFormItemExpandable() {
    return this.config.getIn(['form', 'expandable'], false);
  }

  getFormRequired() {
    return this.config.getIn(['form', 'required'], false);
  }

  getFormPlaceholder() {
    return this.config.getIn(
      ['form', 'formItemComponentProps', 'placeholder'],
      this.config.getIn(['form', 'placeholder'], `请输入${this.getTitle()}`)
    );
  }

  getFormItemAvailableWhen() {
    return this.config.getIn(['form', 'availableWhen'], Immutable.Map());
  }

  getFormItemProps() {
    if (!this.formItemProps) {
      this.formItemProps = this.config
        .getIn(['form', 'formItemProps'], Immutable.Map())
        .toJS();
    }

    return this.formItemProps;
  }

  getFormItemRules() {
    if (!this.formItemRules) {
      this.formItemRules = this.config
        .getIn(
          ['form', 'formItemProps', 'rules'],
          this.config.getIn(['form', 'rules'], Immutable.List())
        )
        .toJS();
    }

    return this.formItemRules;
  }

  getFormItemName() {
    if (!this.formItemName) {
      this.formItemName = this.config.getIn(
        ['form', 'formItemProps', 'name'],
        this.config.getIn(['form', 'key'], this.getKey())
      );
      if (this.formItemName.toJS) {
        this.formItemName = this.formItemName.toJS();
      }
    }
    return this.formItemName;
  }

  getFormItemLabel() {
    return this.config.getIn(
      ['form', 'formItemProps', 'label'],
      this.config.getIn(['form', 'label'], this.getTitle())
    );
  }

  getFormItemInitialValue() {
    if (!this.formItemInitialValue) {
      this.formItemInitialValue = this.config.getIn(
        ['form', 'formItemProps', 'initialValue'],
        this.config.getIn(['form', 'initialValue'])
      );
      if (this.formItemInitialValue?.toJS) {
        this.formItemInitialValue = this.formItemInitialValue.toJS();
      }
    }
    return this.formItemInitialValue;
  }

  getFormItemInitialListItemValue() {
    if (!this.formItemInitialListItemValue) {
      this.formItemInitialListItemValue = this.config.getIn([
        'form',
        'initialListItemValue',
      ]);
      if (this.formItemInitialListItemValue?.toJS) {
        this.formItemInitialListItemValue = this.formItemInitialListItemValue.toJS();
      }
    }
    return this.formItemInitialListItemValue;
  }

  getFormItemInitialValueOptionsRequest() {
    return this.config.getIn(['form', 'initialValueOptionsRequest']);
  }

  getFormItemNormalizeInitialValue() {
    return this.config.getIn(['form', 'normalizeInitialValue']);
  }

  getFormItemNormalizeInitialValueOptions() {
    return this.config.getIn(['form', 'normalizeInitialValueOptions']);
  }

  getFormItemComponentProps() {
    if (!this.formItemComponentProps) {
      this.formItemComponentProps = this.config
        .getIn(['form', 'formItemComponentProps'], Immutable.Map())
        .toJS();
    }

    return this.formItemComponentProps;
  }

  // descriptions

  canShowInDescription({ user, record }) {
    const invisible = this.config.getIn(['description', 'invisible']);
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible({ user, record });
    }

    return !invisible;
  }

  getDescriptionLink() {
    return this.config.getIn(['description', 'link']);
  }

  getDescriptionRender() {
    return this.config.getIn(['description', 'render']);
  }

  getDescriptionImageWidth() {
    return this.config.getIn(['description', 'imageWidth'], 0);
  }

  getDescriptionItemProps() {
    if (!this.descriptionItemProps) {
      this.descriptionItemProps = this.config
        .getIn(['description', 'descriptionItemProps'], Immutable.Map())
        .toJS();
    }

    return this.descriptionItemProps;
  }

  fetchValueOptions(parentFilteredValue) {
    const valueOptionsRequest = this.getValueOptionsRequest();

    if (valueOptionsRequest) {
      if (this.getParentKey()) {
        if (this.activeValueOptionsRequests[parentFilteredValue]) {
          return this.activeValueOptionsRequests[parentFilteredValue];
        }
        if (
          !this.activeValueOptionsRequests[parentFilteredValue] &&
          !isUndefined(parentFilteredValue)
        ) {
          let promise;

          if (isArray(parentFilteredValue)) {
            promise = Promise.all(
              parentFilteredValue.map((v) => {
                if (this.filters.get(v)) {
                  return Promise.resolve(v);
                }
                return valueOptionsRequest(v).then((result) => {
                  this.filters = this.filters.set(
                    v,
                    Column.generateFilters(result)
                  );
                });
              })
            ).then(() => {
              this.activeValueOptionsRequests[parentFilteredValue] = null;
            });
          } else {
            promise = valueOptionsRequest(parentFilteredValue).then(
              (result) => {
                this.filters = this.filters.set(
                  parentFilteredValue,
                  Column.generateFilters(result)
                );
                this.activeValueOptionsRequests[parentFilteredValue] = null;
              }
            );
          }
          this.activeValueOptionsRequests[parentFilteredValue] = promise;

          return this.activeValueOptionsRequests[parentFilteredValue];
        }
      } else if (!this.activeValueOptionsRequests[parentFilteredValue]) {
        this.activeValueOptionsRequests[
          parentFilteredValue
        ] = valueOptionsRequest().then((result) => {
          this.filters = Column.generateFilters(result);
          this.activeValueOptionsRequests[parentFilteredValue] = null;
        });

        return this.activeValueOptionsRequests[parentFilteredValue];
      } else {
        return this.activeValueOptionsRequests[parentFilteredValue];
      }
    }

    return Promise.reject();
  }
}

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
  includes,
} from 'lodash';
import Immutable from 'immutable';

function isOptionsDisabled(option, key) {
  if (key === 'disabledInFilter') {
    return get(option, 'disabledInFilter') || get(option, 'disableInFilter');
  }
  if (key === 'disabledInForm') {
    return get(option, 'disabledInForm') || get(option, 'disabledInForm');
  }
  return false;
}

function generateValidOptions(options, disableKey) {
  if (options && options.length > 0) {
    return map(
      filter(options, (o) => !disableKey || !isOptionsDisabled(o, disableKey)),
      (o) => ({
        ...o,
        children: generateValidOptions(o.children),
      })
    );
  }

  return options;
}

function generateFilters(options) {
  return Immutable.Map({
    normal: generateValidOptions(options),
    disabledInFilter: generateValidOptions(options, 'disabledInFilter'),
    disabledInForm: generateValidOptions(options, 'disabledInForm'),
  });
}

function findOption(options, value) {
  if (!options) {
    return null;
  }

  let option;

  forEach(options, (o) => {
    if (isEqual(o.value, value)) {
      option = o;
    }
    if (!option) {
      option = findOption(o.children, value);
    }

    return !option;
  });

  return option;
}

function migrateConfig({
  table: {
    defaultSortOrder,
    fixedSortOrder,
    fixed,
    link,
    columnProps,
    filterComponentProps,
    format,
    ...table
  } = {},
  form: {
    componentProps,
    generateInitialValue,
    generateSubmitValue,
    renderInFormItem,
    radioOptions,
    searchPlaceholder,
    searchRequest,
    ...form
  } = {},
  ...config
}) {
  if (defaultSortOrder) {
    console.warn(
      "Column's config.table.defaultSortOrder is deprecated, please use config.table.defaultSortDirection"
    );
  }
  if (fixedSortOrder) {
    console.warn(
      "Column's config.table.fixedSortOrder is deprecated, please use config.table.fixedSortDirection"
    );
  }
  if (defaultSortOrder) {
    console.warn(
      "Column's config.table.fixed is deprecated, please use config.table.columnProps"
    );
  }
  if (componentProps) {
    console.warn(
      "Column's config.form.componentProps is deprecated, please use config.form.formItemComponentProps"
    );
  }
  if (generateInitialValue) {
    console.warn(
      "Column's config.form.generateInitialValue is deprecated, please use config.form.normalizeInitialValue"
    );
  }
  if (generateSubmitValue) {
    console.error(
      "Column's config.form.generateSubmitValue is deprecated, please use Action's config.normalize"
    );
  }
  if (renderInFormItem) {
    console.error(
      "Column's config.form.renderInFormItem is deprecated, please use config.form.render"
    );
  }
  if (radioOptions) {
    console.error("Column's config.form.radioOptions is deprecated");
  }
  if (searchPlaceholder) {
    console.error("Column's config.form.searchPlaceholder is deprecated");
  }
  if (searchRequest) {
    console.warn(
      "Column's config.form.searchRequest is deprecated, please use config.valueOptionsSearchRequest"
    );
  }
  if (filterComponentProps) {
    console.warn(
      "Column's config.table.filterComponentProps is deprecated, please use config.table.filterFormItemComponentProps"
    );
  }
  if (format) {
    console.warn(
      "Column's config.table.format is deprecated, please use config.format"
    );
  }
  if (link && !includes(link.toString(), '(_ref')) {
    console.error(
      "Column's config.table.link(record) is deprecated, please use config.table.link({ record })"
    );
  }

  return {
    table: {
      defaultSortDirection: defaultSortOrder,
      fixedSortDirection: fixedSortOrder,
      link,
      filterFormItemComponentProps: filterComponentProps,
      columnProps: {
        fixed,
        ...(columnProps ?? {}),
      },
      ...(table ?? {}),
    },
    form: {
      formItemComponentProps: componentProps,
      normalizeInitialValue: generateInitialValue,
      render: renderInFormItem,
      ...form,
    },
    valueOptionsSearchRequest: searchRequest,
    format,
    ...config,
  };
}

export default class Column {
  static SEARCH_REQUEST_TYPES = {
    FILTER: 'filter',
    FORM: 'form',
    ALL: 'all',
  };

  constructor(config = {}) {
    this.config = Immutable.fromJS(migrateConfig(config));

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
    return this.config.get('title');
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

  getFilters(parentFilteredValue, key = 'normal') {
    if (this.getParentKey() && key !== 'search') {
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
    return findOption(filters, value);
  }

  resetFilters() {
    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = generateFilters(valueOptions.toJS());
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

  canFilter() {
    return this.config.getIn(['table', 'filter']);
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

  getFilterFormItemProps() {
    if (!this.filterFormItemProps) {
      this.filterFormItemProps = this.config
        .getIn(['table', 'filterFormItemProps'], Immutable.Map())
        .toJS();
    }

    return this.filterFormItemProps;
  }

  getFilterKey() {
    return this.config.getIn(
      ['table', 'filterFormItemProps', 'name'],
      this.config.getIn(['table', 'filterKey'], this.getKey())
    );
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
    return this.config.getIn(
      ['form', 'formItemProps', 'name'],
      this.config.getIn(['form', 'key'], this.getKey())
    );
  }

  getFormItemLabel() {
    return this.config.getIn(
      ['form', 'formItemProps', 'label'],
      this.config.getIn(['form', 'label'], this.getTitle())
    );
  }

  getFormItemInitialValue() {
    return this.config.getIn(
      ['form', 'formItemProps', 'initialValue'],
      this.config.getIn(['form', 'initialValue'])
    );
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
                  this.filters = this.filters.set(v, generateFilters(result));
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
                  generateFilters(result)
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
          this.filters = generateFilters(result);
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

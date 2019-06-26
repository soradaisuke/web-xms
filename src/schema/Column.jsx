import React from 'react';
import { isArray, isFunction, isUndefined, join, map, isEqual } from 'lodash';
import { makeCancelablePromise } from '@qt/web-core';
import Immutable from 'immutable';
import { Button } from 'antd';
import RecordLink from '../components/RecordLink';
import './Column.less';

function generateValidOptions(options) {
  if (options && options.size > 0) {
    return options
      .filter(o => !o.get('disableInFilter'))
      .map(o => {
        return o.set('children', generateValidOptions(o.get('children')));
      });
  }

  return options;
}

export default class Column {
  constructor(config = {}) {
    this.config = Immutable.fromJS({
      ...config,
      key: isArray(config.key) ? join(config.key, '.') : config.key
    });

    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = generateValidOptions(valueOptions);
    } else if (this.isParentOnLeft()) {
      this.filters = Immutable.Map();
    }
  }

  getKey() {
    return this.config.get('key');
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

  getTableLink() {
    return this.config.getIn(['table', 'link']);
  }

  getTableSortDirections() {
    return this.config.getIn(['table', 'sortDirections'], Immutable.List());
  }

  getTableDefaultSortOrder() {
    return this.config.getIn(['table', 'defaultSortOrder']);
  }

  getTableFilters(parentFilteredValue) {
    if (this.isParentOnLeft()) {
      if (isArray(parentFilteredValue)) {
        const list = Immutable.List(parentFilteredValue);
        const filters = list.map(v => this.filters.get(v)).filter(v => !!v);
        if (list.size !== filters.size) {
          return null;
        }

        return filters.flatten(true);
      }
      return this.filters.get(parentFilteredValue);
    }
    return this.filters;
  }

  getTableFilterKey() {
    return this.config.getIn(['table', 'filterKey']) || this.getKey();
  }

  getTableFilterComponentProps() {
    return this.config.getIn(
      ['table', 'filterComponentProps'],
      Immutable.Map()
    );
  }

  getTableWidth() {
    return this.config.getIn(['table', 'width'], undefined);
  }

  isPrimaryKey() {
    return this.config.get('primaryKey');
  }

  isArray() {
    return this.config.get('isArray');
  }

  isParentOnLeft() {
    return this.config.get('parentOnLeft');
  }

  canFilterInTable() {
    return this.config.getIn(['table', 'filter']);
  }

  canFilterMultipleInTable() {
    return this.config.getIn(['table', 'filterMultiple']);
  }

  canFilterRangeInTable() {
    return this.config.getIn(['table', 'filterRange']);
  }

  canSortInTable() {
    return this.getTableSortDirections().size > 0;
  }

  canShowInTable(user) {
    const invisible = this.config.getIn(['table', 'invisible']);
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible(user);
    }

    return !invisible;
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return false;
  }

  useValueOptionsInTable() {
    return this.config.getIn(['table', 'useValueOptions']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      const option = valueOptions.find(o => o.get('value') === value);
      if (option) {
        return option.get('text');
      }
    }
    return value;
  }

  renderInTableValue({ value, record }) {
    const render = this.config.getIn(['table', 'render']);

    if (isFunction(render)) {
      return render({ value, record });
    }

    if (this.isArray() && isArray(value)) {
      return (
        <React.Fragment>
          {map(value, v => (
            <React.Fragment key={v}>
              {this.renderInTableValueDefault({ value: v })}
              <br />
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }

    return this.renderInTableValueDefault({ value, record });
  }

  renderInTable({ value, record }) {
    const children = this.renderInTableValue({ value, record });
    const link = this.getTableLink();

    if (link) {
      return (
        <RecordLink link={link} record={record}>
          {children}
        </RecordLink>
      );
    }
    return children;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFilterDropDownContent() {
    return null;
  }

  renderFilterDropDown = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm, // eslint-disable-line react/prop-types
    clearFilters // eslint-disable-line react/prop-types
  }) => (
    <div style={{ padding: 8 }}>
      {// eslint-disable-next-line react/no-this-in-sfc
      this.renderFilterDropDownContent({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      })}
      <div className="filter-dropdown-button-wrapper">
        <Button
          type="primary"
          onClick={confirm}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    </div>
  );

  async fetchValueOptions(parentFilteredValue) {
    const valueOptionsRequest = this.getValueOptionsRequest();

    if (valueOptionsRequest) {
      if (this.isParentOnLeft()) {
        if (
          this.activeValueOptionsRequest &&
          !isEqual(
            this.activeValueOptionsRequest.parentFilteredValue,
            parentFilteredValue
          )
        ) {
          this.activeValueOptionsRequest.cancel();
          this.activeValueOptionsRequest = null;
        }
        if (
          !this.activeValueOptionsRequest &&
          !isUndefined(parentFilteredValue)
        ) {
          let promise;

          if (isArray(parentFilteredValue)) {
            promise = Promise.all(
              parentFilteredValue.map(v => {
                if (this.filters.get(v)) {
                  return Promise.resolve(v);
                }
                return valueOptionsRequest(v).then(result => {
                  this.filters = this.filters.set(
                    v,
                    generateValidOptions(Immutable.fromJS(result))
                  );
                });
              })
            ).then(() => {
              this.activeValueOptionsRequest = null;
            });
          } else {
            promise = valueOptionsRequest(parentFilteredValue).then(result => {
              this.filters = this.filters.set(
                parentFilteredValue,
                generateValidOptions(Immutable.fromJS(result))
              );
              this.activeValueOptionsRequest = null;
            });
          }
          this.activeValueOptionsRequest = makeCancelablePromise(promise);
          this.activeValueOptionsRequest.parentFilteredValue = parentFilteredValue;

          return this.activeValueOptionsRequest;
        }
      } else if (!this.activeValueOptionsRequest) {
        this.activeValueOptionsRequest = valueOptionsRequest().then(result => {
          this.filters = generateValidOptions(Immutable.fromJS(result));
          this.activeValueOptionsRequest = null;
        });

        return this.activeValueOptionsRequest;
      }
    }

    return Promise.reject();
  }
}

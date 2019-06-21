import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Immutable from 'immutable';
import classNames from 'classnames';
import AsyncValidator from 'async-validator';
import { Link } from 'react-router-dom';
import {
  Table,
  Pagination,
  Button,
  Popconfirm,
  Input,
  message,
  Modal,
  Card,
  Col,
  Row
} from 'antd';
import {
  split,
  startsWith,
  isFunction,
  isArray,
  find,
  reduce,
  map,
  isEqual,
  isNumber,
  get,
  isUndefined,
  chunk,
  join,
  forEach,
  findIndex
} from 'lodash';
import { generateUpYunImageUrl } from '@qt/web-core';
import RecordLink from '../components/RecordLink';
import RecordModal from '../components/RecordModal';
import Group from '../components/Group';
import Page from './Page';
import ColumnTypes from '../utils/ColumnTypes';
import './RecordsPage.less';

const { Column } = Table;
const { Search } = Input;
const { confirm } = Modal;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    fetch: PropTypes.func.isRequired,
    schema: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string,
        link: PropTypes.shape({
          url: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
          type: PropTypes.oneOf(['relative', 'absolute', 'external'])
        }),
        visibility: PropTypes.shape({
          create: PropTypes.bool,
          edit: PropTypes.bool,
          table: PropTypes.bool
        })
      })
    ).isRequired,
    updatePage: PropTypes.func.isRequired,
    updateModalFilters: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}).isRequired
    }).isRequired,
    create: PropTypes.func,
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    customGlobalActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    customMultipleActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    customRowActions: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    filterInGroupSchemas: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    customMultipleEdits: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    error: PropTypes.instanceOf(Error),
    isLoading: PropTypes.bool,
    order: PropTypes.func,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    edit: PropTypes.func,
    inline: PropTypes.bool,
    inlineEdit: PropTypes.func,
    filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    primaryKey: PropTypes.string,
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    remove: PropTypes.func,
    defaultFilter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    search: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    searchFields: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    sort: PropTypes.string,
    total: PropTypes.number,
    hasCreateNew: PropTypes.bool,
    user: PropTypes.instanceOf(Immutable.Map)
  };

  static defaultProps = {
    create: null,
    component: null,
    customGlobalActions: [],
    customMultipleActions: [],
    customRowActions: [],
    filterInGroupSchemas: [],
    customMultipleEdits: [],
    error: null,
    isLoading: false,
    edit: null,
    filter: {},
    primaryKey: 'id',
    remove: null,
    records: Immutable.List(),
    order: null,
    page: 1,
    pagesize: 10,
    search: {},
    searchFields: [],
    sort: '',
    total: 0,
    inline: false,
    inlineEdit: null,
    hasCreateNew: false,
    defaultFilter: {},
    user: null
  };

  static showTotal(total, range) {
    return `${range[0]}-${range[1]}，共${total}个`;
  }

  constructor(props) {
    super(props);

    const { defaultFilter, filter, filterInGroupSchemas } = props;
    const filterGroup = {};
    const filterInGroupSchemaKeys = {};
    forEach(filterInGroupSchemas, ({ mapKey }) => {
      filterInGroupSchemaKeys[mapKey] = true;
      const defaultValue =
        filter[mapKey] === 0 || filter[mapKey]
          ? filter[mapKey]
          : defaultFilter[mapKey];
      if (filter && (defaultValue === 0 || defaultValue)) {
        filterGroup[mapKey] = defaultValue;
      }
    });

    this.state = {
      filterGroup,
      filterInGroupSchemaKeys,
      records: Immutable.List(),
      dataSource: [],
      selectedRowKeys: [],
      selectedRows: [],
      inputSearch: {}
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.records !== nextProps.records) {
      return {
        records: nextProps.records,
        dataSource: nextProps.records.toJS()
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { pagesize, page, sort, search, filter } = this.props;
    if (
      prevProps.pagesize !== pagesize ||
      prevProps.page !== page ||
      prevProps.sort !== sort ||
      prevProps.search !== search ||
      prevProps.filter !== filter
    ) {
      this.fetch();
    }
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows });
  };

  onChangePage = (page, pagesize) => {
    const { updatePage, sort, filter, search } = this.props;
    updatePage({
      page,
      pagesize,
      sort,
      filter,
      search
    });
  };

  onSearch = ({ type, mapKey }, value) => {
    const { updatePage, pagesize, sort, filter } = this.props;

    const searchValue = type.formatSubmitValue(value);
    const search =
      searchValue || searchValue === 0 ? { [mapKey]: searchValue } : {};

    updatePage({
      page: 1,
      pagesize,
      sort,
      filter,
      search
    });
  };

  onChange = async (pagination, filters, sorter) => {
    const {
      schema,
      page,
      pagesize,
      search,
      updatePage,
      sort,
      filter
    } = this.props;
    const { filterInGroupSchemaKeys } = this.state;
    const targetSchema = find(schema, { key: sorter.columnKey }) || {};
    const { sort: schemaSort } = targetSchema;
    let newSort;
    if (schemaSort && sorter && sorter.columnKey && sorter.order) {
      if (schemaSort[sorter.order.replace('end', '')]) {
        newSort = `${targetSchema.mapKey} ${sorter.order.replace('end', '')}`;
      } else if (schemaSort.asc) {
        newSort = `${targetSchema.mapKey} asc`;
      } else if (schemaSort.desc) {
        newSort = `${targetSchema.mapKey} desc`;
      } else {
        newSort = '';
      }
    } else {
      newSort = '';
    }
    const newFilter = reduce(
      schema,
      (acc, { key, type, mapKey, filterMultiple }) => {
        const value = get(filters, key);
        const preValue = get(filter, key);
        if (filterInGroupSchemaKeys[mapKey] && preValue) {
          acc[mapKey] = preValue;
        } else if (value && value.length > 0) {
          if (filterMultiple) {
            acc[mapKey] = value.map(v => type.formatSubmitValue(v));
          } else {
            acc[mapKey] = type.formatSubmitValue(value[0]);
          }
        }
        return acc;
      },
      {}
    );

    let newPage = page;

    if (sort !== newSort || !isEqual(filter, newFilter)) {
      newPage = 1;
    }

    updatePage({
      page: newPage,
      pagesize,
      sort: newSort,
      search,
      filter: newFilter
    });
  };

  onOrderChange = async (body, diff) => {
    const { order } = this.props;
    await this.updateRecord({ promise: order(body, diff) });
  };

  onConfirmRemove = async record => {
    const { remove } = this.props;
    await this.updateRecord({
      promise: remove(record),
      loadingMessage: '正在删除……'
    });
  };

  onCustomRowAction = async (record, handler) => {
    if (isFunction(handler)) {
      const {
        match: { params: matchParams }
      } = this.props;
      await this.updateRecord({ promise: handler(record, matchParams) });
    }
  };

  onCustomMultipleAction = async (handler, enable) => {
    if (isFunction(handler)) {
      const {
        user,
        match: { params: matchParams }
      } = this.props;
      const { selectedRows } = this.state;
      await this.updateRecord({
        promise: Promise.all(
          map(selectedRows, record =>
            !isFunction(enable) || enable(record, user)
              ? handler(record, matchParams)
              : null
          )
        )
      });
      this.setState({ selectedRowKeys: [], selectedRows: [] });
    }
  };

  onCustomGlobalAction = async handler => {
    if (isFunction(handler)) {
      const {
        match: { params: matchParams }
      } = this.props;
      await this.updateRecord({ promise: handler(matchParams) });
    }
  };

  updateRecord = async ({
    promise,
    loadingMessage = '正在保存……',
    throwError = false
  }) => {
    const hide = message.loading(loadingMessage, 0);
    try {
      await promise;
      hide();
    } catch (e) {
      hide();
      message.error(e.message);
      if (throwError) {
        throw e;
      }
    }
    this.fetch();
  };

  editRecord = async body => {
    const { edit, inlineEdit, create, primaryKey } = this.props;
    const newEdit = edit || inlineEdit;
    await this.updateRecord({
      promise: body[primaryKey] && newEdit ? newEdit(body) : create(body),
      throwError: true
    });
  };

  fetch = async () => {
    const { fetch, page, pagesize, sort, search, filter } = this.props;
    fetch({
      page,
      pagesize,
      sort,
      search,
      filter
    });
  };

  onClickQuery = () => {
    const { filter, updatePage } = this.props;
    const { filterGroup, filterInGroupSchemaKeys } = this.state;

    forEach(filter, (_, key) => {
      if (filterInGroupSchemaKeys[key]) {
        delete filter[key];
      }
    });
    forEach(filterGroup, (v, key) => {
      const hasValidValue = arr =>
        findIndex(arr, item => item === 0 || item) !== -1;

      if ((isArray(v) && !hasValidValue(v)) || (v !== 0 && !v)) {
        delete filterGroup[key];
      }
    });

    updatePage({
      filter: { ...filter, ...filterGroup }
    });
  };

  onClickReset = () => {
    this.setState({ filterGroup: {} });
  };

  hasAddButton() {
    const { create, hasCreateNew } = this.props;
    return !!create || hasCreateNew;
  }

  renderColumn({
    visibility,
    link,
    title,
    key,
    sort,
    mapKey,
    width,
    type,
    imageSize,
    renderValue,
    filters,
    enabledFilters,
    canFilter,
    inlineEdit,
    form: formConfig,
    filterMultiple = false,
    filterTree
  }) {
    const { sort: currentSort, filter } = this.props;
    const filteredValue =
      type.canUseColumnFilter() && !isUndefined(filter[mapKey])
        ? filter[mapKey]
        : [];
    let renderValueFunc = type.renderValue;

    if (isFunction(renderValue)) {
      renderValueFunc = renderValue;
    } else if (isArray(filters) && type.canUseColumnFilter()) {
      renderValueFunc = v => {
        if (isArray(v)) {
          return v
            .map(item => {
              const filtered = find(filters, f => f.value === item);
              return filtered ? filtered.text : item;
            })
            .join('，');
        }
        const filtered = find(filters, f => f.value === v);
        return filtered ? filtered.text : v;
      };
    }
    if (visibility.table) {
      let render = v => v;

      if (link) {
        render = (value, record) => (
          <span>
            <RecordLink link={link} record={record}>
              {value}
            </RecordLink>
          </span>
        );
      } else if (type === ColumnTypes.image) {
        render = value => {
          const src = generateUpYunImageUrl(
            value,
            `/both/${imageSize || '100x100'}`
          );
          const style = width
            ? { width: isNumber(width) ? `${width}px` : width }
            : {};

          return <img alt="" src={src} style={style} />;
        };
      } else if (inlineEdit && type.canInlineEdit()) {
        render = (value, record = {}) => (
          <Input.TextArea
            key={value}
            disabled={
              formConfig && isFunction(formConfig.enable)
                ? !formConfig.enable(undefined, record)
                : false
            }
            placeholder={
              formConfig && formConfig.placeholder
                ? formConfig.placeholder
                : `请输入${title}`
            }
            autoComplete="off"
            defaultValue={value}
            onBlur={({
              relatedTarget,
              target: { value: editValue } = {}
            } = {}) => {
              if (formConfig && formConfig.rules) {
                const validator = new AsyncValidator({
                  [mapKey]: [
                    {
                      required: !formConfig.optional,
                      message: `${title}不能为空`,
                      whitespace: true
                    }
                  ].concat(formConfig.rules)
                });
                validator.validate({ [mapKey]: editValue }, errors => {
                  if (errors) {
                    message.error(errors[0].message);
                    if (relatedTarget && isFunction(relatedTarget.focus)) {
                      relatedTarget.focus();
                    }
                  } else {
                    this.editRecord({ ...record, [mapKey]: editValue });
                  }
                });
              } else {
                this.editRecord({ ...record, [mapKey]: editValue });
              }
            }}
          />
        );
      }

      const filterProps =
        canFilter &&
        !filterTree &&
        isArray(enabledFilters) &&
        enabledFilters.length > 0
          ? {
              filterMultiple,
              filtered: isArray(filteredValue)
                ? !!filteredValue.length
                : !isUndefined(filteredValue),
              filteredValue: isArray(filteredValue)
                ? filteredValue
                : [String(filteredValue)],
              filters: !type.canUseColumnFilter() ? [] : enabledFilters
            }
          : {};

      return (
        <Column
          {...filterProps}
          className={classNames(sort)}
          title={title}
          dataIndex={key}
          key={key}
          sorter={!!sort}
          width={width || ''}
          sortOrder={
            currentSort && startsWith(currentSort, `${mapKey} `)
              ? `${split(currentSort, ' ')[1]}end`
              : false
          }
          render={(value, record) =>
            render(renderValueFunc(value, record), record)
          }
        />
      );
    }

    return null;
  }

  renderSchema() {
    const { schema } = this.props;

    return schema.map(definition => this.renderColumn({ ...definition }));
  }

  renderCustomRowActions(record) {
    const {
      customRowActions,
      user,
      match: { params: matchParams }
    } = this.props;

    return customRowActions.map(
      ({ title, type, handler, enable, render, confirmModal, global }) => {
        if ((isFunction(enable) && !enable(record, user)) || global) {
          return null;
        }

        if (isFunction(render)) {
          return render(record, matchParams, this.fetch);
        }

        return (
          <Button
            key={title}
            type={type}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={
              confirmModal
                ? () =>
                    confirm({
                      ...confirmModal,
                      title: isFunction(confirmModal.title)
                        ? confirmModal.title(record)
                        : confirmModal.title || '',
                      content: isFunction(confirmModal.content)
                        ? confirmModal.content(record)
                        : confirmModal.content || '',
                      onOk: () => this.onCustomRowAction(record, handler)
                    })
                : () => this.onCustomRowAction(record, handler)
            }
          >
            {title}
          </Button>
        );
      }
    );
  }

  renderRowActions() {
    const {
      edit,
      remove,
      order,
      customRowActions,
      schema,
      updateModalFilters
    } = this.props;
    return edit || remove || customRowActions.length > 0 || order ? (
      <Column
        title="操作"
        key="action"
        render={(
          text,
          record // eslint-disable-line react/jsx-no-bind
        ) => (
          <div className="actions">
            {edit && (
              <RecordModal
                schema={schema}
                record={record}
                onOk={this.editRecord}
                updateModalFilters={updateModalFilters}
              >
                <Button type="primary" shape="circle" icon="edit" />
              </RecordModal>
            )}
            {remove && (
              <Popconfirm
                title="确认删除？"
                // eslint-disable-next-line react/jsx-no-bind
                onConfirm={() => this.onConfirmRemove(record)}
              >
                <Button type="danger" shape="circle" icon="delete" />
              </Popconfirm>
            )}
            {order && (
              <React.Fragment>
                <Button
                  shape="circle"
                  icon="up"
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={() => this.onOrderChange(record, -1)}
                />
                <Button
                  shape="circle"
                  icon="down"
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={() => this.onOrderChange(record, 1)}
                />
              </React.Fragment>
            )}
            {this.renderCustomRowActions(record)}
          </div>
        )}
      />
    ) : null;
  }

  renderSearchGroup() {
    const { inputSearch } = this.state;
    const { searchFields, search } = this.props;

    if (!searchFields || searchFields.length === 0) {
      return null;
    }

    return (
      <Group title="搜索">
        {chunk(searchFields, 6).map(definitions => (
          <Row gutter={20} key={join(map(definitions, ({ mapKey }) => mapKey))}>
            {definitions.map(definition => (
              <Col span={4} key={definition.mapKey}>
                <Search
                  defaultValue={search[definition.mapKey]}
                  placeholder={definition.title}
                  value={inputSearch[definition.mapKey]}
                  onSearch={value => this.onSearch(definition, value)}
                  onChange={e =>
                    this.setState({
                      inputSearch: { [definition.mapKey]: e.target.value }
                    })
                  }
                  style={{ width: '100%' }}
                  enterButton
                />
              </Col>
            ))}
          </Row>
        ))}
      </Group>
    );
  }

  renderFilterGroup() {
    const { filterInGroupSchemas } = this.props;
    const { filterGroup } = this.state;
    if (!filterInGroupSchemas || filterInGroupSchemas.length === 0) {
      return null;
    }

    return (
      <Group title="筛选">
        {filterInGroupSchemas.map(({ mapKey, type, title, ...definition }) => (
          <Row type="flex" align="middle" className="filter-row" key={mapKey}>
            <div className="filter-title">{`${title}：`}</div>
            <Col span={12}>
              {type.renderFilterItem({
                ...definition,
                value: filterGroup[mapKey],
                onChange: v => {
                  this.setState({
                    filterGroup: { ...filterGroup, [mapKey]: v }
                  });
                }
              })}
            </Col>
          </Row>
        ))}
        <Row key="filter-group-action-buttons">
          <Popconfirm title="确认重置？" onConfirm={this.onClickReset}>
            <Button type="danger">重置</Button>
          </Popconfirm>
          <Button
            type="primary"
            style={{ marginLeft: '.6rem' }}
            onClick={this.onClickQuery}
          >
            查询
          </Button>
        </Row>
      </Group>
    );
  }

  renderActionGroup() {
    let actions = [];
    const { selectedRows } = this.state;
    const hasSelected = selectedRows.length > 0;
    const {
      create,
      hasCreateNew,
      schema,
      customGlobalActions,
      customMultipleActions,
      customMultipleEdits,
      updateModalFilters,
      match: { params: matchParams }
    } = this.props;

    if (hasCreateNew) {
      actions.push({ createNew: true, title: 'createNew' });
    } else if (create) {
      actions.push({ create: true, title: 'create' });
    }

    actions = actions.concat(customGlobalActions).concat(customMultipleActions);

    if (actions.length === 0 && customMultipleEdits.length === 0) {
      return null;
    }

    return (
      <Group title="操作">
        {chunk(actions, 6).map(groupActions => (
          <Row gutter={20} key={join(map(groupActions, ({ title }) => title))}>
            {groupActions.map(
              (
                {
                  createNew,
                  create: crt,
                  global,
                  render,
                  title,
                  type,
                  handler,
                  multiple,
                  confirmModal,
                  enable
                },
                index
              ) => {
                let children;
                if (createNew) {
                  children = (
                    <Button className="add-button" type="primary">
                      <Link to={`${window.location.pathname}/new`}>新建</Link>
                    </Button>
                  );
                } else if (crt) {
                  children = (
                    <RecordModal
                      schema={schema}
                      record={{}}
                      onOk={this.editRecord}
                      updateModalFilters={updateModalFilters}
                    >
                      <Button className="add-button" type="primary">
                        添加
                      </Button>
                    </RecordModal>
                  );
                } else if (global && !multiple) {
                  if (isFunction(render)) {
                    children = render(matchParams, this.fetch);
                  } else {
                    children = (
                      <Button
                        type={type}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={() => this.onCustomGlobalAction(handler)}
                      >
                        {title}
                      </Button>
                    );
                  }
                } else if (multiple) {
                  if (isFunction(render)) {
                    children = render(matchParams, this.fetch, selectedRows);
                  } else {
                    children = (
                      <Button
                        type={type}
                        disabled={!hasSelected}
                        // eslint-disable-next-line react/jsx-no-bind
                        onClick={
                          confirmModal
                            ? () =>
                                confirm({
                                  ...confirmModal,
                                  title: isFunction(confirmModal.title)
                                    ? confirmModal.title(selectedRows)
                                    : confirmModal.title || '',
                                  content: isFunction(confirmModal.content)
                                    ? confirmModal.content(selectedRows)
                                    : confirmModal.content || '',
                                  onOk: () =>
                                    this.onCustomMultipleAction(handler, enable)
                                })
                            : () => this.onCustomMultipleAction(handler, enable)
                        }
                      >
                        {title}
                      </Button>
                    );
                  }
                }

                return (
                  <Col span={4} key={title || index}>
                    {children}
                  </Col>
                );
              }
            )}
            {customMultipleEdits.map(({ title, mapKey }, index) => (
              <Col span={4} key={title || index}>
                <RecordModal
                  schema={schema}
                  record={{}}
                  multipleKey={mapKey}
                  updateModalFilters={updateModalFilters}
                  onOk={data =>
                    this.onCustomMultipleAction(record =>
                      this.editRecord({ ...record, ...data })
                    )
                  }
                >
                  <Button type="primary" disabled={!hasSelected}>
                    {title}
                  </Button>
                </RecordModal>
              </Col>
            ))}
          </Row>
        ))}
      </Group>
    );
  }

  renderContent() {
    const { dataSource, selectedRowKeys } = this.state;
    const {
      total,
      page,
      pagesize,
      primaryKey,
      customMultipleActions,
      customMultipleEdits,
      isLoading
    } = this.props;

    const rowSelection =
      customMultipleActions.length > 0 || customMultipleEdits.length > 0
        ? {
            selectedRowKeys,
            onChange: this.onSelectChange
          }
        : null;

    return (
      <React.Fragment>
        {this.renderSearchGroup()}
        {this.renderFilterGroup()}
        {this.renderActionGroup()}
        <Group title="详情">
          <Table
            bordered
            loading={isLoading}
            dataSource={dataSource}
            rowKey={primaryKey}
            rowSelection={rowSelection}
            pagination={false}
            onChange={this.onChange}
          >
            {this.renderSchema()}
            {this.renderRowActions()}
          </Table>
          <Pagination
            showQuickJumper
            showSizeChanger
            showTotal={RecordsPage.showTotal}
            className="ant-table-pagination"
            total={total}
            current={page}
            pagesize={pagesize}
            onChange={this.onChangePage}
            onShowSizeChange={this.onChangePage}
          />
        </Group>
      </React.Fragment>
    );
  }

  render() {
    const { component: Component, error, inline } = this.props;
    return (
      <Page isError={!!error} errorMessage={error ? error.message : ''}>
        {Component ? (
          <Card className={classNames('content-card', inline ? 'inline' : '')}>
            <Component />
          </Card>
        ) : null}
        <Card className={classNames('content-card', inline ? 'inline' : '')}>
          {this.renderContent()}
        </Card>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(RecordsPage);

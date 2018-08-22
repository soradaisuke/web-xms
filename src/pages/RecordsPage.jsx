import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { withRouter } from 'react-router';
import { routerRedux } from 'dva/router';
import { parse } from 'query-string';
import {
  Table, Pagination, Button, Popconfirm, message,
} from 'antd';
import { connect } from 'dva';
import { toInteger } from 'lodash';
import RecordLink from '../components/RecordLink';
import generateUri from '../utils/generateUri';
import Page from './Page';
import './RecordsPage.less';

const { Column } = Table;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    changePage: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      link: PropTypes.oneOfType([
        PropTypes.shape({
          path: PropTypes.string,
          key: PropTypes.string,
        }),
        PropTypes.bool,
      ]),
      visibility: PropTypes.shape({
        tabel: PropTypes.bool,
      }),
    })).isRequired,
    changeSort: PropTypes.func,
    create: PropTypes.func,
    Modal: PropTypes.func,
    order: PropTypes.func,
    page: PropTypes.number,
    pagesize: PropTypes.number,
    edit: PropTypes.func,
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    remove: PropTypes.func,
    renderAction: PropTypes.func,
    sort: PropTypes.shape({
      key: PropTypes.string,
      order: PropTypes.oneOf(['asc', 'desc']),
    }),
    total: PropTypes.number,
  };

  static defaultProps = {
    create: null,
    changeSort: null,
    edit: null,
    remove: null,
    renderAction: null,
    records: Immutable.List(),
    Modal: null,
    order: null,
    page: 1,
    pagesize: 10,
    sort: null,
    total: 0,
  };

  state = {
    isError: false,
    isLoading: true,
    records: Immutable.List(),
    dataSource: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.records !== nextProps.records) {
      return { records: nextProps.records, dataSource: nextProps.records.toJS() };
    }

    return null;
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    const { pagesize, page } = this.props;
    if (prevProps.pagesize !== pagesize || prevProps.page !== page) {
      this.fetch();
    }
  }

  onChangePage = (page) => {
    const { changePage, pagesize } = this.props;
    changePage({ page, pagesize });
  }

  onConfirmRemove = async (record) => {
    const { remove } = this.props;
    const hide = message.loading('正在删除……', 0);
    try {
      await remove(record.id);
      hide();
      await this.fetch();
    } catch (e) {
      hide();
      message.error(e.message);
    }
  }

  onOrderChange = (body, diff) => {
    this.editRecord({ ...body, pos: body.pos + diff });
  }

  onChange = async (pagination, filters, sorter) => {
    const { changeSort } = this.props;
    if (changeSort && sorter && sorter.columnKey && sorter.order) {
      await changeSort({ key: sorter.columnKey, order: sorter.order.replace('end', '') });
      await this.fetch();
    }
  }

  editRecord = async (body) => {
    const { edit, create } = this.props;
    const hide = message.loading('正在保存……', 0);
    try {
      if (body.id) {
        await edit(body);
      } else {
        await create(body);
      }
      hide();
      await this.fetch();
    } catch (e) {
      hide();
      message.error(e.message);
    }
  }

  async fetch() {
    const {
      fetch, page, pagesize, match: { params },
    } = this.props;
    this.setState({
      isLoading: true,
    });
    try {
      await fetch({ page, pagesize, params });
      this.setState({
        isError: false,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isError: true,
        isLoading: false,
      });
    }
  }

  renderColumn({
    visibility, link, title, key, sort,
  }) {
    const { sort: currentSort } = this.props;
    if (visibility.tabel) {
      return (
        <Column
          title={title}
          dataIndex={key}
          key={key}
          sorter={!!sort}
          sortOrder={currentSort && currentSort.key === key ? `${currentSort.order}end` : false}
          render={link ? (text, record) => ( // eslint-disable-line react/jsx-no-bind
            <span>
              <RecordLink link={link} record={record}>
                {text}
              </RecordLink>
            </span>
          ) : null}
        />
      );
    }

    return null;
  }

  renderSchema() {
    const { schema } = this.props;

    return schema.map(definition => this.renderColumn({ ...definition }));
  }

  renderContent() {
    const { isLoading, dataSource } = this.state;
    const {
      Modal, create, edit, remove, order, renderAction, total, page, pagesize, schema,
    } = this.props;
    return (
      <React.Fragment>
        {
          Modal && create && (
            <Modal schema={schema} record={{}} onOk={this.editRecord}>
              <Button className="add-button" type="primary">添加</Button>
            </Modal>
          )
        }
        <Table
          loading={isLoading}
          dataSource={dataSource}
          rowKey={record => record.id} // eslint-disable-line react/jsx-no-bind
          pagination={false}
          onChange={this.onChange}
        >
          {this.renderSchema()}
          {
            (edit || remove || renderAction) && (
              <Column
                title="操作"
                key="action"
                render={(text, record) => ( // eslint-disable-line react/jsx-no-bind
                  <span>
                    {
                      Modal && edit && (
                        <Modal record={record} onOk={this.editRecord}>
                          <Button
                            className="action-button"
                            type="primary"
                            shape="circle"
                            icon="edit"
                          />
                        </Modal>
                      )
                    }
                    {
                      remove && (
                        <Popconfirm
                          title="确认删除？"
                          // eslint-disable-next-line react/jsx-no-bind
                          onConfirm={() => this.onConfirmRemove(record)}
                        >
                          <Button
                            className="action-button"
                            type="danger"
                            shape="circle"
                            icon="delete"
                          />
                        </Popconfirm>
                      )
                    }
                    {
                      order && (
                        <React.Fragment>
                          <Button
                            className="action-button"
                            shape="circle"
                            icon="up"
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={() => this.onOrderChange(record, -1)}
                          />
                          <Button
                            className="action-button"
                            shape="circle"
                            icon="down"
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={() => this.onOrderChange(record, 1)}
                          />
                        </React.Fragment>
                      )
                    }
                  </span>
                )}
              />
            )
          }
        </Table>
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={page}
          pagesize={pagesize}
          onChange={this.onChangePage}
        />
      </React.Fragment>
    );
  }

  render() {
    const { isError } = this.state;
    return (
      <Page isError={isError}>
        {this.renderContent()}
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const queries = parse(state.routing.location.search);
  const props = {};
  if (queries.page) {
    props.page = toInteger(queries.page);
  }
  if (queries.pagesize) {
    props.pagesize = toInteger(queries.pagesize);
  }
  return props;
};

const mapDiseditToProps = disedit => ({
  async changePage({ page, pagesize }) {
    const uri = generateUri(window.location.href, { page, pagesize });
    return disedit(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
  },
});

export default withRouter(connect(mapStateToProps, mapDiseditToProps)(RecordsPage));

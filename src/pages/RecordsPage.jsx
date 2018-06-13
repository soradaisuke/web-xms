import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { routerRedux } from 'dva/router';
import { parse } from 'query-string';
import { Table, Pagination, Button, Popconfirm, message } from 'antd';
import { connect } from 'dva';
import { toInteger } from 'lodash';
import generateUri from '../utils/generateUri';
import Page from './Page';

const { Column } = Table;

class RecordsPage extends React.PureComponent {
  static displayName = 'RecordsPage';

  static propTypes = {
    changePage: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired,
    schema: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      link: PropTypes.shape({
        path: PropTypes.string,
        key: PropTypes.string,
      }),
      show: PropTypes.bool,
    })).isRequired,
    create: PropTypes.func,
    Modal: PropTypes.func,
    pageNum: PropTypes.number,
    pageSize: PropTypes.number,
    patch: PropTypes.func,
    records: PropTypes.instanceOf(Immutable.List), // eslint-disable-line react/no-unused-prop-types
    remove: PropTypes.func,
    renderAction: PropTypes.func,
    total: PropTypes.number,
  };

  static defaultProps = {
    create: null,
    patch: null,
    remove: null,
    renderAction: null,
    records: Immutable.List(),
    Modal: null,
    pageNum: 1,
    pageSize: 10,
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
    if (prevProps.pageSize !== this.props.pageSize || prevProps.pageNum !== this.props.pageNum) {
      this.fetch();
    }
  }

  onChangePage = (pageNum) => {
    this.props.changePage({ pageNum, pageSize: this.props.pageSize });
  }

  onConfirmRemove = async (record) => {
    const hide = message.loading('正在删除……', 0);
    try {
      await this.props.remove(record.id);
      hide();
      await this.props.fetch();
    } catch (e) {
      hide();
      message.error(e.message);
    }
  }

  editRecord = async (id, body) => {
    const hide = message.loading('正在保存……', 0);
    try {
      if (id) {
        await this.props.patch({ id, body });
      } else {
        await this.props.create({ body });
      }
      hide();
      await this.props.fetch();
    } catch (e) {
      hide();
      message.error(e.message);
    }
  }

  async fetch() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.props.fetch({ pageNum: this.props.pageNum, pageSize: this.props.pageSize });
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

  renderSchema() {
    return this.props.schema.map(({
      key, title, link, show,
    }) => {
      if (show) {
        if (link) {
          return (
            <Column
              title={title}
              dataIndex={key}
              key={key}
              render={(text, record) => ( // eslint-disable-line react/jsx-no-bind
                <span>
                  <Link to={`${link.path || window.location.pathname}/${record[link.key || key]}`}>
                    {text}
                  </Link>
                </span>
              )}
            />
          );
        }
        return (
          <Column
            title={title}
            dataIndex={key}
            key={key}
          />
        );
      }
      return null;
    });
  }

  renderContent() {
    const {
      Modal, create, patch, remove, renderAction,
    } = this.props;
    return (
      <React.Fragment>
        {
          Modal && create && (
            <Modal record={{}} onOk={this.editRecord}>
              <Button type="primary">添加</Button>
            </Modal>
          )
        }
        <Table
          loading={this.state.isLoading}
          dataSource={this.state.dataSource}
          rowKey={record => record.id} // eslint-disable-line react/jsx-no-bind
          pagination={false}
        >
          {this.renderSchema()}
          {
            (patch || remove || renderAction) && (
              <Column
                title="操作"
                key="action"
                render={(text, record) => ( // eslint-disable-line react/jsx-no-bind
                  <span>
                    {
                      Modal && patch && (
                        <Modal record={record} onOk={this.editRecord}>
                          <Button type="primary">编辑</Button>
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
                          <Button type="primary">删除</Button>
                        </Popconfirm>
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
          total={this.props.total}
          current={this.props.pageNum}
          pageSize={this.props.pageSize}
          onChange={this.onChangePage}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <Page isError={this.state.isError}>
        {this.renderContent()}
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  const queries = parse(state.routing.location.search);
  const props = {};
  if (queries.pageNum) {
    props.pageNum = toInteger(queries.pageNum);
  }
  if (queries.pageSize) {
    props.pageSize = toInteger(queries.pageSize);
  }
  return props;
};

const mapDispatchToProps = dispatch => ({
  async changePage({ pageNum, pageSize }) {
    const uri = generateUri(window.location.href, { pageNum, pageSize });
    return dispatch(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage);

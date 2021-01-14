import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Card, Collapse, Descriptions } from 'antd';
import { map, reduce } from 'lodash';
import classNames from 'classnames';
import md5 from 'md5';
import Page from './Page';
import Action from '../components/Action';
import EditableDescriptionCell from '../components/Editable/EditableDescriptionCell';
import EditableDescriptions from '../components/Editable/EditableDescriptions';
import usePageConfig from '../hooks/usePageConfig';
import useUser from '../hooks/useUser';
import usePageData from '../hooks/usePageData';

const { TabPane } = Tabs;
const { Panel } = Collapse;

function RecordPage({ isLoading, routes: r }) {
  const pageData = usePageData();
  const { record, tab } = pageData;
  const {
    component: Component,
    inline,
    pageProps,
    layout,
    table,
    fetch,
    onChangeTab,
    descriptionsProps,
  } = usePageConfig();
  const user = useUser();
  const columns = useMemo(
    () =>
      table
        .getColumns()
        .filter((column) => column.canShowInDescription({ user, record })),
    [record, table, user]
  );
  const actions = useMemo(() => table.getActions(), [table]);
  const routes = useMemo(
    () =>
      map(r, (route) => ({
        ...route,
        tabKey: md5(route.path),
      })),
    [r]
  );

  const renderRouteChunk = useCallback(
    (chunk) => {
      if (chunk && chunk.length) {
        const chunkLayout = chunk[0].layout || layout;
        const activeKey = tab || chunk[0].tabKey;

        switch (chunkLayout) {
          case 'collapse':
            return (
              <Card
                key={chunk[0].path}
                className={classNames('content-card', inline ? 'inline' : '')}
              >
                <Collapse>
                  {map(chunk, ({ component: Com, path, title = '' }) => (
                    <Panel header={title} key={path}>
                      <Com inline />
                    </Panel>
                  ))}
                </Collapse>
              </Card>
            );
          case 'tab':
            return (
              <Card
                key={chunk[0].path}
                className={classNames('content-card', inline ? 'inline' : '')}
              >
                <Tabs activeKey={activeKey} onChange={onChangeTab}>
                  {map(
                    chunk,
                    ({
                      reloadOnVisible,
                      component: Com,
                      title = '',
                      tabKey,
                    }) => (
                      <TabPane tab={title} key={tabKey}>
                        {reloadOnVisible && activeKey !== tabKey ? null : (
                          <Com inline />
                        )}
                      </TabPane>
                    )
                  )}
                </Tabs>
              </Card>
            );
          case 'card':
          default:
            return map(chunk, ({ component: Com, path, title = '' }) => (
              <Card
                key={path}
                title={title}
                className={classNames('content-card', inline ? 'inline' : '')}
              >
                <Com inline />
              </Card>
            ));
        }
      }

      return null;
    },
    [layout, inline, tab, onChangeTab]
  );

  const actionsNode = useMemo(() => {
    if (actions.size === 0) {
      return null;
    }

    return (
      <Descriptions.Item label="操作">
        {actions.map((action) => (
          <Action
            key={action.getKey()}
            action={action}
            record={record}
            reload={fetch}
          />
        ))}
      </Descriptions.Item>
    );
  }, [actions, record, fetch]);

  const contentNode = useMemo(() => {
    if (!record || columns.size === 0) {
      return null;
    }

    const children = (
      <EditableDescriptions column={2} {...descriptionsProps}>
        {columns.map((column) => (
          <Descriptions.Item
            {...column.getDescriptionItemProps()}
            style={{ whiteSpace: 'pre-wrap' }}
            label={column.getTitle()}
            key={column.getKey()}
          >
            <EditableDescriptionCell
              record={record}
              column={column}
              reload={fetch}
            />
          </Descriptions.Item>
        ))}
        {actionsNode}
      </EditableDescriptions>
    );

    return inline ? (
      children
    ) : (
      <Card className={classNames('content-card', inline ? 'inline' : '')}>
        {children}
      </Card>
    );
  }, [record, columns, descriptionsProps, actionsNode, inline, fetch]);

  const routesNode = useMemo(() => {
    if (routes && routes.length) {
      return map(
        reduce(
          routes,
          (result, route) => {
            if (result.length === 0) {
              result.push([route]);
            } else {
              const routeLayout = route.layout || layout;
              const last = result[result.length - 1];
              const lastLayout = last[0].layout || layout;
              if (routeLayout === lastLayout) {
                last.push(route);
              } else {
                result.push([route]);
              }
            }
            return result;
          },
          []
        ),
        (chunk) => renderRouteChunk(chunk)
      );
    }

    return null;
  }, [layout, routes, renderRouteChunk]);

  useEffect(() => {
    if (columns.size > 0) {
      fetch();
    }
  }, [columns.size, fetch]);

  return (
    <Page {...pageProps} isLoading={isLoading}>
      {Component ? (
        <Card className={classNames('content-card', inline ? 'inline' : '')}>
          <Component />
        </Card>
      ) : null}
      {contentNode}
      {routesNode}
    </Page>
  );
}

RecordPage.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.bode,
    })
  ),
  isLoading: PropTypes.bool,
};

RecordPage.defaultProps = {
  routes: [],
  isLoading: false,
};

export default RecordPage;

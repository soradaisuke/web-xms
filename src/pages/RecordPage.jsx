import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Card, Collapse, Descriptions } from 'antd';
import { map, reduce } from 'lodash';
import classNames from 'classnames';
import Page from './Page';
import Action from '../components/Action';
import EditableDescriptionCell from '../components/Editable/EditableDescriptionCell';
import EditableDescriptions from '../components/Editable/EditableDescriptions';
import usePageConfig from '../hooks/usePageConfig';
import useUser from '../hooks/useUser';

const { TabPane } = Tabs;
const { Panel } = Collapse;

function RecordPage({ isLoading, record, routes }) {
  const {
    component: Component,
    inline,
    layout,
    table,
    fetch,
    descriptionsProps
  } = usePageConfig();
  const user = useUser();
  const columns = useMemo(
    () =>
      table
        .getColumns()
        .filter(column => column.canShowInDescription({ user, record })),
    [record, table, user]
  );
  const actions = useMemo(
    () => table.getActions().filter(action => action.isVisible(user)),
    [user, table]
  );

  const renderRouteChunk = useCallback(
    chunk => {
      if (chunk && chunk.length) {
        const chunkLayout = chunk[0].layout || layout;

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
                <Tabs>
                  {map(chunk, ({ component: Com, path, title = '' }) => (
                    <TabPane tab={title} key={path}>
                      <Com inline />
                    </TabPane>
                  ))}
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
    [layout, inline]
  );

  const actionsNode = useMemo(() => {
    if (actions.size === 0) {
      return null;
    }

    return (
      <Descriptions.Item label="操作">
        {actions.map(action => (
          <Action
            key={action.getTitle()}
            action={action}
            record={record}
            onComplete={fetch}
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
      <EditableDescriptions {...descriptionsProps}>
        {columns.map(column => (
          <Descriptions.Item
            {...column.getDescriptionItemProps()}
            label={column.getTitle()}
            key={column.getKey()}
          >
            <EditableDescriptionCell
              record={record}
              column={column}
              onComplete={fetch}
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
        chunk => renderRouteChunk(chunk)
      );
    }

    return null;
  }, [layout, routes, renderRouteChunk]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Page isLoading={isLoading} showWatermark={!inline}>
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
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      component: PropTypes.bode
    })
  ),
  isLoading: PropTypes.bool
};

RecordPage.defaultProps = {
  routes: [],
  record: null,
  isLoading: false
};

export default RecordPage;

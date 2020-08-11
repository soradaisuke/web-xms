import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { filter } from 'lodash/fp';
import { router, useLocation, useHistory } from 'dva';
import { Menu } from 'antd';
import { forEach } from 'lodash';

const { Link, matchPath } = router;
const { SubMenu } = Menu;

const validMenues = filter(({ title, inline, hideInMenu }) => !!title && !inline && !hideInMenu);

function findNextKey({ pathname, routes, selectedKeys, openKeys }) {
  forEach(routes, (route) => {
    if (matchPath(pathname, { path: route.path })) {
      selectedKeys.push(route.path);

      const subMenues = validMenues(route.routes);
      if (subMenues.length > 0) {
        openKeys.push(route.path);

        findNextKey({ pathname, routes: subMenues, selectedKeys, openKeys });
      }
    }
  });
}

function renderMenus(routes) {
  return validMenues(routes).map(
    ({ path, title, icon, routes: childRoutes }) => {
      const subRoutes = validMenues(childRoutes);

      if (subRoutes.length > 0) {
        return (
          <SubMenu key={path} title={title} icon={icon}>
            {renderMenus(subRoutes)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={path} icon={icon}>
          <Link to={path}>{title}</Link>
        </Menu.Item>
      );
    }
  );
}

function NavMenu({ routes }) {
  const location = useLocation();
  const history = useHistory();
  const { pathname, state } = location;

  useEffect(() => {
    if (state?.unmatch) {
      history.replace(pathname);
    }
  }, [state, history, pathname]);

  const { selectedKeys, openKeys } = useMemo(() => {
    // eslint-disable-next-line no-shadow
    const selectedKeys = [];
    // eslint-disable-next-line no-shadow
    const openKeys = [];
    findNextKey({ pathname, routes, selectedKeys, openKeys });

    return { selectedKeys, openKeys };
  }, [pathname, routes]);

  if (state?.unmatch) return null;

  return (
    <Menu
      className="xms-menu"
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={openKeys}
    >
      {renderMenus(routes)}
    </Menu>
  );
}

NavMenu.propTypes = {
  routes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default React.memo(NavMenu);

import { isArray, find, isFunction, isString } from 'lodash';

export default function hasPermission({ configPermissions, userPermissions }) {
  if (!configPermissions) {
    return true;
  }

  if (!userPermissions || !userPermissions.size) {
    return false;
  }

  const permissions = isString(configPermissions)
    ? [configPermissions]
    : configPermissions;

  if (
    (isFunction(permissions) && !permissions(userPermissions)) ||
    (isArray(permissions) && !find(permissions, (p) => userPermissions?.get(p)))
  ) {
    return false;
  }

  return true;
}

import React from 'react';
import { isArray, map, isBoolean, isNumber } from 'lodash';

export function formatTreeSelectValue(value) {
  return isBoolean(value) || isNumber(value) ? String(value) : value;
}

export default function generateTreeData(filters) {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text, children, ...item }) => ({
    value: formatTreeSelectValue(value),
    key: value,
    title: <div style={{ width: '100%' }}>{text}</div>,
    children: generateTreeData(children),
    ...item
  }));
}

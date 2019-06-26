import React from 'react';
import { isNumber } from 'lodash';
import { generateUpYunImageUrl } from '@qt/web-core';
import StringColumn from './StringColumn';

export default class ImageColumn extends StringColumn {
  renderInTableValueDefault({ value }) {
    const src = generateUpYunImageUrl(value);
    const width = this.getTableWidth();
    const style = width
      ? { width: isNumber(width) ? `${width}px` : width }
      : {};

    return <img alt="" src={src} style={style} />;
  }
}

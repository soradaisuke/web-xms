import React from 'react';
import { isNumber } from 'lodash';
import { generateUpYunImageUrl } from '@qt/web-core';
import UploadImage from '../components/FormItems/UploadImage';
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

  // eslint-disable-next-line class-methods-use-this
  getFormFiledValuePropName() {
    return 'url';
  }

  renderInFormItem({ user }) {
    return (
      <UploadImage
        ssoToken={user ? user.get('sso_token') : ''}
        {...this.getFormComponentProps().toJS()}
      />
    );
  }
}

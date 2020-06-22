import React from 'react';
import { isNumber } from 'lodash';
import { generateUpYunImageUrl } from '@qt/web-core';
import ZoomImg from '../components/ZoomImg';
import UploadImage from '../components/FormItems/UploadImage';
import StringColumn from './StringColumn';

export default class ImageColumn extends StringColumn {
  renderInTableValueDefault({ value }) {
    const src = generateUpYunImageUrl(value);
    const width = this.getTableWidth();
    return <ZoomImg src={src} thumbnailWidth={width} />;
  }

  renderInDescriptionDefault({ value }) {
    const src = generateUpYunImageUrl(value);
    const width = this.getDescriptionWidth();
    const style = width
      ? { width: isNumber(width) ? `${width - 48}px` : width }
      : {};

    return <img alt="" src={src} style={style} />;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormFiledValuePropName() {
    return 'url';
  }

  renderInFormItem({
    user,
    record,
    value,
    values,
    isEdit,
    formComponentProps = {}
  }) {
    return (
      <UploadImage
        ssoToken={user ? user.get('sso_token') : ''}
        {...this.getFormComponentProps({
          isEdit,
          user,
          record,
          value,
          values
        })}
        {...formComponentProps}
      />
    );
  }
}

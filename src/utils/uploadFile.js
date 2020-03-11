import { split, includes, drop, join } from 'lodash';
import shortid from 'shortid';
import { isProduction } from '@qt/env';
import { uploadFile, uploadImage } from '@qt/web-core';
import OSS from 'ali-oss';
import request from '../services/request';

const uploadHost = `//cloud-upload.${
  isProduction ? '' : 'staging.'
}qingtingfm.com`;

function generateFileName(file) {
  const names = split(file.name, '.');
  let postfix;
  if (names.length === 1) {
    [, postfix] = file.type.split('/');
  } else {
    postfix = join(drop(names), '.');
  }

  return `${Date.now()}_${shortid.generate()}.${postfix}`;
}

function uploadToAliyun(file, { fileName, ssoToken }) {
  const finalFileName = fileName || generateFileName(file);

  return request
    .post(`${uploadHost}/intra/v1/sts_token`, {
      params: {
        app_id: 'tuboshudev',
        sso_token: ssoToken
      },
      body: {
        dir: split(window.location.host, '.')[0]
      }
    })
    .then(
      async ({
        bucket_region: region,
        access_key_id: accessKeyId,
        access_key_secret: accessKeySecret,
        bucket,
        security_token: stsToken,
        resource,
        cdn_domain: domain
      }) => {
        const client = new OSS({
          endpoint: `https://oss-${region}.aliyuncs.com`,
          accessKeyId,
          accessKeySecret,
          bucket,
          stsToken
        });
        await client.put(`/${resource}/${finalFileName}`, file);
        return `https://${domain}/${resource}/${finalFileName}`;
      }
    );
}

export function wrappedUploadFile(file, { fileName, ssoToken }) {
  if (includes(window.location.host, 'tuboshu')) {
    return uploadToAliyun(file, { fileName, ssoToken });
  }
  return uploadFile(file, { fileName, ssoToken });
}

export function wrappedUploadImage(
  file,
  { ssoToken, bucket, upYunSyncPreprocessor, deviceId }
) {
  if (includes(window.location.host, 'tuboshu')) {
    return uploadToAliyun(file, { ssoToken });
  }
  return uploadImage(file, {
    ssoToken,
    bucket,
    upYunSyncPreprocessor,
    deviceId
  });
}

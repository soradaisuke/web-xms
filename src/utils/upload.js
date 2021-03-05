import { split, drop, join } from 'lodash';
import shortid from 'shortid';
import { isProduction } from '@qt/env';
import { uploadToAliyun, uploadToUpyun } from '@qt/web-common';
import OSS from 'ali-oss';
import request from '../services/request';
import isTuboshu from './isTuboshu';
import isYouzi from './isYouzi';

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

function uploadToTuboshuAliyun(file, { fileName, ssoToken }) {
  const finalFileName = fileName || generateFileName(file);

  return request
    .post(`${uploadHost}/intra/v1/sts_token`, {
      params: {
        // eslint-disable-next-line no-nested-ternary
        app_id: isProduction
          ? isYouzi
            ? 'youzifm'
            : 'tuboshu'
          : isYouzi
          ? 'youzifm'
          : 'tuboshudev',
        sso_token: ssoToken,
      },
      body: {
        dir: split(window.location.host, '.')[0],
      },
    })
    .then(
      async ({
        bucket_region: region,
        access_key_id: accessKeyId,
        access_key_secret: accessKeySecret,
        bucket,
        security_token: stsToken,
        resource,
        cdn_domain: domain,
      }) => {
        const client = new OSS({
          endpoint: `https://oss-${region}.aliyuncs.com`,
          accessKeyId,
          accessKeySecret,
          bucket,
          stsToken,
        });
        await client.put(`/${resource}/${finalFileName}`, file);
        return `https://${domain}/${resource}/${finalFileName}`;
      }
    );
}

export function uploadFile(file, { fileName, ssoToken, platform = 'aliyun' }) {
  if (isTuboshu || isYouzi) {
    return uploadToTuboshuAliyun(file, { fileName, ssoToken });
  }
  if (platform === 'upyun') {
    return uploadToUpyun(file, { fileName, ssoToken, removeEXIF: false });
  }
  return uploadToAliyun(file, { fileName, ssoToken });
}

export function uploadImage(
  file,
  { fileName, ssoToken, bucket, upYunSyncPreprocessor, deviceId }
) {
  if (isTuboshu || isYouzi) {
    return uploadToTuboshuAliyun(file, { fileName, ssoToken });
  }
  return uploadToUpyun(file, {
    fileName,
    ssoToken,
    bucket,
    upYunSyncPreprocessor,
    deviceId,
  });
}

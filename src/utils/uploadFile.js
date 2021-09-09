import { uploadFile, uploadImage, uploadToTbsAliyun } from '@qt/web-common';
import isTuboshu from './isTuboshu';

export function wrappedUploadFile(file, { fileName, ssoToken }) {
  if (isTuboshu) {
    return uploadToTbsAliyun(file, { fileName, ssoToken });
  }
  return uploadFile(file, { fileName, ssoToken });
}

export function wrappedUploadImage(
  file,
  { ssoToken, bucket, upYunSyncPreprocessor, deviceId }
) {
  if (isTuboshu) {
    return uploadToTbsAliyun(file, { ssoToken });
  }
  return uploadImage(file, {
    ssoToken,
    bucket,
    upYunSyncPreprocessor,
    deviceId
  });
}

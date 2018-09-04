import { curry } from 'lodash/fp';
import { includes } from 'lodash';

// addParamsForUpYunImage :: String -> String -> String
export default curry((postfix, url) => {
  if (url && postfix && (includes(url, 'pic.qingting.fm') || includes(url, 'sss.qingting.fm'))) {
    return `${url.split('!')[0]}!${postfix}`;
  }

  return url;
});

import { forEach, flow } from 'lodash';
import { replace } from 'lodash/fp';

const translateSlashes = replace(/\//g, '{slashes}');
const translatePercent = replace(/%/g, '{percent}');

function translatePatterns(text) {
  let result = text;
  const match = text.match(/\{(.*)\}/g);
  if (match) {
    forEach(match, (pattern) => {
      const value = pattern.substring(1, pattern.length - 1);
      result = result.replace(pattern, translateSlashes(value));
    });
  }

  return result;
}

export default flow(translatePatterns, translatePercent);

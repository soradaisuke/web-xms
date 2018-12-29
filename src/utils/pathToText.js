import { flow } from 'lodash';
import { replace } from 'lodash/fp';

export default flow(
  replace(/\{slashes\}/g, '/'),
  replace(/\{percent\}/g, '%'),
  replace(/\{hash\}/g, '#'),
);

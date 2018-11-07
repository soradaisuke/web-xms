import { flow } from 'lodash';
import { replace } from 'lodash/fp';

export default flow(replace('{slashes}', '/'), replace('{percent}', '%'));

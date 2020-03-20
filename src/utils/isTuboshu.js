import { includes } from 'lodash';

const isTuboshu = includes(window.location.host, 'tuboshu');

export default isTuboshu;

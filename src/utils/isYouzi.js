import { includes } from 'lodash';

const isYouzi = includes(window.location.host, 'youzi');

export default isYouzi;

import { replace } from 'lodash/fp';

// removeProtocol :: String -> String
export default replace(/https?:\/\//, '//');

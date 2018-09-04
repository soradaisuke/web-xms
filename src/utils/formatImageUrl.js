import { flow } from 'lodash/fp';
import removeProtocol from './removeProtocol';
import addParamsForUpYunImage from './addParamsForUpYunImage';

// formatImageUrl :: (String, String) -> String
export default flow(addParamsForUpYunImage, removeProtocol);

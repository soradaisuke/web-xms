import { isProduction } from '@qt/env';

const TOKEN_KEY = isProduction ? 'prod_sso_token' : 'stg_sso_token';

export default {
  TOKEN_KEY
};

export { TOKEN_KEY };

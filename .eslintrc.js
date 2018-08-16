module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  rules: {
  },
  env: {
    browser: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};
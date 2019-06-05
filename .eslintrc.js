module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    // 以下可按需添加
    'prettier/babel',
    'prettier/react',
    'prettier/standard',
  ],
  env: {
    browser: true
  },
};
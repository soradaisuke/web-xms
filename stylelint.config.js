module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['first-child'],
      },
    ],
  },
};

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['compat', 'prefer-object-spread'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          './webpack.config.js',
          './postcss.config.js',
        ],
      },
    ],
    'prefer-promise-reject-errors': ['off'],
    'prefer-destructuring': ['off'],
    'react/jsx-no-bind': ['error', {
      ignoreRefs: false,
      allowArrowFunctions: false,
      allowFunctions: false,
      allowBind: false,
    }],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-key': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/default-props-match-prop-types': ['error', {
      allowRequiredDefaults: false,
    }],
    'react/sort-prop-types': ['error', {
      ignoreCase: true,
      callbacksLast: true,
      requiredFirst: true,
    }],
    'react/jsx-sort-props': ['error', {
      ignoreCase: true,
      callbacksLast: true,
      shorthandFirst: true,
      shorthandLast: false,
      noSortAlphabetically: true,
      reservedFirst: false,
    }],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/interactive-supports-focus': ['off'],
    'jsx-a11y/anchor-is-valid': [ 'error', {
      'components': [ 'Link' ],
      'specialLink': [ 'to' ]
    }],
    'compat/compat': 'error',
    'prefer-object-spread/prefer-object-spread': 'error',
  },
  env: {
    browser: true
  },
  settings: {
    polyfills: [
      'fetch',
      'promises',
    ],
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};
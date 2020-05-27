module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    api: true,
  },
  rules: {
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
  },
};

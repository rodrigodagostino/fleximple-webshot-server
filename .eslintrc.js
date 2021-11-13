module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    window: true,
    document: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
  },
  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'brace-style': [ 'error', '1tbs' ],
    camelcase: [
      'error',
      {
        properties: 'never',
      },
    ],
    'comma-dangle': [ 'error', 'always-multiline' ],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': [ 'error', 'always' ],
    'func-call-spacing': 'error',
    indent: [ 'error', 2 ],
    'key-spacing': [ 'error', { afterColon: true } ],
    'max-len': [ 'error', { code: 80 } ],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-redeclare': 'error',
    'no-useless-return': 'error',
    'no-whitespace-before-property': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    'quote-props': [ 'error', 'as-needed' ],
    semi: [ 'error', 'never' ],
    'semi-spacing': 'error',
    'space-before-blocks': [ 'error', 'always' ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': [ 'error', 'always', { exceptions: [ '{}' ] } ],
    'space-unary-ops': [
      'error',
      {
        words: true,
        nonwords: false,
        // overrides: {
        // 	'!': true,
        // },
      },
    ],
    'template-curly-spacing': [ 'error', 'always' ],
  },
}

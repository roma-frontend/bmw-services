module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  rules: {
    'react/jsx-no-duplicate-props': 'off',
    'react/prop-types': 'off',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'semi': 'off',
    'quotes': 'off',
    'indent': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off'
  }
};
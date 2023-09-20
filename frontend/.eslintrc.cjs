module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/no-children-prop': 'error',
    'react/prop-types': 'off',
    'react/self-closing-comp': ["error", { "component": true, "html": true }],
    'react/jsx-indent': [2, 2],
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'quotes': ["error", "single"],
    'semi': 'error',
    'no-console': 'error',
    'arrow-body-style': ["error", "as-needed"]
  },
};

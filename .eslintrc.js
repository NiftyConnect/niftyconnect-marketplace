module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-hooks', 'unused-imports'],
  rules: {
    'no-console': ['off'],
    'import/named': ['off'],
    'import/order': ['off'],
    'import/no-default-export': 'off',
    'import/no-internal-modules': [
      'error',
      {
        allow: ['**/components/*', '**/pages/*', 'next/*', 'wagmi/**'],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['off'],
    '@typescript-eslint/no-var-requires': ['off'],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}

import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {FlatCompat} from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    rules: {
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'arrow-body-style': ['error', 'always'],
      'spaced-comment': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-spacing': [
        'error',
        {
          before: false,
          after: true,
        },
      ],
      'jsx-quotes': ['error', 'prefer-single'],
      'key-spacing': [
        'error',
        {
          beforeColon: false,
          afterColon: true,
        },
      ],
      'keyword-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'line-comment-position': [
        'error',
        {
          position: 'above',
        },
      ],
      'space-in-parens': ['error', 'never'],
      'default-case': 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'block-scoped-var': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-inline-comments': 'error',
      'no-invalid-this': 'error',
      'no-lone-blocks': 'error',
      'no-undef-init': 'error',
      'no-useless-catch': 2,
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'require-await': 'error',
      'arrow-spacing': 'error',
      'brace-style': 'error',
      'no-whitespace-before-property': 'error',
      'switch-colon-spacing': 'error',
      'no-case-declarations': 'off',
    },
  },
];

export default eslintConfig;

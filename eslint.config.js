//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...tanstackConfig,
  {
    rules: {
      'sort-imports': 'off',
      'import/consistent-type-specifier-style': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
    },
  },
]

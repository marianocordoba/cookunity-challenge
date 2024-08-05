import stylistic from '@stylistic/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
  stylistic.configs['recommended-flat'],
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.mjs',
      '**/*.cjs',
    ],
    languageOptions: {
      parser,
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {},
  }
]

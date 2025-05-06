// @ts-check
import eslint from '@eslint/js';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import stylisticTs from '@stylistic/eslint-plugin-ts';

export default typescriptEslint.config([
  eslint.configs.recommended,
  typescriptEslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
  {
    files: ['**/*.{ts,vue,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    plugins: {
      '@stylistic/ts': stylisticTs,
    },
    rules: {
      'vue/html-indent': ['warn', 2],
      'vue/multi-word-component-names': ['off'],

      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],

      'no-undef': ['off'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': ['off'],
      '@typescript-eslint/no-parameter-properties': ['off'],
      '@typescript-eslint/unified-signatures': ['off'],

      '@stylistic/ts/member-delimiter-style': [
        'warn',
        {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },

          singleline: {
            delimiter: 'comma',
            requireLast: false,
          },

          multilineDetection: 'brackets',
        },
      ],
    },
  },
]);

// @ts-check
'use strict';

const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.resolve('./package.json'));

/** @type {{ react?: string; typescript?: string; '@types/node'?: string; }} */
const dependencies = {
  ...pkg.devDependencies,
  ...pkg.dependencies,
};

/**
 * @typedef Config
 * @type { import('eslint').Linter.Config }
 */

module.exports = {
  dependencies,

  checkIfReactRichedV17() {
    const { react } = dependencies;
    const version = react?.match(/\d+/)?.[0];

    if(react === undefined || version === undefined) {
      return undefined;
    }

    return +version >= 17;
  },

  /** @type { (isFrontend: boolean, isReactRichedV17?: boolean) => Config } */
  makeConfig(isFrontend, isReactRichedV17) {
    /** @type { NonNullable<Config['rules']> } */
    const frontendOnlyRules = {
      'react/jsx-filename-extension': ['warn', {
        extensions: ['.jsx', '.tsx'],
      }],
      // 'react/jsx-curly-spacing': ['warn', 'never'],
      'react/jsx-curly-spacing': ['error', {
        when: 'never',
        spacing: { objectLiterals: 'always' },
        children: true,
      }],
      'react/react-in-jsx-scope': isReactRichedV17 === false ? 'warn' : 'off',
    };

    /** @type { NonNullable<Config['rules']> } */
    const backendOnlyRules = {};

    return {
      env: {
        es6: true,
        [isFrontend ? 'browser' : 'node']: true,
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
        ...isFrontend && {
          react: { version: 'detect' },
        },
      },
      extends: [
        ...isFrontend ? [
          'airbnb',
          'plugin:react/recommended',
        ] : [
          'airbnb/base',
        ],
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
      ],
      plugins: [
        '@typescript-eslint',
        ...isFrontend ? ['react'] : [],
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 11,
        ...isFrontend && {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      ignorePatterns: ['dist', 'build'],
      parser: '@typescript-eslint/parser',
      rules: {
        ...isFrontend ? frontendOnlyRules : backendOnlyRules,
        'line-comment-position': 'off',
        'no-console': 'off',
        'no-restricted-syntax': [
          'warn',
          {
            selector: 'CallExpression[callee.object.name="console"][callee.property.name!=/^(info|warn|error)$/]',
            message: 'Unexpected console statement.',
          },
          {
            selector: 'ImportDeclaration[source.value=/\\.css$/i] ~ ImportDeclaration[source.value!=/\\.css$/i]',
            message: 'CSS import must be last',
          },
        ],
        'import/first': 'off',
        'lines-around-directive': ['warn', {
          before: 'never',
          after: 'always',
        }],
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'max-len': ['warn', {
          code: 150,
          ignoreComments: true,
          ignoreTemplateLiterals: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
        }],
        'keyword-spacing': ['warn', {
          overrides: {
            if: { after: false },
            for: { after: false },
            while: { after: false },
            switch: { after: false },
          },
        }],
        'no-process-env': 'off',
        'import/namespace': 'off',
        'react/jsx-pascal-case': 'off',
        'no-negated-condition': 'off',
        'default-case': 'off',
        'react/jsx-key': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'react/require-default-props': 'off',
        'func-names': 'off',
        'space-in-parens': ['warn', 'never'],
        'no-continue': 'off',
        'react/display-name': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        'react/destructuring-assignment': 'off',
        'operator-linebreak': 'off',
        complexity: 'off',
        'no-await-in-loop': 'off',
        'no-confusing-arrow': 'off',
        'no-alert': 'off',
        'no-warning-comments': 'off',
        'arrow-parens': ['warn', 'as-needed'],
        'space-before-function-paren': ['warn', {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        }],
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        'no-multi-assign': 'off',
        'object-curly-newline': ['warn', {
          consistent: true,
        }],
        'no-multiple-empty-lines': ['warn', {
          max: 2,
          maxBOF: 0,
          maxEOF: 0,
        }],
        'import/extensions': ['warn', 'never'],
        'no-plusplus': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'warn',
        'react/button-has-type': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-ts-comment': ['warn', {
          'ts-expect-error': false,
        }],
        '@typescript-eslint/no-unused-vars': ['warn', {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
        }],
        'no-unused-vars': 'off',
        'no-sync': 'off',
        'no-nested-ternary': 'off',
        'no-implicit-coercion': ['warn', {
          boolean: true,
          number: false,
          string: true,
          disallowTemplateShorthand: true,
        }],
        'no-mixed-operators': 'off',
        camelcase: 'off',
        'no-underscore-dangle': 'off',
        'no-empty': ['warn', {
          allowEmptyCatch: true,
        }],
        'newline-per-chained-call': 'off',
        'consistent-return': 'off',
        'function-paren-newline': 'off',
        'generator-star-spacing': ['warn', {
          before: false,
          after: false,
        }],
        'prefer-destructuring': 'off',
        'jsx-quotes': ['warn', 'prefer-single'],
        'react/jsx-props-no-spreading': 'off',
      },
      overrides: [
        {
          files: ['*.js', '*.jsx'],
          rules: {
            strict: ['warn', 'global'],
            '@typescript-eslint/no-var-requires': 'off',
          },
        },
      ],
    };
  },
};

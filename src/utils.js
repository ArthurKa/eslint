// @ts-check
'use strict';

/**
  @typedef Dependencies
  @type {{
    react?: string;
    typescript?: string;
    '@types/node'?: string;
  }}
*/
/**
  @typedef Package
  @type {{
    name: string;
    dependencies: Dependencies;
    devDependencies: Dependencies;
  }}
*/

/** @type {Package} */
// eslint-disable-next-line import/no-dynamic-require
const parentPkg = require(require('path').resolve('./package.json'));

const { name: pkgName } = require('../package.json');

const allDependencies = {
  ...parentPkg.devDependencies,
  ...parentPkg.dependencies,
};

/** @typedef { import('eslint').Linter.Config } Config */

module.exports = {
  allDependencies,
  pkgName,
  parentPkgName: parentPkg.name,

  checkIfReactRichedV17() {
    const { react } = allDependencies;
    const version = react?.match(/\d+/)?.[0];

    if(react === undefined || version === undefined) {
      return undefined;
    }

    return +version >= 17;
  },

  /** @type {(isFrontend: boolean, isReactRichedV17?: boolean) => Config} */
  makeConfig(isFrontend, isReactRichedV17) {
    /** @type {NonNullable<Config['rules']>} */
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

    /** @type {NonNullable<Config['rules']>} */
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
            message: 'CSS import must be the last.',
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
            catch: { after: false },
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
        'import/extensions': ['error', 'never', {
          json: 'ignorePackages',
        }],
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
          /*
            Because of error for some reason:
            Configuration for rule "no-implicit-coercion" is invalid:
            Value {"boolean":true,"number":false,"string":true,"disallowTemplateShorthand":true} should NOT have additional properties.
          */
          // disallowTemplateShorthand: true,
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
        'generator-star-spacing': ['warn', 'before'],
        'prefer-destructuring': 'off',
        'jsx-quotes': ['warn', 'prefer-single'],
        'react/jsx-props-no-spreading': 'off',
        'no-void': 'off',
        'brace-style': ['warn', '1tbs'],
        curly: ['warn', 'all'],
        indent: 'off',
        '@typescript-eslint/indent': ['warn', 2],
        'no-extra-parens': 'off',
        '@typescript-eslint/no-extra-parens': 'off',
        'max-statements-per-line': ['warn', {
          max: 1,
        }],
        'require-await': 'warn',
        '@typescript-eslint/type-annotation-spacing': 'warn',
        '@typescript-eslint/member-delimiter-style': 'warn',
        'no-useless-constructor': 'off',
        '@typescript-eslint/no-useless-constructor': 'warn',
        'lines-between-class-members': 'off',
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['warn', 'always'],
        semi: 'off',
        '@typescript-eslint/semi': 'warn',
        'no-constant-condition': ['warn', {
          checkLoops: false,
        }],
        'prefer-regex-literals': ['warn', {
          disallowRedundantWrapping: true,
        }],
      },
      overrides: [
        {
          files: ['*.js', '*.jsx', '*.cjs'],
          rules: {
            strict: ['warn', 'global'],
          },
        },
        {
          files: ['*.js', '*.jsx'],
          rules: {
            '@typescript-eslint/no-var-requires': 'off',
          },
        },
      ],
    };
  },

  /** @type {(message: string) => void} */
  printInfoMessage: message => {
    console.info(`${pkgName}: ${message.slice(0, 1).toLowerCase()}${message.slice(1)}`);
  },
};

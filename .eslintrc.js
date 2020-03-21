module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module', // Allows for the use of imports
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'eslint-comments', 'import', 'react-hooks'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:react/recommended',
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Checks rules of Hooks
    'react-hooks/rules-of-hooks': 'error',
    // Checks effect dependencies
    'react-hooks/exhaustive-deps': 'warn',

    // Forcing explicit typedefs in TS is very nice,
    // but can easily annoy TS newcomers - thus let's disable them for now.
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-object-literal-type-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    // Force private members to be prefixed with `_`
    '@typescript-eslint/member-naming': [
      'warn',
      {
        private: '^_',
        protected: '^_',
      },
    ],
    // Allow defining and calling variables/methods that are prefixed with `_`
    'no-underscore-dangle': 'off',

    // If non-null assertion is wrong, why did they introduce it to TS?
    '@typescript-eslint/no-non-null-assertion': 'off',

    // I don't see why this would become a problem
    // (Sometimes you want to define an interface that extends something but is a different interface,
    // that could have some additional props in the future)
    '@typescript-eslint/no-empty-interface': 'off',

    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],

    'unicorn/filename-case': 'off',

    // `ChildNode#append()` and `ChildNode#remove()` don't work on IE11, we need to use `.appendChild` instead
    'unicorn/prefer-node-append': 'off',
    'unicorn/prefer-node-remove': 'off',

    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 2,

    // TODO Enable it when https://github.com/benmosher/eslint-plugin-import/pull/1304 gets released
    // 'import/no-unresolved': ['error'],
    // TODO Remove those 2 lines when https://github.com/benmosher/eslint-plugin-import/pull/1304 gets released
    'import/named': 'off',
    'import/no-unresolved': 'off',

    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal', 'parent', 'sibling'], ['index']],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/prop-types': 'off',
    'react/forbid-prop-types': 'off',

    // We've got prettier for that
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-indent': 'off',

    'react/jsx-no-target-blank': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-brace-presence': [1, { props: 'always', children: 'never' }],

    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx', '.js'],
      },
    ],

    'react/sort-comp': [
      1,
      {
        order: [
          'static-methods',
          'instance-variables',
          'type-annotations',
          'lifecycle',
          'everything-else',
          '/^_?handle.+$/',
          '/^_?render.+$/',
          'render',
        ],
      },
    ],

    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',

    'react/jsx-one-expression-per-line': 'off',

    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',

    // TODO enable those but only as warnings,
    // So they can be possible during development,
    // but won't go onto staging (CI will fail)
    'no-alert': 'off',
    'no-console': 'off',
    'no-debugger': 'off',

    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': ['error'],

    // line spacing
    'padding-line-between-statements': [
      'error',

      // wildcard inclusions
      {
        blankLine: 'always',
        prev: ['multiline-block-like'],
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: ['multiline-block-like', 'switch', 'return'],
      },

      // specific exclusions for case statements
      { blankLine: 'never', prev: 'case', next: 'multiline-block-like' },
      { blankLine: 'never', prev: 'multiline-block-like', next: 'case' },
    ],
  },
  overrides: [
    {
      files: 'bin/*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },

    {
      files: ['**/*.test.*', '**/*.saga.*', 'sagas/**', 'server/**'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: true,
            peerDependencies: true,
          },
        ],
      },
    },

    // Allow for devDependencies to be imported
    // in the project config, story and test files
    {
      files: ['bin/**', 'build/**', 'next.config.js'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false,
          },
        ],
      },
    },

    // Ignore the filenames match for Next.js (and other vendors) config files
    {
      files: [
        'next-env.d.ts',
        '.eslintrc.js',
        'next.config.js',
        'pages/**/*.tsx',
        'server/index.ts',
        'src/utils/styled-components/index.ts',
        'src/utils/styled-components/styled-components.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
        'filenames/match-regex': 'off',
        'filenames/match-exported': 'off',
        'filenames/no-index': 'off',
      },
    },

    // Turn off `import` for files run directly by node.js
    // (they don't support `import` yet)
    {
      files: ['next.config.js', 'build/**', 'bin/**'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};

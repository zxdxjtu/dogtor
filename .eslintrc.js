module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  globals: {
    chrome: 'readonly',
    browser: 'readonly'
  },
  rules: {
    // 代码质量规则
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    'no-console': 'off', // 允许console.log用于调试
    'no-debugger': 'error',
    'no-alert': 'error',
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',

    // 代码风格规则
    'indent': ['error', 2],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',

    // ES6+ 规则
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'arrow-spacing': 'error',
    'template-curly-spacing': 'error',

    // 最佳实践
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    'brace-style': ['error', '1tbs'],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always'
    }],

    // Chrome扩展特定规则
    'no-undef': 'error' // 确保所有变量都已定义
  },
  overrides: [
    {
      files: ['background/**/*.js'],
      env: {
        browser: false,
        serviceworker: true
      },
      globals: {
        chrome: 'readonly',
        self: 'readonly',
        importScripts: 'readonly'
      }
    },
    {
      files: ['content/**/*.js'],
      env: {
        browser: true,
        webextensions: true
      },
      globals: {
        chrome: 'readonly'
      }
    },
    {
      files: ['popup/**/*.js', 'options/**/*.js'],
      env: {
        browser: true,
        webextensions: true
      },
      globals: {
        chrome: 'readonly'
      }
    },
    {
      files: ['utils/**/*.js'],
      parserOptions: {
        sourceType: 'module'
      },
      env: {
        browser: true,
        es2021: true
      }
    }
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.min.js',
    'web-ext-artifacts/'
  ]
};

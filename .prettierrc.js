module.exports = {
  trailingComma: 'all',
  bracketSpacing: true,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 100,
  useTabs: false,
  semi: true,
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'flow',
      },
    },
    {
      files: '*.jsx',
      options: {
        parser: 'flow',
      },
    },
  ],
};

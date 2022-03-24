module.exports = {
  plugins: ['prettier-plugin-jsdoc'],
  printWidth: 100,
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  jsdocSingleLineComment: false,
  overrides: [
    {
      files: '*.{ts,tsx}',
      parser: 'typescript',
      options: {
        trailingComma: 'all',
      },
    },
  ],
}

module.exports = {
  singleQuote: true,
  importOrder: [
    '^assets/(.*)$',
    '^components/(.*)$',
    '^features/(.*)$',
    '^./.*$',
  ],
  importOrderSeparation: true,
  experimentalBabelParserPluginsList: ['jsx'],
};

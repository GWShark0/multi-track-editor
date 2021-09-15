module.exports = {
  singleQuote: true,
  importOrder: [
    '^assets/(.*)$',
    '^components/(.*)$',
    '^features/(.*)$',
    '^utils/(.*)$',
    '^[./]',
  ],
  experimentalBabelParserPluginsList: ['jsx'],
};

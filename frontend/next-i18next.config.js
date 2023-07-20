const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk','en'],

    domains: [
      {domain: 'lovepix.sk', defaultLocale: 'sk'},
      {domain: 'lovepix.en', defaultLocale: 'en'},
    ]
  },
  localePath: path.resolve('./public/locales'),
}

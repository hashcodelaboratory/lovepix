const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'sk',
    locales: ['sk'],
    // TODO: enable in time of internationalization will be required
    locales: ['sk','en'],
  },
  localePath: path.resolve('./public/locales'),
}

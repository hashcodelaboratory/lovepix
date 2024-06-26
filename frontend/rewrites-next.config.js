const rewrites_en = require('./rewrites-languages/rewrites-en')
const rewrites_sk = require('./rewrites-languages/rewrites-sk')

const rewrites = rewrites_sk.concat(rewrites_en)

module.exports = {
  async rewrites() {
    return rewrites // url changes related to files : public/locales, rewrites-languages, constants/pages/urls
  },
}

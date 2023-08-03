const rewrites_en = require("./rewrites-languages/rewrites-en")
const rewrites_sk = require("./rewrites-languages/rewrites-sk")

const rewrites = rewrites_sk.concat(rewrites_en)

module.exports = {
  async rewrites() {
    return rewrites //For link translation to work they have to be changed in localization files and rewrites respectively
  }
}
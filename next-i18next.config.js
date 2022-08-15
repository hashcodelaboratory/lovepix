const path = require('path');

module.exports = {
    i18n: {
        defaultLocale: "sk",
        locales: ["en", "sk"],
    },
    localePath: path.resolve("./public/locales"),
};
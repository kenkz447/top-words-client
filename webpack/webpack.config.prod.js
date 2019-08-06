// @ts-check

const getBuildConfig = require('./base/getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        VERSION_HASH: '$Id$',
        SUB_ENV: 'production',
        API_ENTRY: 'https://topwords-api.tungnt.dev',
        SENTRY_ID: 'https://735c3a992fd24429b4b42ea2679ce92a@sentry.io/1512148',
    },
    sourceMap: true,
    compression: true,
    gaID: 'UA-135627950-2'
})
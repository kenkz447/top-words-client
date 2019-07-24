// @ts-check

const getBuildConfig = require('./base/getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        API_ENTRY: 'https://topwords-api.tungnt.dev',
        SUB_ENV: 'production'
    },
    sourceMap: true,
    compression: true,
    gaID: 'UA-135627950-2'
})
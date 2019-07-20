// @ts-check

const getBuildConfig = require('./base/getBuildConfigs');

module.exports = getBuildConfig({
    definitions: {
        API_ENTRY: 'https://top-words-server.herokuapp.com',
        SUB_ENV: 'production'
    },
    sourceMap: true,
    compression: true,
    gaID: 'UA-135627950-1'
})
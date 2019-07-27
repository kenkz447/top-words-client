// @ts-check

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
    modules: {
        rules: {
            typescript: {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=ts',
                exclude: /node_modules/
            }
        }
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
}
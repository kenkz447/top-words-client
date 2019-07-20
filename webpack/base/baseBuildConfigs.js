// @ts-check

const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = {
    modules: {
        rules: {
            typescript: {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=ts',
                exclude: /node_modules/
            },
            fonts: {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            },
            images: {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=[name].[ext]'
                }]
            }
        }
    },
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })]
    }
}
// @ts-check

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin')

const baseBuildConfig = require('./base/baseBuildConfigs');

/**
 * @param {{ port: number; host: string; defineOptions: object }} options
 */
module.exports = (options) => {
    const { port, host, defineOptions } = options;

    return {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        entry: [
            `webpack-dev-server/client?http://${host}:${port}`,
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/index',
        ],
        output: {
            publicPath: '/',
            path: path.join(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin(defineOptions),
            new ErrorOverlayPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.NamedChunksPlugin(),
            new HtmlWebpackPlugin({
                template: 'src/template.html',
                inject: 'body'
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: [{
                        loader: "style-loader"
                    }, {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }, {
                        loader: "sass-loader"
                    }]
                },
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [tsImportPluginFactory( /** options */)]
                            })
                        }
                    }, {
                        loader: 'ts-nameof-loader'
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            ...baseBuildConfig.resolve,
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        }
    }
};
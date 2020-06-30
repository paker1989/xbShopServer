const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const webpackBaseConfig = require('./webpack.base.config');

const config = require('./config');

const webpackdevConfig = merge(webpackBaseConfig, {
    mode: 'development', // 影响一些默认设置
    entry: [
        /** need to comment the hot middleware entry to be able to work with dev-server */
        // 'webpack-hot-middleware/client.js?noInfo=true&reload=true',
        './main.js',
    ],
    devtool: config.dev.devtool,
    devServer: {
        // contentBase: path.join(__dirname, "../dist"),
        contentBase: false,
        compress: true,
        port: config.dev.port,
        open: false,
        historyApiFallback: true,
        hot: true,
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '../static'),
                    to: config.dev.assetsSubDirectory,
                },
            ],
        }),
    ],
});

module.exports = webpackdevConfig;

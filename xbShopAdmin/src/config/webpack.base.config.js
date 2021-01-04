const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { assetsPath } = require('./utils');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, '../../public/index.html'),
    inject: true,
});

module.exports = {
    context: path.resolve(__dirname, '../'), // src
    entry: {
        app: './main.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    plugins: [htmlWebPackPlugin],
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            // '@component': path.join(__dirname, '../../../_packages_/components') // to test
        },
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css$/,
                // exclude: /node_module/, // 会忽略node_module/antd，会报错，应删去
                use: ['style-loader', 'css-loader'],
            },
            // {
            //     test: /\.less$/,
            //     // exclude: /node_module/, // 会忽略node_module/antd，会报错，应删去
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 javascriptEnabled: true,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    name: assetsPath('img/[name].[hash:7].[ext]'),
                    // 30KB 以下的文件采用 url-loader
                    limit: 1024 * 30,
                    // 否则采用 file-loader，默认值就是 file-loader
                    fallback: 'file-loader',
                },
            },
            // {
            //   test: /\.(jpe?g|png|gif|svg)$/i,
            //   loader: "file-loader",
            //   options: {
            //     limit: 10000,
            //     name: 'static/images/[name].[hash:7].[ext]' //打包后存放的位置
            //   }
            // },
            {
                test: /\.json$/i,
                type: 'javascript/auto',
                loader: 'json-loader',
            },
            // {
            //   test: /\.ts(x?)$/,
            //   exclude: /node_modules/,
            //   use: [
            //     {
            //       loader: "ts-loader"
            //     }
            //   ]
            // }
        ],
    },
};

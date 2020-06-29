'use strcit'

const path = require('path');

module.exports = {
    dev: {
        env: {
            NODE_ENV: '"development"',
        },
        port: "1220",
        devtool: 'cheap-module-eval-source-map',
        assetsSubDirectory: "static",
    },
    build: {
        env: {
            NODE_ENV: '"production"',
        },
        assetsRoot: path.resolve(__dirname, '../../build'),
        port: "1220",
        productionSourceMap: true,
        devtool: '#source-map',
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['jsx', 'js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
        assetsSubDirectory: "static",
        // dbUrl: 'mongodb://localhost:27019/calendar'
    }
}
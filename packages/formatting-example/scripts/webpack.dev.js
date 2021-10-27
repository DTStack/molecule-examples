const { merge } = require('webpack-merge');
const webpackConf = require('./webpack.base');
const config = require('../webpack.config.js');

module.exports = function (env) {
    return merge(webpackConf, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: Object.assign(
            {
                progress: false,
                hot: true,
                port: 8080,
                disableHostCheck: true,
            },
            config.devServer
        ),
    });
};

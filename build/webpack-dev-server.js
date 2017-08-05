const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../config');
const webpackConfig = require('./webpack/development_hot');

const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: config.dir_src,
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
        colors: true,
    },
    historyApiFallback: true,
});

module.exports = server;

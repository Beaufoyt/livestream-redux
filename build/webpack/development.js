const webpackConfig = require('./_base');

webpackConfig.devtool = '#cheap-module-eval-source-map';

module.exports = webpackConfig;

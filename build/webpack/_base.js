const webpack = require('webpack');
const config = require('../../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const cache = config.cache;
const paths = config.utils_paths;

const filename = cache ? '[name].[hash].js' : '[name].js';

const webpackConfig = {
    name: 'client',
    target: 'web',
    entry: {
        app: [
            'babel-polyfill',
            `${paths.project(config.dir_src)}/init.jsx`,
        ],
        vendor: config.vendor_dependencies,
    },
    output: {
        filename,
        path: paths.project(config.dir_dist),
        publicPath: '/',
    },
    plugins: [
        new webpack.DefinePlugin(config.globals),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint: {
                    configFile: paths.project('.eslintrc'),
                    emitWarning: true,
                },
            },
        }),
        new HtmlWebpackPlugin({
            template: paths.src('index.html'),
            hash: cache,
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [paths.src('styles')],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
        ],
    },
};

console.log('fssfag', __dirname);

module.exports = webpackConfig;

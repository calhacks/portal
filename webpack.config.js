
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [path.resolve(__dirname, 'src/app.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                },
                resolve: {
                    extensions: ['.js', '.jsx']
                }
            }
        ]
    },
    target: 'node',
    node: {
        fs: 'empty'
    },
    externals: [nodeExternals()]
};

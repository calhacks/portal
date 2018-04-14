var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [path.resolve(__dirname, 'src/client/index.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src/client'),
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react']
                },
                resolve: {
                    extensions: ['.*', '.jsx', '.js']
                }
            }
        ]
    }
};


var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var baseRules = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules|dist/,
        resolve: {
            extensions: ['.js', '.jsx', '.sass']
        }
    }
];

var devServerConfig = {
    name: 'server',
    mode: 'development',
    entry: [path.resolve(__dirname, 'src/app.js')],
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        rules: baseRules
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()]
}

var prodServerConfig = {
    name: 'server',
    mode: 'production',
    entry: [path.resolve(__dirname, 'src/app.js')],
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        rules: baseRules
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()]
}

var serverConfig;
if (process.env.NODE_ENV == 'production') {
    serverConfig = prodServerConfig;
} else {
    serverConfig = devServerConfig;
}

module.exports = serverConfig;

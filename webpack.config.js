
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var baseRules = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        resolve: {
            extensions: ['.js', '.jsx', '.css']
        }
    }
];

var clientConfig = {
    name: 'client',
    mode: 'development',
    entry: [path.resolve(__dirname, 'src/client/index.jsx')],
    resolve: {
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        rules: baseRules.concat([
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ])
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};

var serverConfig = {
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
        rules: baseRules.concat([
            {
                test: /\.css$/,
                loader: 'css-loader/locals'
            }
        ])
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()]
}

module.exports = [
    clientConfig,
    serverConfig
];

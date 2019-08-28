
var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

var baseRules = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: /src/,
        exclude: /node_modules|public/,
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
        path: path.join(__dirname, 'public'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: 'src/client/assets',
                    to: 'assets'
                }
            ]
        ),
    ]
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
        rules: [
            ...baseRules,
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'server.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: 'src/client/assets',
                    to: 'assets'
                },
		{
		    from: 'node_modules/aos/dist/aos.css',
		    to: 'assets/css'
		},
		{
		    from: 'node_modules/aos/dist/aos.js',
		    to: 'assets/js'
		}
            ]
        ),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css'
        })
    ]
}

var serverConfig;
if (process.env.NODE_ENV == 'production') {
    serverConfig = prodServerConfig;
} else {
    serverConfig = devServerConfig;
}

module.exports = serverConfig;

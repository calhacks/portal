const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');


module.exports = {
	entry: './src/app.js',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/'
	},
	target: 'node',
	externals: nodeExternals(),
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: `'production'`
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
				query: { presets: ['es2015', 'react'] }
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
};
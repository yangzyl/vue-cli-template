const webpackBaseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require(path.resolve('config.json'));

module.exports = merge(webpackBaseConfig, {
	devtool: '#inline-source-map',
	mode: 'development',
	output: {
		filename: '[name].js'
	},
	devServer: {
		port: config.dev.port,
		host: config.dev.host,
		proxy: {
			'/api': config.davinci.backend.url
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'head',
			template: path.join(__dirname, './index.html')
		})
	]
});
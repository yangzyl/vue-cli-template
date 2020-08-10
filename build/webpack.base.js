const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const POSTCSS_OPTIONS = {
	loader: 'postcss-loader',
	options: {
		plugins: [
			require('autoprefixer')({
				overrideBrowserslist: ['last 2 versions']
			})
		]
	}
};

module.exports = {
	entry: {
		bundle: [
			'@babel/polyfill/dist/polyfill.min.js',
			path.resolve('src/index.js')
		]
	},
	plugins: [
		new VueLoaderPlugin()
	],
	target: 'web',
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': path.resolve()
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						scss: 'style-loader!css-loader!sass-loader'
					}
				}
			},
			{
				test: /\.js$/,
				// exclude(file) {
				// 	return /node_module/.test(file) && !/@ccccit/.test(file);
				// },
				use: {
					loader: 'babel-loader',
				}
			},
			{
				test: /\.(png|jpg|svg|gif|jpeg)$/,
				loader: 'url-loader',
				options: {
					esModule: false,
					limit: 10000,
					outputPath: 'images/'
				}
			},
			{
				test: /\.(eot|woff|woff2|svg|ttf)$/,
				loader: 'file-loader'
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					POSTCSS_OPTIONS,
					'sass-loader'
				]
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader',
					POSTCSS_OPTIONS
				]
			},
			{
				test: /\.yaml$/,
				use: [
					'json-loader',
					'yaml-loader'
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			name: true,
			cacheGroups: {
				commons: {
					test: /node_modules/,
					name: 'vendors',
					chunks: 'all'
				}
			},
		}
	},
	node: false
}
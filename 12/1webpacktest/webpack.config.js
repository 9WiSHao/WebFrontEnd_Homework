const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	// 入口
	entry: './src/js/date.js',
	// 输出
	output: {
		// 所有文件的输出路径
		path: __dirname + '/dist', // 需要一个绝对路径
		// 入口文件打包输出文件名
		filename: 'static/js/date.js',
		// 自动清空上一次打包内容
		clean: true,
	},
	// 加载器
	module: {
		rules: [
			// loader的配置
			{
				// 只检测.css文件
				test: /\.css$/i,
				// 把css打包进html里
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				// 这是babel的规则
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
		],
	},

	optimization: {
		minimizer: [
			// 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
			// `...`,
			new CssMinimizerPlugin(),
		],
	},
	// 插件
	plugins: [
		// plugin的配置
		new ESLintPlugin({
			context: __dirname + '/src',
		}),
		// 这是打包css到html文件里
		new MiniCssExtractPlugin({
			filename: 'static/css/date.css',
		}),
		// 这是打包html文件，而且得以所指定html文件为模板
		new HtmlWebpackPlugin({
			template: __dirname + '/public/index.html',
		}),
	],

	// 模式
	mode: 'production',
};

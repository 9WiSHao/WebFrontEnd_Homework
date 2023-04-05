module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js',
		clean: true,
	},
	module: {
		rules: [
			{
				// 匹配js文件，然后启用自己写的loader
				test: /\.js$/,
				loader: './myloaders/constVar.js',
			},
		],
	},
	plugins: [],
	mode: 'production',
};

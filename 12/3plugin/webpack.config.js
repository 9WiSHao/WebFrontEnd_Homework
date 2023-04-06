const LogPlugin = require('./myplugin/logPlugin');

module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'js/[name].js',
		clean: true,
	},
	module: {
		rules: [],
	},
	plugins: [new LogPlugin({ logFile: 'updateLog.md' })], //这里可以写日志文件名，要是没写默认名updateLog.md
	mode: 'production',
};

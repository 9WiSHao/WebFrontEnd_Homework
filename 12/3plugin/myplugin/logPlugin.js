// 这里使用了node的文件读写模块
const fs = require('fs');
const path = require('path');

class LogPlugin {
	// 构造函数接收可指定的文件名，如果没写就默认是updateLog.md
	constructor(options) {
		this.options = options || {};
		this.logFile = this.options.logFile || 'updateLog.md';
	}
	apply(compiler) {
		// 使用emit的异步钩子
		compiler.hooks.emit.tapAsync('LogPlugin', (compilation, callback) => {
			// 获取根目录
			let rootDir = compiler.options.context;
			// 检查日志文件是否存在
			let logFilePath = path.resolve(rootDir, this.logFile);
			// 时间戳
			let time = Date.now();
			// 获取所有输出文件名
			let outputFiles = Object.keys(compilation.assets);
			// 此次打包输出日志文本
			let content = `\n#### 打包了以下文件:\n+ ${outputFiles.join(';\n +')}\n##### 时间戳:${time}\n`;

			// 接下来是写入.md文件中
			// 判断文件是否存在，若不存在则创建并写入内容，若存在则追加内容
			if (!fs.existsSync(logFilePath)) {
				fs.writeFileSync(logFilePath, content, 'utf-8');
			} else {
				fs.appendFileSync(logFilePath, content, 'utf-8');
			}
			callback();
		});
	}
}

module.exports = LogPlugin;

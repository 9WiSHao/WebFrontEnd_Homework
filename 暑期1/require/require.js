const fs = require('fs');
const path = require('path');

class CustomModule {
	constructor(moduleId) {
		this.moduleId = moduleId; //模块的id，通常是完整的文件路径
		this.moduleExports = {}; //存储模块导出的内容
	}

	static moduleCache = {}; //用于缓存已加载的模块

	static moduleHandlers = {
		//处理不同文件类型的处理器
		'.js': function (module) {
			//读取文件内容
			const moduleContent = fs.readFileSync(module.moduleId, 'utf8');
			//编译并执行模块
			module.compileModule(moduleContent);
		},
	};

	//加载模块
	static loadModule(moduleId) {
		//如果模块已经加载过，直接从缓存中取出并返回模块导出的内容
		if (CustomModule.moduleCache[moduleId]) {
			return CustomModule.moduleCache[moduleId].moduleExports;
		}

		//否则新建一个模块对象
		const newModule = new CustomModule(moduleId);
		//将新模块添加到缓存
		CustomModule.moduleCache[moduleId] = newModule;
		//加载模块
		newModule.load();
		//返回模块导出的内容
		return newModule.moduleExports;
	}

	//加载模块
	load() {
		//获取文件扩展名
		const fileExtension = path.extname(this.moduleId);
		//根据文件扩展名使用对应的处理器来加载模块
		CustomModule.moduleHandlers[fileExtension](this);
	}

	//编译并执行模块
	compileModule(moduleContent) {
		//将模块包装在一个函数中，这样模块中的代码就可以在自己的作用域中运行，而不是全局作用域
		const moduleWrapper = Function('exports', 'require', 'module', '__filename', '__dirname', moduleContent);
		//获取文件所在的目录
		const moduleDirName = path.dirname(this.moduleId);
		//执行包装后的模块，并将一些参数传给模块，这样模块就可以使用这些参数了
		moduleWrapper(this.moduleExports, (moduleId) => CustomModule.loadModule(path.resolve(moduleDirName, moduleId)), this, this.moduleId, moduleDirName);
	}
}

//定义一个自定义的require函数，这个函数可以加载模块并返回模块导出的内容
const customRequire = (moduleId) => CustomModule.loadModule(path.resolve(moduleId));

const someModule = customRequire('./somod.js');
console.log(someModule.key1); // 'value1'
someModule.fn1(); // 123

// 验证的时候所在路径需要在require里，不然会报错找不到文件（能直接用runcode）

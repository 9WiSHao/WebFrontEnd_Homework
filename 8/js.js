let Reimu = {
	name: '博丽灵梦',
};
// 造一个用来验证输出的函数
function hello(word1, word2) {
	console.log(this.name + '说了句: ' + word1 + word2);
}

// hello2.call(Reimu, '给老娘来塞钱啊')

//call的模拟实现
Function.prototype.myCall = function (thisArg, ...arr) {
	//也可以用用arguments[i]来获取后面的参数，就是不知道有多少个参数麻烦些，所以就用...arr来收集了
	// 如果call的是空的，就指向windows
	if (thisArg === null || thisArg === undefined) {
		thisArg = window;
	}
	// 定义一个不重复的常量防止出事
	let fn = Symbol('whatever');
	// 理解此处的this指向，也就是在哪调用的.myCall，this就是指向的谁，所以自然这里完成了一个this的指向调整
	// 然后要做的就是把this指向的要借用的函数拿出来调用下就给删了
	thisArg[fn] = this;
	// 之后执行
	let result = thisArg[fn](...arr); // 这儿注意收集的那个参数得展开，顺便借用的函数有返回值的话，就把返回值也收集起来
	// 删除新增的属性
	delete thisArg[fn];
	// 如果有返回值的话，在这把后面的参数返回
	return result;
};
// 验证下
hello.myCall(Reimu, '都给老娘来', '塞钱啊');

//apply的模拟实现
// 和上面call完全一致，就是注意apply只收集arr一个类数组形参，把...去掉就行了
Function.prototype.myApply = function (thisArg, arr) {
	if (thisArg === null || thisArg === undefined) {
		thisArg = window;
	}
	let fn = Symbol('whatever');
	thisArg[fn] = this;
	// 这儿注意收集的那一个类数组得展开
	let result = thisArg[fn](...arr);
	delete thisArg[fn];
	return result;
};
// 验证下
let hx = ['都给老娘来', '塞钱啊'];
hello.myApply(Reimu, hx);

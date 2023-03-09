let testarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myreduce = function (fn, initialValue) {
	// 得先判断清楚fn是不是函数，不然就报错
	if (Object.prototype.toString.call(fn) !== '[object Function]') {
		throw `TypeError: ${fn} is not a function`;
	}
	// 这里主要注意reduce方法的定义
	// mdn上说如果没给初始值，那第给初始值赋值为第一个元素，然后从第二个元素才开始调用回调函数
	// 如果给了，才从第一个元素开始调用回调函数
	let i = 0;
	let accumulator = initialValue;
	if (arguments.length === 1) {
		i = 1;
		accumulator = this[0];
	}

	for (; i < this.length; i++) {
		accumulator = fn(accumulator, this[i], i, this);
	}
	return accumulator;
};

// 测试例
let result1 = testarr.myreduce((sum, current) => {
	return sum + current;
}, 10);
console.log(result1);

let result2 = testarr.reduce((sum, current) => {
	return sum + current;
}, 10);
console.log(result2);

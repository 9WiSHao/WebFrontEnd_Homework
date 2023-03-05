function sum(a, b, c) {
	return a + b + c;
}

let curriedSum = curry(sum);

console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化

//写一个curry函数来实现此功能

function curry(func) {
	// 这个给了相加函数，能确定总共有几个参数相加，所以很好确定最后的递归尾，还是好实现点
	let length1 = func.length;
	// 用来收集所有参数的数组，在闭包的作用域链里
	let args = [];

	return function result() {
		// 把每一轮调用的参数收集，参数没收集完说明后面还得再调用，所以递归
		args.push(...arguments);
		if (args.length < length1) {
			return result;
		}
		// 这里是为了能重复调用，所以需要清空一下闭包里的args
		let temp = args;
		args = [];
		// 参数收集齐了，总调用
		return func(...temp);
	};
}

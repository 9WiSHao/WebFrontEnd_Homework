// 在数组的原型里加上自己的push方法
Array.prototype.myPush = function (...args) {
	for (let i = 0; i < args.length; i++) {
		this[this.length] = args[i];
	}
	return this.length;
};
//测试代码，比如向下面的arr尾部增加2
let arr = [1, 1, 4, 5, 1, 4];
arr.myPush(1, 9, 1, 9, 8, 1, 0);
console.log(arr); // [ 1, 1, 4, 5, 1, 4, 1, 9, 1, 9, 8, 1, 0 ]

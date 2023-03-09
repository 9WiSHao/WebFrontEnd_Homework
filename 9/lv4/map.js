let testarr = [1, 2, 3, 4, 5];

Array.prototype.mymap = function (fn, thisArg) {
	// 得先判断清楚fn是不是函数，不然就报错
	if (Object.prototype.toString.call(fn) !== '[object Function]') {
		throw `TypeError: ${fn} is not a function`;
	}

	let arrNew = [];
	for (let i = 0; i < this.length; i++) {
		// 用call调用函数，因为map如果有第二个参数的话就得改this
		arrNew[i] = fn.call(thisArg, this[i], i, this);
	}
	return arrNew;
};

// 测试例
let arr2 = testarr.mymap((item, index, arr) => {
	console.log(arr);
	return item * index;
});
console.log(arr2);

let arr3 = testarr.map((item, index, arr) => {
	console.log(arr);
	return item * index;
});
console.log(arr3);

// testarr.mymap(1);
// testarr.map(2);

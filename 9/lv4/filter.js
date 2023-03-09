let testarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

Array.prototype.myfilter = function (fn, thisArg) {
	// 得先判断清楚fn是不是函数，不然就报错
	if (Object.prototype.toString.call(fn) !== '[object Function]') {
		throw `TypeError: ${fn} is not a function`;
	}

	let arrNew = [];
	for (let i = 0; i < this.length; i++) {
		if (fn.call(thisArg, this[i], i, this)) {
			arrNew.push(this[i]);
		}
	}
	return arrNew;
};

// 测试例
let arr1 = testarr.myfilter((i) => {
	return i % 2 === 0;
});
console.log(arr1);

let arr2 = testarr.filter((i) => {
	return i % 2 === 0;
});
console.log(arr2);

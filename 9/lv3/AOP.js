//实现func.before()以及func.after()
Function.prototype.before = function (fn) {
	let originalFunction = this;
	return function () {
		fn();
		originalFunction();
	};
};

Function.prototype.after = function (fn) {
	let originalFunction = this;
	return function () {
		originalFunction();
		fn();
	};
};

let func = function () {
	console.log(2);
};

func = func
	.before((a = 1) => {
		console.log(a);
	})
	.after((b = 3) => {
		console.log(b);
	});

func();

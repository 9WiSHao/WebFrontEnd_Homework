function sumTo1(n) {
	let result = 0;
	for (let i = 1; i <= n; i++) {
		result += i;
	}
	return result;
}

console.log(sumTo1(100));

function sumTo2(n) {
	if (n != 0) {
		return n + sumTo2(n - 1);
	} else {
		return 0;
	}
}

console.log(sumTo2(100));

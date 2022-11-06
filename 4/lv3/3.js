function strictEqual(ele1, ele2) {
	if (ele1 != ele2) {
		return false;
	}
	if (typeof ele1 == typeof ele2) {
		return true;
	}
	return false;
}

// let a = 0;
// let b = new String('0');
// let c = '0';
// let d = false;
// let arr = [a, b, c, d];

// for (let i = 0; i < arr.length; i++) {
// 	for (let j = 0; j < arr.length; j++) {
// 		console.log(strictEqual(arr[i], arr[j]));
// 	}
// }

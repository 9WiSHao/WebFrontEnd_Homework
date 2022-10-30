let arr = [1, [2, 3], [4, 5, [6, 7, 8]], 9];
function flatten(arr) {
	let arrTemp = [];
	for (let i = 0; i < arr.length; i++) {
		if (!Array.isArray(arr[i])) {
			arrTemp.push(arr[i]);
		} else {
			arrTemp = arrTemp.concat(flatten(arr[i]));
		}
	}
	return arrTemp;
}

console.log(flatten(arr));

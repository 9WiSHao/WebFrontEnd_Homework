const stu = {
	name: 'MING',
	hobby: ['play', 'run', 'sing'],
	address: {
		school: 'ChongQing',
		home: 'HENAN',
	},
	title: ['student', { year: 2022 }],
	skills: {
		speak() {
			this.name = 'JACK';
		},
	},
};

// 浅拷贝
// 就是把老对象的键值对应赋值给新对象，只实现基本数据类型的拷贝，更复杂的数据类型只是引用原来有的
function s_copy(oldObj, NewObj) {
	// 遍历键值然后赋值给新对象
	for (let key in oldObj) {
		//检测对象是不是有这个键值
		if (oldObj.hasOwnProperty(key)) {
			NewObj[key] = oldObj[key];
		}
	}
}
let stu2 = {};
s_copy(stu, stu2);
console.log(stu2);

// 深拷贝
// 需要把所有的东西都对应弄个新的赋值给新对象，对象套对象或者数组就递归
function d_copy(oldObj, NewObj) {
	// 遍历键值(可以是对象的键值当然也可以是数组的键值)
	for (let key in oldObj) {
		//检测对象是不是有这个键值
		if (oldObj.hasOwnProperty(key)) {
			// 检测这个键值是不是对象或者数组(因为数组也会判定为object)
			if (oldObj[key] && typeof oldObj[key] == 'object') {
				// 是的话就给新对象对应地方初始化对应类型，然后递归调用此函数
				if (Array.isArray(oldObj[key])) {
					NewObj[key] = [];
				} else {
					NewObj[key] = {};
				}
				deepCopy(NewObj[key], oldObj[key]);
			} else {
				// 不是就直接拷贝基本值
				NewObj[key] = oldObj[key];
			}
		}
	}
}
let stu3 = {};
s_copy(stu, stu3);
console.log(stu3);

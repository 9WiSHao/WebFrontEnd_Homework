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

const fn = function (obj) {
	let that = obj;
	obj.skills.speak = function () {
		that.name = 'JACK';
	};
	obj.skills.speak();
};
fn(stu);

console.log(stu.name); // JACK

const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const button = document.querySelector('button');

function sleep(className, number, sleeptime) {
	return new Promise((r) => {
		className.id = 'bt';
		setTimeout(() => {
			console.log(`球${number}动完了`);
			r();
		}, sleeptime);
	});
}

async function move() {
	// 感觉写的重复代码太多了，写个函数复用下代码
	await sleep(b1, 1, 3000);
	await sleep(b2, 2, 3000);
	await sleep(b3, 3, 3000);
	//等价于下面
	// await new Promise((reslove) => {
	// 	b1.id = 'bt';
	// 	setTimeout(() => {
	// 		console.log(`球1动完了`);
	// 		reslove();
	// 	}, 3000);
	// });
	// await new Promise((reslove) => {
	// 	b2.id = 'bt';
	// 	setTimeout(() => {
	// 		console.log(`球2动完了`);
	// 		reslove();
	// 	}, 3000);
	// });
	// await new Promise((reslove) => {
	// 	b3.id = 'bt';
	// 	setTimeout(() => {
	// 		console.log(`球3动完了`);
	// 		reslove();
	// 	}, 3000);
	// });
}

button.addEventListener('click', () => {
	if (b1.id == '' && b2.id == '' && b3.id == '') {
		move();
	} else {
		b1.id = '';
		b2.id = '';
		b3.id = '';
	}
});

const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const button = document.querySelector('button');

function move() {
	new Promise((resolve) => {
		b1.id = 'bt';
		let i = 1;
		setTimeout(() => {
			resolve(i);
		}, 3000);
	})
		.then((result) => {
			console.log(`球${result}动完了`);
			b2.id = 'bt';
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(result + 1);
				}, 3000);
			});
		})
		.then((result) => {
			console.log(`球${result}动完了`);
			b3.id = 'bt';
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(result + 1);
				}, 3000);
			});
		})
		.then((result) => {
			console.log(`球${result}动完了`);
		});
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

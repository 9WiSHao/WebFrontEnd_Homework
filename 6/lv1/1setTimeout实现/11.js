const b1 = document.querySelector('.b1');
const b2 = document.querySelector('.b2');
const b3 = document.querySelector('.b3');
const button = document.querySelector('button');

function move() {
	b1.id = 'bt';
	setTimeout(() => {
		b2.id = 'bt';
		setTimeout(() => {
			b3.id = 'bt';
		}, 3000);
	}, 3000);
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

let checkbox = document.querySelectorAll('.check');
let buttonAll = document.querySelector('.button1');
let buttonNone = document.querySelector('.button2');
let buttonInvert = document.querySelector('.button3');

buttonAll.addEventListener('click', () => {
	checkbox.forEach((e) => {
		e.checked = true;
	});
});

buttonNone.addEventListener('click', () => {
	checkbox.forEach((e) => {
		e.checked = false;
	});
});

buttonInvert.addEventListener('click', () => {
	checkbox.forEach((e) => {
		e.checked = !e.checked;
	});
});

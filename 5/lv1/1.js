let button = document.querySelector('button');
let span = document.querySelectorAll('span');
button.addEventListener('click', () => {
	if (span[0].style.backgroundColor != 'transparent') {
		span.forEach((e) => {
			e.style.backgroundColor = 'transparent';
		});
	} else {
		span.forEach((e) => {
			e.style.backgroundColor = 'black';
		});
	}
});

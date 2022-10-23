let buttonHolder = document.querySelector('.button-holder');
let buttonShadow = document.querySelector('.button-shadow');
let stars = document.querySelectorAll('.button img');
let goldship1 = document.querySelector('.goldship1');
let goldship2 = document.querySelector('#goldship2');
let buttonBox = document.querySelector('.button-box');
let buttonBox2 = document.querySelector('#button-box2');
let button = document.querySelector('.button');

function addBottonShadow() {
	buttonShadow.className = 'button-shadow-hover';
	stars.forEach((element) => {
		element.style.display = 'block';
	});
}

function removeBottonShadow() {
	buttonShadow.className = 'button-shadow';
	stars.forEach((element) => {
		element.style.display = 'none';
	});
}

function clickBotton() {
	goldship1.style.display = 'none';
	goldship2.className = 'goldship2';
	buttonBox.style.display = 'none';
	buttonBox2.className = 'button-box2';
	button.className = 'button-p';
	addBottonShadow();
}

buttonHolder.addEventListener('mouseover', addBottonShadow);

buttonHolder.addEventListener('mouseout', removeBottonShadow);

buttonHolder.addEventListener('click', () => {
	clickBotton();
	buttonHolder.removeEventListener('mouseout', removeBottonShadow);
});

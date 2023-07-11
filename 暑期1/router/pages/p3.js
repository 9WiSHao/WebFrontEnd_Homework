export default {
	html: `<div>这是page3</div>`,
	render: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.innerHTML = this.html;
		rightDOM.style.backgroundColor = 'green';
	},
	delete: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.style.backgroundColor = 'transparent';
		rightDOM.innerHTML = '';
	},
};

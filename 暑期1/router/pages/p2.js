export default {
	html: `<div>这是page2</div>`,
	render: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.innerHTML = this.html;
		rightDOM.style.backgroundColor = 'yellow';
	},
	delete: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.style.backgroundColor = 'transparent';
		rightDOM.innerHTML = '';
	},
};

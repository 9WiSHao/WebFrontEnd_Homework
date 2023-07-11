export default {
	html: `<div>这是page1底下的p12</div>`,
	render: function () {
		const p1MDOM = document.querySelector('.p1M');
		p1MDOM.innerHTML = this.html;
		p1MDOM.style.backgroundColor = 'pink';
	},
	delete: function () {
		const p1MDOM = document.querySelector('.p1M');
		p1MDOM.style.backgroundColor = 'transparent';
		p1MDOM.innerHTML = '';
	},
};

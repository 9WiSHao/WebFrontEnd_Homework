export default {
	html: `<div>这是主页，监听hash变化来实现单页面路由。点击上面按钮切换其他页面</div>`,
	render: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.innerHTML = this.html;
		rightDOM.style.backgroundColor = '#fff';
	},
	delete: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.style.backgroundColor = 'transparent';
		rightDOM.innerHTML = '';
	},
};

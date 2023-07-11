import p11 from './p11.js';
import p12 from './p12.js';
import p13 from './p13.js';

export default {
	html: /*html*/ `
  <div>这是page1,然后整点二级路由，嵌套的</div>
  <div class="p1R">
    <span class="p11" data-hash="/p11">p11</span>
    <span class="p12" data-hash="/p12">p12</span>
    <span class="p13" data-hash="/p13">p13</span>
  </div>
  <div class="p1M"></div>

  `,
	render: function () {
		const rightDOM = document.querySelector('.right');
		rightDOM.innerHTML = this.html;
		rightDOM.style.backgroundColor = 'aqua';

		const p1RDOM = document.querySelector('.p1R');
		p1RDOM.addEventListener('click', function (e) {
			if (!e.target.closest('span')) {
				return;
			}
			let hash1 = window.location.hash.split('/')[1];
			window.location.hash = `#/${hash1}${e.target.dataset.hash}`;
		});

		// 点进来默认显示p11
		window.location.hash = '#/p1/p11';
		p11.render();
		this.currentPage = p11;
		this.currentHash = '#/p1/p11';

		// 这里用bind解决this指向。在添加或者移除监听器的时候this默认是windows，要bind一下指向整个p1对象
		this.boundHandleRouting = this.handleRouting.bind(this);
		window.addEventListener('hashchange', this.boundHandleRouting);
	},
	// 二级路由的函数
	handleRouting: function () {
		let hash = window.location.hash;
		let hashPart2 = hash.split('/')[2];
		if (hash === this.currentHash) {
			return;
		}
		if (hashPart2 == undefined) {
			return;
		}
		this.currentHash = hash;
		this.currentPage.delete();
		switch (hashPart2) {
			case 'p11':
				p11.render();
				this.currentPage = p11;
				break;
			case 'p12':
				p12.render();
				this.currentPage = p12;
				break;
			case 'p13':
				p13.render();
				this.currentPage = p13;
				break;
		}
	},

	delete: function () {
		// 删除的时候移除二级的hash路由监听器
		window.removeEventListener('hashchange', this.boundHandleRouting);
		const rightDOM = document.querySelector('.right');
		rightDOM.style.backgroundColor = 'transparent';
		rightDOM.innerHTML = '';
	},
};

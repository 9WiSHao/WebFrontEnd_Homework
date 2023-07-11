import p0 from './pages/p0.js';
import p1 from './pages/p1.js';
import p2 from './pages/p2.js';
import p3 from './pages/p3.js';

const mainDOM = document.querySelector('.main');

mainDOM.innerHTML = /*html*/ `
  <div class = "left">
    <span class="p0" data-hash="/p0">主页</span>
    <span class="p1" data-hash="/p1">p1</span>
    <span class="p2" data-hash="/p2">p2</span>
    <span class="p3" data-hash="/p3">p3</span>
  </div>
  <div class = "right"></div>
`;

// 这是点击切换对应hash
const pagesDOM = mainDOM.querySelector('.left');
pagesDOM.addEventListener('click', function (e) {
	if (!e.target.closest('span')) {
		return;
	}
	window.location.hash = e.target.dataset.hash;
});

// 初始化是主页
window.location.hash = '#/p0';
let currentHash = '';
// 第二段路由地址(一级路由)
let currentHashPart1 = '';
let currentPage = p0;

// 简单的原生js hash路由
function handleRouting() {
	let hash = window.location.hash;
	let hashPart1 = hash.split('/')[1];
	if (hash === currentHash) {
		return;
	}
	// 继续检查下一级的路由地址是否变化(因为二级路由也会让它变)
	if (hashPart1 === currentHashPart1) {
		return;
	}
	currentHash = hash;
	currentHashPart1 = hashPart1;
	currentPage.delete();
	switch (hashPart1) {
		case 'p0':
			p0.render();
			currentPage = p0;
			break;
		case 'p1':
			p1.render();
			currentPage = p1;
			break;
		case 'p2':
			p2.render();
			currentPage = p2;
			break;
		case 'p3':
			p3.render();
			currentPage = p3;
			break;
	}
}

// 页面加载时调用一次路由处理函数，解决刷新时首页空白问题
window.addEventListener('load', handleRouting);
// hash 变化时调用路由处理函数
window.addEventListener('hashchange', handleRouting);

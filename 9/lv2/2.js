let output = document.querySelector('.text');
const input = document.querySelector('input');
const button = document.querySelector('button');
const save = document.querySelector('.save1');

// 防抖应用（用在了假装2秒一临时保存输入框草稿，取最后输入的2秒后）
function debuonce(func, delay = 2000) {
	let timer;
	return function () {
		// 核心思想就是每每有调用就重置定时器，直到最后一次定时器走完了再有相关操作
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, arguments);
		}, delay);
	};
}
input.addEventListener(
	'input',
	debuonce(() => {
		save.className = 'save2';
		setTimeout(() => {
			save.className = 'save1';
		}, 1000);
	})
);

//节流应用（用在了提交输入文字，2秒内只取第一次的点击提交）
function throttle(func, delay = 2000) {
	let timer,
		firstTime = true;
	return function () {
		// 第一次的发送要能直接发出来
		if (firstTime) {
			func.apply(this, arguments);
			firstTime = false;
			timer = setTimeout(() => {
				clearTimeout(timer);
				timer = null;
			}, delay);
			return;
		}
		if (timer) {
			return;
		}
		func.apply(this, arguments);
		timer = setTimeout(() => {
			clearTimeout(timer);
			timer = null;
		}, delay);
	};
}
button.addEventListener(
	'click',
	throttle(() => {
		output.textContent += input.value;
	})
);

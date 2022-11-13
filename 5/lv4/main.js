let that;
class SendMessage {
	// 构造函数
	constructor() {
		// 写个that指向这个类方便在函数里调用这个函数（主要指init）
		that = this;
		// 获取一些不会变的节点
		this.messageName = document.querySelector('.name-text');
		this.inputText = document.querySelector('.send-message-text');
		this.button = document.querySelector('button');
		this.messageBody = document.querySelector('.message-body');
		this.colorSelect = document.querySelector('.colorSelect > select');
		this.colorBlock = document.querySelector('.colorBlock');
		// 默认的留言颜色是黑色
		this.fontColor = '#000000';
		// 这个是留言序号，不受删除留言干扰
		this.number = 2;
		// 构造器调用这些函数来初始化
		this.sendMessage();
		this.changeColor();
		this.init();
	}
	// 初始化函数，把留言们获取并且编号，而且给删除键附上方法，在添加留言以及删除留言的时候会再次调用
	init() {
		this.updateNode();
		for (let i = 0; i < this.messages.length; i++) {
			// 给留言编个号以确定删除的时候删哪个
			this.messages[i].index = i;
			this.deletes[i].addEventListener('click', this.deleteMessage);
		}
	}
	// 重新获取留言
	updateNode() {
		this.messages = this.messageBody.querySelectorAll('.messages');
		this.deletes = document.querySelectorAll('.delete');
	}
	// 获取当前时间
	getTime() {
		let now = new Date();
		// 注意这月份加了1，因为他妈的js里这个date函数是从0到11，不知道咋想的
		this.time1 = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
		this.time2 = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	}
	// 改变留言字体颜色，以及选中不同的时候能换预览色块
	changeColor() {
		this.colorSelect.addEventListener('click', () => {
			this.colorBlock.style.backgroundColor = `${this.colorSelect.options[this.colorSelect.selectedIndex].value}`;
			this.fontColor = `${this.colorSelect.options[this.colorSelect.selectedIndex].value}`;
		});
	}
	// 发送留言
	sendMessage() {
		this.button.addEventListener('click', () => {
			// 先判断称呼跟留言不为空再说
			if (this.inputText.value == '') {
				alert('留言不能为空');
				return;
			}
			if (this.messageName.value == '') {
				alert('敢问尊姓大名');
				return;
			}
			// 点击发送按钮的时候获取当前精确时间
			this.getTime();
			// 要插入的内容
			let texts = `<div class="messages">
			<div class="message-top">
			    <div class="message-top-left">
			        <div class="message-name">${this.messageName.value}</div>
			        <div class="message-time1">${this.time1}</div>
			        <div class="message-time2">${this.time2}</div>
			    </div>
			    <div class="message-top-right number">#${this.number}</div>
			</div>
			<div class="message-middle message-text" style="color: ${this.fontColor}">${this.inputText.value}</div>
			<div class="message-bottom fuction">
			    <div class="delete">[删除]</div>
			</div>
			<div class="line"></div>`;
			// 在留言那个主体框框里在最后地方插入留言
			this.messageBody.insertAdjacentHTML('beforeend', texts);
			// 留言序号加一
			this.number++;
			// 把上次留言打的字清空，称呼就先不清空了
			this.inputText.value = '';
			// 因为插入了更多节点，所以调用初始化方法给他重新获取再编号下
			that.init();
		});
	}
	// 删除留言
	deleteMessage() {
		// 删除按键的父节点的父节点是这个留言整体，因为在初始化那给他编了号，所以可以获取到以确定删除的是哪个留言
		let index = this.parentNode.parentNode.index;
		that.messages[index].remove();
		// 删除完留言数量又变了，所以再初始化下
		that.init();
	}
}
new SendMessage();

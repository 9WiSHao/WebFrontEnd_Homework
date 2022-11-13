class SendMessage {
	constructor() {
		this.messageName = document.querySelector('.name-text');
		this.inputText = document.querySelector('.send-message-text');
		this.button = document.querySelector('button');
		this.messages = document.querySelectorAll('.messages');
		this.messageBody = document.querySelector('.message-body');
		this.number = 2;
		this.sendMessage();
	}

	getTime() {
		let now = new Date();
		this.time1 = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
		this.time2 = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
	}

	sendMessage() {
		this.button.addEventListener('click', () => {
			if (this.inputText.value == '') {
				alert('留言不能为空');
				return;
			}
			if (this.messageName.value == '') {
				alert('敢问尊姓大名');
				return;
			}
			this.getTime();
			let texts = `<div class="messages">
			<div class="message-top">
			    <div class="message-top-left">
			        <div class="message-name">${this.messageName.value}</div>
			        <div class="message-time1">${this.time1}</div>
			        <div class="message-time2">${this.time2}</div>
			    </div>
			    <div class="message-top-right number">#${this.number}</div>
			</div>
			<div class="message-middle message-text">${this.inputText.value}</div>
			<div class="message-bottom fuction">
			    <div class="delete">[没做删除]</div>
			</div>
			<div class="line"></div>`;
			this.messageBody.insertAdjacentHTML('beforeend', texts);
			this.number++;
			this.inputText.value = '';
		});
	}
}
new SendMessage();

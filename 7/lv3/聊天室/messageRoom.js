const ws = new WebSocket(`ws://chatroom.chovrio.club/chatroom?url=${localStorage.getItem('avatar')}&name=${localStorage.getItem('username')}`);
const sendButton = document.querySelector('.send button');
const sendMessage = document.querySelector('.send-message-text');
const messageBody = document.querySelector('.message-body');

function getTime() {
	let now = new Date();
	// 注意这月份加了1，因为他妈的js里这个date函数是从0到11，不知道咋想的
	let time1 = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
	let time2 = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	return { time1, time2 };
}

function funcMessage(data) {
	let { time1, time2 } = getTime();
	let message = `
        <div class="messages">
            <div class="message-top">
                <div class="message-top-left">
                    <div class="message-name">${data.nickname}</div>
                    <div class="message-time1">${time1}</div>
                    <div class="message-time2">${time2}</div>
                </div>
            </div>
            <div class="message-middle">
                <div class="avatar">
                    <img src=${data.url} />
                </div>
                <div class="message-text">${data.message}</div>
            </div>
            <div class="line"></div>
        </div>
    `;
	messageBody.insertAdjacentHTML('beforeend', message);
}

sendButton.addEventListener('click', () => {
	if (ws.readyState === WebSocket.OPEN) {
		ws.send(JSON.stringify(sendMessage.value));
	}
});

ws.onopen = () => {
	alert('已连接服务器');
};

ws.onmessage = ({ data }) => {
	let dataObj = JSON.parse(data);
	console.log('服务器发来数据', dataObj);
	funcMessage(dataObj);
};

ws.onclose = () => {
	console.log('与服务器的连接已断开');
};

ws.onerror = function (error) {
	alert(`[error] ${error.message}`);
};

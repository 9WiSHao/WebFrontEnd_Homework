let inPutUser = document.querySelector('.inPutUser');
let inPutAvatar = document.querySelector('.inPutAvatar');

let inPutButton = document.querySelector('.inPutButton');
inPutButton.addEventListener('click', () => {
	if (inPutUser.value == '') {
		alert('用户名为空');
	} else {
		if (inPutAvatar.value == '') {
			inPutAvatar.value = 'https://pic.imgdb.cn/item/6386134616f2c2beb1f9efac.png';
		}
		localStorage.setItem('username', inPutUser.value);
		localStorage.setItem('avatar', inPutAvatar.value);
		window.location.href = 'messageRoom.html';
	}
});

let avatar = document.querySelector('#avatar');
avatar.addEventListener('click', () => {
	if (inPutAvatar.value == '') {
		alert('未更换头像呢，别点了');
	} else {
		avatar.src = inPutAvatar.value;
	}
});

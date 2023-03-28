// 首先运行npm install my_axios_111下载依赖与自己写的测试用包（其实依赖就是xhr，因为node里没有就得下）
// 然后确保装了json-server来开启本地服务器，运行json-server --watch db.json创建本地服务器
// 然后就能在新终端里用 node 测试例.js 来测试了
const axios = require('./node_modules/my_axios_111/axios.js');

// 这里使用了json-server --watch db.json命令先开启一个本地服务器，然后用这个本地服务器测试的
axios('http://localhost:3000/posts').then((res) => {
	let resjosn = JSON.parse(res.data);
	console.log(resjosn);
});

// 留了一个fetch方法测试成没成功;
// fetch('http://localhost:3000/posts')
// 	.then((res) => {
// 		return res.json();
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	});

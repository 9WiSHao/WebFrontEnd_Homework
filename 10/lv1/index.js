// 装了4个包，superb夸人，give-me-a-joke随机笑话，emoji-random随机emoji表情，colors彩虹色输出的字

const superb = require('superb');
const jokes = require('give-me-a-joke');
const color = require('colors');
const emoji = require('emoji-random');

console.log(`let me tell you a joke ${emoji.random()}`);
console.log(`this will be a ${superb.random()} joke!`);

jokes.getRandomDadJoke(function (item) {
	console.log(item.rainbow);
});

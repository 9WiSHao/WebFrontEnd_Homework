let body = document.querySelector('.body');
let text = '元丰六年十月十二日夜，解衣欲睡，月色入户，欣然起行。念无与为乐者，遂至承天寺寻张怀民。怀民亦未寝，相与步于中庭。庭下如积水空明，水中藻、荇交横，盖竹柏影也。何夜无月？何处无竹柏？但少闲人如吾两人者耳。';

(async function () {
	for (let char of text) {
		await new Promise((r) => {
			setTimeout(() => {
				// body.insertAdjacentHTML('beforeEnd', char);
				body.innerHTML += char;
				r();
			}, 200);
		});
	}
})();

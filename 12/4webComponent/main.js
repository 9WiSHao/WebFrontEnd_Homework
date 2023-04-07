class MyClock extends HTMLElement {
	constructor() {
		super();
		const templateContent = document.querySelector('#my-clock').content;
		const shadowRoot = this.attachShadow({ mode: 'open' });

		shadowRoot.appendChild(templateContent.cloneNode(true));
	}

	connectedCallback() {
		const secondHand = this.shadowRoot.querySelector('.second-hand');
		const minsHand = this.shadowRoot.querySelector('.min-hand');
		const hourHand = this.shadowRoot.querySelector('.hour-hand');

		let hour, min, sec;

		function initTime() {
			let time = new Date();
			hour = time.getHours();
			min = time.getMinutes();
			sec = time.getSeconds();
		}

		function setTime() {
			sec += 1;
			if (sec === 60) {
				min += 1;
			}
			if (min === 60) {
				hour += 1;
			}
			secondHand.style.transform = `rotate(${(sec * 360) / 60 + 90}deg)`;
			minsHand.style.transform = `rotate(${(min * 360) / 60 + (sec / 60) * 6 + 90}deg)`;
			hourHand.style.transform = `rotate(${(hour * 360) / 12 + (min / 60) * 30 + 90}deg)`;
		}

		initTime();
		setInterval(setTime, 1000);
	}
}

customElements.define('my-clock', MyClock);

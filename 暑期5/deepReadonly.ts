type X = {
	x: {
		a: 1;
		b: 'hi';
		c: {
			d: true;
			e: 'false';
			f: 3;
		};
	};
	y: 'hey';
};

type DeepReadonly<T> = {
	readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type Todo = DeepReadonly<X>;

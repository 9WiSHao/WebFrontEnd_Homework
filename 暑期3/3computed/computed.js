// 使用 WeakMap 来存储每个对象的依赖关系
const targetMap = new WeakMap();

// 当前活动的 effect 函数，默认为 null
let activeEffect = null;

// 用一个数组来实现堆栈，存储所有的 effect 函数
let activeEffectStack = [];

// effect 函数用于设置当前的活动 effect
function effect(eff) {
	try {
		// 把 eff 函数添加到堆栈中，并设为当前活动的 effect
		activeEffectStack.push(eff);
		activeEffect = eff;
		// 立即执行 eff 函数
		eff();
	} finally {
		// 执行完 eff 函数后，把它从堆栈中移除，并恢复之前的活动 effect
		activeEffectStack.pop();
		activeEffect = activeEffectStack[activeEffectStack.length - 1];
	}
}

// track 函数用于设置对象属性的依赖
function track(target, key) {
	// 只有当有活动的 effect 时才进行依赖收集
	if (activeEffect) {
		let depsMap = targetMap.get(target);
		if (!depsMap) {
			targetMap.set(target, (depsMap = new Map()));
		}
		let dep = depsMap.get(key);
		if (!dep) {
			depsMap.set(key, (dep = new Set()));
		}
		dep.add(activeEffect);
	}
}

// trigger 函数用于触发对象属性的更新
function trigger(target, key) {
	const depsMap = targetMap.get(target);
	if (depsMap) {
		const dep = depsMap.get(key);
		if (dep) {
			dep.forEach((eff) => {
				eff();
			});
		}
	}
}

// reactive 函数用于创建一个响应式的对象
function reactive(target) {
	return new Proxy(target, {
		get(target, key, receiver) {
			const result = Reflect.get(target, key, receiver);
			track(target, key);
			return result;
		},
		set(target, key, value, receiver) {
			const oldValue = Reflect.get(target, key, receiver);
			const result = Reflect.set(target, key, value, receiver);
			if (oldValue !== value) {
				trigger(target, key);
			}
			return result;
		},
	});
}

// ref 函数用于创建一个可响应的对象
function ref(raw) {
	const r = {
		_value: raw,
		get value() {
			track(r, 'value');
			return this._value;
		},
		set value(newVal) {
			this._value = newVal;
			trigger(r, 'value');
		},
	};
	return r;
}

// computed 函数用于创建一个计算属性
function computed(getter) {
	const result = ref();
	effect(() => (result.value = getter()));
	return result;
}

let product = reactive({ price: 10, quantity: 2 });
let salePrice = computed(() => {
	return product.price * 0.9;
});
let total = computed(() => {
	return salePrice.value * product.quantity;
});

console.log(total.value, salePrice.value); // 18, 9
product.quantity = 5;
console.log(total.value, salePrice.value); // 45, 9
product.price = 20;
console.log(total.value, salePrice.value); // 90, 18

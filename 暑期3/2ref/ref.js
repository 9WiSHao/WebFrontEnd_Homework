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
			dep.forEach((effect) => {
				effect();
			});
		}
	}
}

// ref 函数用于创建一个可响应的对象
function ref(raw) {
	const r = {
		_is_ref: true, // 添加一个标记，表示这是一个 ref 对象
		_value: raw, // 存储原始值
		// 当访问 value 属性时，进行依赖收集
		get value() {
			track(r, 'value');
			return this._value;
		},
		// 当设置 value 属性时，触发更新
		set value(newVal) {
			this._value = newVal;
			trigger(r, 'value');
		},
	};
	return r;
}

const count = ref(0);
console.log(count.value); // 0

// 创建一个 effect，监听 count 的变化
effect(() => {
	console.log(`count的值是: ${count.value}`);
});

// 改变 count.value，触发更新
count.value++;

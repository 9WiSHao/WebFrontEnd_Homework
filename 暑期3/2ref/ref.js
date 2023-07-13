// 用 WeakMap 存储每个对象的依赖关系
const targetMap = new WeakMap();

// track 函数用于设置对象属性的依赖
function track(target, key) {
	// 获取对象的依赖 Map
	let depsMap = targetMap.get(target);
	// 如果没有，则创建一个新的 Map，并设置到 WeakMap 中
	if (!depsMap) {
		targetMap.set(target, (depsMap = new Map()));
	}
	// 获取属性的依赖 Set
	let dep = depsMap.get(key);
	// 如果没有，则创建一个新的 Set，并设置到 Map 中
	if (!dep) {
		depsMap.set(key, (dep = new Set()));
	}
	// 添加当前的 effect 到这个属性的依赖中
	dep.add(effect);
}

// trigger 函数用于触发对象属性的更新
function trigger(target, key) {
	// 获取对象的依赖 Map
	const depsMap = targetMap.get(target);
	// 如果没有，则直接返回
	if (!depsMap) return;
	// 获取属性的依赖 Set
	const dep = depsMap.get(key);
	// 如果存在，则运行所有的 effect
	if (dep) {
		dep.forEach((effect) => {
			effect();
		});
	}
}

// 当前的 effect 函数
// 默认为空函数，在 watchEffect 中临时赋值
let effect = () => {};

// watchEffect 函数用于监听响应式对象的变化
function watchEffect(eff) {
	// 将 eff 赋值到 effect
	// 这样在接下来的 reactive 对象属性读取时，就可以收集到这个依赖
	effect = eff;
	// 立即运行一次 eff
	effect();
	// 清空 effect
	effect = () => {};
}

// ref 函数用于创建一个响应式的引用值
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
watchEffect(() => {
	console.log(`count的值是: ${count.value}`);
});

// 改变 count.value，触发更新
count.value++;

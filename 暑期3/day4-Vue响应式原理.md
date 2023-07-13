---
title: day4 Vue响应式原理
date: 2023-07-13 15:55:35
tags: [前端, vue, 暑假培训, 笔记, 手写还原]
categories: [web前端, vue学习]
---

为了深入理解 vue 的响应式数据，手写还原 ref、reactive、computed

<!-- more -->

### 前置知识

见 JavaScript 现代教程。基于映射，集合与代理完成响应式数据

#### [Map 和 Set](https://zh.javascript.info/map-set)

#### [Proxy 和 Reflect](https://zh.javascript.info/proxy)

### reactive

比较复杂，考虑到会有多个响应式对象，每个对象有多个属性，每个属性有多个影响它的函数，所以用三级结构储存
最顶部是是个 WeakMap，存储的是那多个响应式对象，每个对象对应一个 Map，存储的是这个对象的多个属性，每个属性对应一个 Set，存储的是影响这个属性的多个函数
然后用 proxy 代理，当读取属性时，触发收集依赖，当设置属性时，触发更新。
同时由于没有给影响函数命名，所以设置了一个数组当堆栈储存影响函数，应对同时注册多个函数的情况。

```javascript
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

// reactive 函数用于创建一个响应式的对象，使用了proxy拦截修改或者读取
function reactive(target) {
	return new Proxy(target, {
		get(target, key, receiver) {
			// 使用Reflect，直接能调用这些隐藏的底层方法
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

// 测试代码
let product = reactive({ price: 10, quantity: 2 });
let total = 0,
	salePrice = 0;

effect(() => {
	total = product.price * product.quantity;
});
effect(() => {
	salePrice = product.price * 0.9;
});

console.log(total, salePrice); // 20 9

product.quantity = 5;
console.log(total, salePrice); // 50 9

product.price = 20;
console.log(total, salePrice); // 100 18
```

捋顺一下此测试代码的执行过程:

- 创建响应式对象

首先调用`reactive`传入我们要变成响应式的对象`{ price: 10, quantity: 2 }`，返回一个经过 proxy 代理的对象，命名为`product`。

- 设置第一个影响函数

然后使用`effect`设置影响函数。`effect`内部会先给传入的影响函数加入堆栈顶，然后执行一次此函数。执行过程中涉及到了`product.price * product.quantity`，也就是说读取了`product`，被 proxy 的 get 拦截到。

proxy 的 get 里使用`product`和它的值`.price`调用`track`，在三级储存结构里逐层注册。最后一层 Set 里注册了堆栈顶的那个才传入的影响函数。同时`product.quantity`也干了一样的事，不过第一层已经有`product`了，就在`product`下第二层注册`.quantity`，也给它加上了那个影响函数。

结束`track`，使用 Reflect 的 get 再获取一下`product.price`，返回。

终于结束了调用这次影响函数，这个影响函数也从堆栈顶弹出。

- 设置第二个影响函数

然后就是注册了第二个影响函数，也做了类似的一套流程，为`price`多加了个影响函数。

- 打印初始值

`console.log`部分，没啥说的，就是打印俩普通值。它们在注册影响函数的时候，因为那次立即执行，获得了数据。

- 修改 `product.quantity`

随后是改变`product.quantity`的值为 5，被 proxy 的 set 拦截到，确认是更改，使用`product`和`.quantity`属性调用了更新器`trigger`。更新器在三级储存结构里找到这个对象和属性，执行一次`.quantity`所有注册在 Set 里的影响函数。它只注册了第一个影响函数，就执行，重新计算了`total`的值。打印，发现了`total`的变化。

- 修改 `product.price`

下面改变`price`同理，proxy 的 set 拦截，调用触发器，执行`price`下面的俩影响函数，再次打印输出就看见俩个值都变了。

### ref

因为每次的更新都需要调用.value，所以 ref 比较简单，只需要用 value 的 get set 就能实现自动更新，不需要像实现 reactive 那样使用 proxy 代理来拦截读取或写入

```javascript
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
```

### computed

调用了之前完成的 ref 完成，原理也不复杂

```javascript
// 前面就是上面ref和reactive的代码

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
```

### 感悟

手写实现确实能深入理解代码。。。

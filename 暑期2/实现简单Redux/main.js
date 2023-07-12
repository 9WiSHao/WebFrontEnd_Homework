const addTextDOM = document.querySelector('.add input');
const addBtnDOM = document.querySelector('.add button');
const deleteTextDOM = document.querySelector('.delete input');
const deleteBtnDOM = document.querySelector('.delete button');
const showDOM = document.querySelector('.show');

// 手写简单Redux
function createStore(reducer) {
	// 闭包内数据，一个是所存数据，一个是注册的函数
	// 初始化 state
	let state = reducer(undefined, {});
	const listeners = [];

	// 从闭包里获取state的函数
	const getState = () => state;
	// 核心，dispatch函数，使用传入的reducer更新state，同时触发所有注册的函数
	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};
	// 注册函数，返回一个取消注册的函数
	const subscribe = (listener) => {
		listeners.push(listener);

		return () => {
			const index = listeners.indexOf(listener);
			listeners.splice(index, 1);
		};
	};

	return { getState, dispatch, subscribe };
}

// 此例子的reducer，这里state进行了初始化，这样规定了state的数据结构
// names数组里面放的是有id和name俩属性的对象
function reducer(state = { id: 0, names: [] }, action) {
	switch (action.type) {
		case 'ADD':
			return {
				id: state.id + 1,
				names: [...state.names, { id: state.id, name: action.name }],
			};
		case 'DELETE':
			return {
				// 这里重写了展开属性，覆盖了原来的names
				...state,
				names: state.names.filter((item) => item.id !== action.id),
			};
		default:
			return state;
	}
}

// 利用手写的createStore函数创建store
const store = createStore(reducer);
// 渲染函数
function render() {
	const currentState = store.getState(); // 获取当前的状态
	showDOM.innerHTML = currentState.names.map((item) => `<p>序号:${item.id}，名称:${item.name}</p>`).join('');
}
// 注册渲染的函数，同时返回一个取消注册的函数（虽然说没用到吧
const unRender = store.subscribe(render);

addBtnDOM.addEventListener('click', () => {
	const name = addTextDOM.value;
	store.dispatch({ type: 'ADD', name });
	addTextDOM.value = '';
});
deleteBtnDOM.addEventListener('click', () => {
	const id = Number(deleteTextDOM.value);
	store.dispatch({ type: 'DELETE', id });
	deleteTextDOM.value = '';
});

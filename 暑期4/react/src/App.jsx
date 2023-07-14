import { useState } from 'react';
import { useDebounce } from './homework/useDebounce';
import { useThrottle } from './homework/useThrottle';
import { useMount } from './homework/useMount';
import { useUnmount } from './homework/useUnMount';
import { PageProvider, usePage } from './homework/pages';

// 防抖钩子测试用例
function DebouncedCounter() {
	// 定义一个 state 存数
	const [count, setCount] = useState(0);

	// 调防抖函数,500ms延迟
	const debouncedIncrement = useDebounce(() => {
		// 注意 setState 函数是可能异步的
		// 所以通过函数的形式获取到最新的 count
		setCount((count) => count + 1);
	}, 500);

	return (
		<div>
			<p>点了 {count} 次</p>
			<button onClick={debouncedIncrement}>防抖的点击增加</button>
		</div>
	);
}

// 节流钩子测试用例
function ThrottleCounter() {
	const [count, setCount] = useState(0);
	// 调节流函数,1000ms延迟
	const throttledIncrement = useThrottle(() => {
		setCount((count) => count + 1);
	}, 1000);
	return (
		<div>
			<p>点了 {count} 次</p>
			<button onClick={throttledIncrement}>节流的点击增加</button>
		</div>
	);
}

// 测试挂载和卸载钩子
function TestComponent({ onRemove }) {
	useMount(() => {
		console.log('挂载了');
	});
	useUnmount(() => {
		console.log('卸载了');
	});

	return (
		<div>
			测试组件
			<button onClick={onRemove}>删除组件</button>
		</div>
	);
}
function ManageComponent() {
	const [isComponentVisible, setComponentVisible] = useState(false);
	const add = () => {
		setComponentVisible(true);
	};
	const remove = () => {
		setComponentVisible(false);
	};
	return (
		<div style={{ marginTop: '40px' }}>
			<button onClick={add}>添加组件</button>
			{isComponentVisible && <TestComponent onRemove={remove} />}
		</div>
	);
}

// 路由测试
const Page1 = () => <div>我是p1</div>;
const Page2 = () => <div>我是p2</div>;
const Page3 = () => <div>我是p3</div>;

const pages = {
	'/p1': Page1,
	'/p2': Page2,
	'/p3': Page3,
};

function Ppages() {
	const { pathname, push } = usePage();

	const Page = pages[pathname] || (() => <div>404 Not Found</div>);

	return (
		<div>
			<nav>
				<button onClick={() => push('/p1')}>Go to p1</button>
				<button onClick={() => push('/p2')}>Go to p2</button>
				<button onClick={() => push('/p3')}>Go to p3</button>
			</nav>
			<Page />
		</div>
	);
}

function App() {
	return (
		<>
			<DebouncedCounter />
			<ThrottleCounter />
			<ManageComponent />
			<PageProvider>
				<Ppages />
			</PageProvider>
		</>
	);
}

export default App;

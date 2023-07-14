import { useRef, useEffect } from 'react';

export function useThrottle(func, delay) {
	const funcRef = useRef(func);
	const timerRef = useRef(null);

	// 更新 funcRef.current 的值为最新的 func
	// 这里一定注意用钩子实现，不直接写，直接写的话会形成闭包，有问题
	useEffect(() => {
		funcRef.current = func;
	}, [func]);

	const throttledFunc = (...args) => {
		// 如果定时器不存在，说明可以立即执行函数
		if (!timerRef.current) {
			funcRef.current(...args);
			// 启动定时器，等到 delay 时间后，将定时器清空，以便下次函数触发时可以立即执行
			timerRef.current = setTimeout(() => {
				timerRef.current = null;
			}, delay);
		}
	};

	// 组件卸载时清空定时器
	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
			funcRef.current = null;
		},
		[]
	);

	return throttledFunc;
}

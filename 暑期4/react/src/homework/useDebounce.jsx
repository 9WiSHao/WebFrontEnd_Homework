import { useEffect, useRef } from 'react';

export function useDebounce(func, delay) {
	// funcRef 用于存储当前传入的函数，以便在 useEffect 或者延迟函数中获取最新的函数
	const funcRef = useRef(func);
	funcRef.current = func;

	// timeoutRef 用于存储 setTimeout 返回的 id，以便在需要的时候取消它
	const timeoutRef = useRef(null);

	function debouncedFunc(...args) {
		// 如果上次的延迟调用还未执行，先清除它
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		// 设置新的延迟调用
		timeoutRef.current = setTimeout(() => {
			funcRef.current(...args);
		}, delay);
	}

	// 组件卸载时，清除可能还存在的延迟调用
	useEffect(
		() => () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		},
		[]
	);

	// 返回新的防抖函数
	return debouncedFunc;
}

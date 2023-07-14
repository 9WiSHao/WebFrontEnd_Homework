import { useEffect } from 'react';

export function useUnmount(callback) {
	useEffect(() => {
		return () => {
			callback();
		};
	}, []); // 这里的空依赖数组也确保了返回的函数只在组件卸载前调用一次
}

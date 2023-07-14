import { useEffect } from 'react';

export function useMount(callback) {
	useEffect(() => {
		callback();
	}, []); // 注意这里的空依赖数组，确保回调只在组件挂载后调用一次
}

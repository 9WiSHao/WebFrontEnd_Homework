import { useState, useEffect } from 'react';

// 路由钩子
export function useRouter() {
	const [pathname, setPathname] = useState(window.location.pathname);
	// 改变URL的函数
	const push = (newPath) => {
		window.history.pushState({}, '', newPath);
		setPathname(newPath);
	};

	const replace = (newPath) => {
		window.history.replaceState({}, '', newPath);
		setPathname(newPath);
	};

	useEffect(() => {
		// 监听浏览器的popstate事件，当用户点击浏览器的前进/后退按钮时，更新pathname
		const handlePopstate = () => setPathname(window.location.pathname);
		window.addEventListener('popstate', handlePopstate);
		return () => window.removeEventListener('popstate', handlePopstate);
	}, []);

	return { pathname, push, replace };
}

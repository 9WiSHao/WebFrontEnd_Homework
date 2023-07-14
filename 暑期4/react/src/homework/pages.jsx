import { createContext, useContext } from 'react';
import { useRouter } from './useRouter.jsx';

// 创建一个上下文，让路由状态能在组件之间共享
const PageContext = createContext();

// 这个组件用于提供上下文，它把useRouter的返回值提供给所有子组件
const PageProvider = ({ children }) => {
	const router = useRouter();
	return <PageContext.Provider value={router}>{children}</PageContext.Provider>;
};
// 这个自定义钩子使得可以在任何组件中获取路由状态和改变函数
const usePage = () => useContext(PageContext);

export { PageProvider, usePage };

// 4种请求方法
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
// 请求配置
interface RequestConfig {
	url: string;
	method?: Method;
	body?: Object;
	headers?: Record<string, string>;
}
// 类似axios的返回值设置
interface AxiosResponse<T = any> {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	config: RequestConfig;
	// 去看了看axios文档，用fetch的话，搞不到axios底层XHR信息，空着算了
	request: {};
}

class MyAxios {
	// 添加请求和响应拦截器数组
	requestInterceptors: Array<(config: RequestConfig) => RequestConfig> = [];
	responseInterceptors: Array<(response: AxiosResponse<any>) => AxiosResponse<any>> = [];

	// 在发送请求前可以添加请求拦截器
	useRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig): void {
		this.requestInterceptors.push(interceptor);
	}

	// 在收到响应后可以添加响应拦截器
	useResponseInterceptor(interceptor: (response: AxiosResponse<any>) => AxiosResponse<any>): void {
		this.responseInterceptors.push(interceptor);
	}

	// fetch请求调用
	private async request<T = any>(config: RequestConfig, method: Method): Promise<AxiosResponse<T>> {
		// 请求拦截器
		this.requestInterceptors.forEach((interceptor) => {
			config = interceptor(config);
		});

		const res: Response = await fetch(config.url, {
			method,
			body: config.body ? JSON.stringify(config.body) : undefined,
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
		});

		// 处理fetch的返回值让它更像axios的返回值
		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}
		const data: T = await res.json();
		// status和statusText一样，就不用单独处理，后面直接赋值
		const headers: Record<string, string> = {};
		res.headers.forEach((value: string, key: string) => {
			headers[key] = value;
		});
		let axiosResponse: AxiosResponse<T> = {
			data,
			status: res.status,
			statusText: res.statusText,
			headers,
			config,
			// 只能空着了
			request: {},
		};

		// 响应拦截器
		this.responseInterceptors.forEach((interceptor) => {
			axiosResponse = interceptor(axiosResponse);
		});

		return axiosResponse;
	}

	// get请求，由于可以传config或者直接传url，所以重载了一下
	async get<T = any>(url: string): Promise<AxiosResponse<T>>;
	async get<T = any>(config: RequestConfig): Promise<AxiosResponse<T>>;
	async get<T = any>(url_or_config: string | RequestConfig): Promise<AxiosResponse<T>> {
		let config: RequestConfig;
		if (typeof url_or_config === 'string') {
			config = { url: url_or_config };
		} else {
			config = url_or_config;
		}
		return await this.request<T>(config, 'GET');
	}

	// post请求
	async post<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		return await this.request<T>(config, 'POST');
	}

	// put请求
	async put<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		return await this.request<T>(config, 'PUT');
	}

	// delete请求
	async delete<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		return await this.request<T>(config, 'DELETE');
	}
}

const myAxios: MyAxios = new MyAxios();

// 测试get
// 添加请求拦截器，添加统一的请求头
myAxios.useRequestInterceptor((config: RequestConfig) => {
	config.headers = {
		...config.headers,
		'X-My-Custom-Header': 'CustomHeaderValue',
	};
	return config;
});

// 添加响应拦截器，对响应数据进行一些处理
myAxios.useResponseInterceptor((response: AxiosResponse<any>) => {
	// 对响应数据进行处理，这里只是简单的加了一个字段
	response.data = {
		...response.data,
		fromInterceptor: '来自响应拦截器，这是ツユ的歌曲列表:',
	};
	return response;
});

// 发送请求，查看拦截器是否生效
myAxios.get('http://162.14.111.196:4000/artist/songs?id=34505358').then((res: AxiosResponse) => {
	console.log('测试get\n');

	console.log(res);
	console.log(res.data.fromInterceptor + '\n');

	res.data.songs.forEach((song: any) => {
		console.log(song.al.name);
		if (song.tns) {
			console.log(song.tns[0]);
		}
		console.log();
	});
});

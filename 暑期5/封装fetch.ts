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
	// get请求，能传url或者config对象，所以重载下
	async get<T = any>(url: string): Promise<AxiosResponse<T>>;
	async get<T = any>(config: RequestConfig): Promise<AxiosResponse<T>>;
	async get<T = any>(url_or_config: string | RequestConfig): Promise<AxiosResponse<T>> {
		let config: RequestConfig;
		if (typeof url_or_config === 'string') {
			config = { url: url_or_config };
		} else {
			config = url_or_config;
		}
		const res: Response = await fetch(config.url);
		return this.handleResponse<T>(res, config);
	}
	// post请求
	async post<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		const res: Response = await fetch(config.url, {
			method: 'POST',
			body: JSON.stringify(config.body),
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
		});
		return this.handleResponse<T>(res, config);
	}
	// put请求
	async put<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		const res: Response = await fetch(config.url, {
			method: 'PUT',
			body: JSON.stringify(config.body),
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
		});
		return this.handleResponse<T>(res, config);
	}
	// delete请求
	async delete<T = any>(config: RequestConfig): Promise<AxiosResponse<T>> {
		const res: Response = await fetch(config.url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
		});
		return this.handleResponse<T>(res, config);
	}

	// 处理fetch的返回值让它更像axios的返回值
	async handleResponse<T>(res: Response, config: RequestConfig): Promise<AxiosResponse<T>> {
		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`);
		}
		const data: T = await res.json();
		// status和statusText一样，就不用单独处理，后面直接赋值
		const headers: Record<string, string> = {};
		res.headers.forEach((value: string, key: string) => {
			headers[key] = value;
		});
		const axiosRes: AxiosResponse<T> = {
			data,
			status: res.status,
			statusText: res.statusText,
			headers,
			config,
			// 只能空着了
			request: {},
		};
		return axiosRes;
	}
}

const myAxios: MyAxios = new MyAxios();

// 测试get
myAxios.get('http://162.14.111.196:4000/artist/songs?id=34505358').then((res: AxiosResponse) => {
	console.log('测试get\n');

	console.log(res);

	console.log(`${res.data.songs[0].ar[0].name}作品:\n`);
	res.data.songs.forEach((song: any) => {
		console.log(song.al.name);
		if (song.tns) {
			console.log(song.tns[0]);
		}
		console.log();
	});
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MyAxios {
    constructor() {
        // 添加请求和响应拦截器数组
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }
    // 在发送请求前可以添加请求拦截器
    useRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
    }
    // 在收到响应后可以添加响应拦截器
    useResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
    }
    // fetch请求调用
    request(config, method) {
        return __awaiter(this, void 0, void 0, function* () {
            // 请求拦截器
            this.requestInterceptors.forEach((interceptor) => {
                config = interceptor(config);
            });
            const res = yield fetch(config.url, {
                method,
                body: config.body ? JSON.stringify(config.body) : undefined,
                headers: Object.assign({ 'Content-Type': 'application/json' }, config.headers),
            });
            // 处理fetch的返回值让它更像axios的返回值
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = yield res.json();
            // status和statusText一样，就不用单独处理，后面直接赋值
            const headers = {};
            res.headers.forEach((value, key) => {
                headers[key] = value;
            });
            let axiosResponse = {
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
        });
    }
    get(url_or_config) {
        return __awaiter(this, void 0, void 0, function* () {
            let config;
            if (typeof url_or_config === 'string') {
                config = { url: url_or_config };
            }
            else {
                config = url_or_config;
            }
            return yield this.request(config, 'GET');
        });
    }
    // post请求
    post(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(config, 'POST');
        });
    }
    // put请求
    put(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(config, 'PUT');
        });
    }
    // delete请求
    delete(config) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request(config, 'DELETE');
        });
    }
}
const myAxios = new MyAxios();
// 测试get
// 添加请求拦截器，添加统一的请求头
myAxios.useRequestInterceptor((config) => {
    config.headers = Object.assign(Object.assign({}, config.headers), { 'X-My-Custom-Header': 'CustomHeaderValue' });
    return config;
});
// 添加响应拦截器，对响应数据进行一些处理
myAxios.useResponseInterceptor((response) => {
    // 对响应数据进行处理，这里只是简单的加了一个字段
    response.data = Object.assign(Object.assign({}, response.data), { fromInterceptor: '来自响应拦截器，这是ツユ的歌曲列表:' });
    return response;
});
// 发送请求，查看拦截器是否生效
myAxios.get('http://162.14.111.196:4000/artist/songs?id=34505358').then((res) => {
    console.log('测试get\n');
    console.log(res);
    console.log(res.data.fromInterceptor + '\n');
    res.data.songs.forEach((song) => {
        console.log(song.al.name);
        if (song.tns) {
            console.log(song.tns[0]);
        }
        console.log();
    });
});

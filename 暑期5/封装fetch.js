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
    get(url_or_config) {
        return __awaiter(this, void 0, void 0, function* () {
            let config;
            if (typeof url_or_config === 'string') {
                config = { url: url_or_config };
            }
            else {
                config = url_or_config;
            }
            const res = yield fetch(config.url);
            return this.handleResponse(res, config);
        });
    }
    // post请求
    post(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(config.url, {
                method: 'POST',
                body: JSON.stringify(config.body),
                headers: Object.assign({ 'Content-Type': 'application/json' }, config.headers),
            });
            return this.handleResponse(res, config);
        });
    }
    // put请求
    put(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(config.url, {
                method: 'PUT',
                body: JSON.stringify(config.body),
                headers: Object.assign({ 'Content-Type': 'application/json' }, config.headers),
            });
            return this.handleResponse(res, config);
        });
    }
    // delete请求
    delete(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(config.url, {
                method: 'DELETE',
                headers: Object.assign({ 'Content-Type': 'application/json' }, config.headers),
            });
            return this.handleResponse(res, config);
        });
    }
    // 处理fetch的返回值让它更像axios的返回值
    handleResponse(res, config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!res.ok) {
                throw new Error(`${res.status} ${res.statusText}`);
            }
            const data = yield res.json();
            // status和statusText一样，就不用单独处理，后面直接赋值
            const headers = {};
            res.headers.forEach((value, key) => {
                headers[key] = value;
            });
            const axiosRes = {
                data,
                status: res.status,
                statusText: res.statusText,
                headers,
                config,
                // 只能空着了
                request: {},
            };
            return axiosRes;
        });
    }
}
const myAxios = new MyAxios();
// 测试get
myAxios.get('http://162.14.111.196:4000/artist/songs?id=34505358').then((res) => {
    console.log('测试get\n');
    console.log(res);
    console.log(`${res.data.songs[0].ar[0].name}作品:\n`);
    res.data.songs.forEach((song) => {
        console.log(song.al.name);
        if (song.tns) {
            console.log(song.tns[0]);
        }
        console.log();
    });
});

const http = axios.create({
    // 统一请求前缀
    baseURL: 'http://127.0.0.1:8888',
    // 是否允许跨域时候携带资源凭证
    withCredentials: false,
    // 请求成功的状态码校验规则
    validateStatus: status => {
        return status >= 200 && status < 400;
    },
    // 请求头统一处理「设置请求主体专递给服务器的数据格式」
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    // POST系列请求，请求主体传递信息的格式化
    transformRequest: (data, headers) => {
        if (data !== null && typeof data === "object") {
            const ct = headers['Content-Type'];
            if (ct === "application/x-www-form-urlencoded") {
                return qs.stringify(data);
            }
        }
        return data;
    }
});

// 请求拦截器：向服务器发送请求之前
http.interceptors.request.use(config => {
    // ...
    return config;
});

// 响应拦截器：获取到响应信息 ~ 自己处理业务逻辑之间
http.interceptors.response.use(response => {
    // 获取响应主体信息
    return response.data;
}, reason => {
    // 失败的统一处理「一般就是做相关的提示或者其它操作」
    let response = reason.response;
    if (response) {
        // 服务器有返回值，但是状态码不符合validateStatus校验规则
        switch (response.status) {
            case 400:
                // ...
                break;
            case 401:
                // ...
                break;
        }
    } else {
        // 服务器没有返回任何的信息
        if (reason && reason.code === "ECONNABORTED") {
            // 超时或者请求中断
        }
        if (!navigator.onLine) {
            // 网络出现故障
        }
    }
    return Promise.reject(reason);
});

export default http;
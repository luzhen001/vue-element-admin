import axios from 'axios'
import store from '@/store'
import { MessageBox, Message } from 'element-ui'

/**
 * 封装提示信息
 * @param {*} msg
 */
const tipMsg = (msg) => {
    Message({
        message: msg,
        type: 'error',
        duration: 3000,
        showClose: true
    });
}
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //url = base url + request url
    withCredentials: true,
    timeout: 3000 //超时时间
})
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['keyType'] = 'app';
            config.headers['accessKey'] = 'e05b093ae5a5492dad8df0421a2b8888';
            config.headers['secretKey'] = '3cc256234ffa48ec9fd4997ad3ee6666';
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            config.headers['Access-Control-Allow-Origin'] = '*';
            config.headers['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type';
            config.headers['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS';
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 0) {
            Message.closeAll();
            tipMsg(res.message || 'Error');
            //50008: 非法的token; 50012: 其他客户端登录了; 50014: Token 过期了;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload();
                    });
                });
            }
            return Promise.reject(new Error(res.message || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        if (error.message.includes('timeout')) {
            error.message = '请求超时！';
        }else{
            if (error && error.response) {
                //服务器返回结果
                switch (error.response.status) {
                    case 400:
                        error.message = '请求错误！';
                        break;
                    case 401:
                        error.message = '未授权，请重新登录！';
                        break;
                    case 403:
                        error.message = '拒绝访问！'; //token过期
                        break;
                    case 404:
                        error.message = '请求错误,未找到该资源！';
                        break;
                    case 405:
                        error.message = '请求方法未被允许！';
                        break;
                    case 408:
                        error.message = '请求超时！';
                        break;
                    case 500:
                        error.message = '服务器错误！';
                        break;
                    case 501:
                        error.message = '网络未实现！';
                        break;
                    case 502:
                        error.message = '网络错误！';
                        break;
                    case 503:
                        error.message = '服务不可用！';
                        break;
                    case 504:
                        error.message = '网络超时！';
                        break;
                    case 505:
                        error.message = 'HTTP版本不受支持！';
                        break;
                    default:
                        error.message = `连接出错(${error.response.status})!`;
                }
            }else{
                //服务器没有返回结果
                if (!window.navigator.onLine) {
                    //断网处理：可以跳转到断网页面
                    return;
                }
                error.message = '连接服务器失败！';
            }
        }
        Message.closeAll();
        tipMsg(error.message);
        return Promise.reject(error);
    }
)
export default service;
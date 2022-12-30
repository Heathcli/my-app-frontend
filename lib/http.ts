import { message } from 'antd'
import lodash from 'lodash'
import axios from 'axios'
import { getCookie, isNodeEnv } from './util'

const instance = axios.create({ 
    baseURL: 'http://localhost:3333/',
    withCredentials:true
 })
// 未登陆的状态码
const loginErrorCode = [-99,-2,-1]

const success = (res:any, resolve:any, reject:any) => {
    if (res.data.code === 0) {
        resolve(res.data.data);
    } else if (lodash.get(res, 'data.msg')) {
        reject(res.data.msg);
        !isNodeEnv() && message.error(res.data.msg);
        if(loginErrorCode.includes(lodash.get(res, 'data.code')) && window.location.href !== '/user/login') {
            window.location.href = '/user/login'
        }
    } else {
        reject('系统异常');
        !isNodeEnv() && message.error('系统异常');
    }
}

const failure = (err:any, reject:any) => {
    !isNodeEnv() && message.error('请求异常');
    reject(err);
}

export default {
    get: (url:string, params = {}, config = {}) => {
        let data = Object.assign({}, params)
        return new Promise((resolve, reject) => {
            instance
                .post(url, data, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    },
    post: (url:string, params = {}, config = {}) => {
        return new Promise((resolve, reject) => {
            instance
                .post(url, params, config)
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    },
    // 文件上传
    upload: (url:string,type:string, file:any) => {
        let formData = new FormData()
        formData.append(type, file)
        return new Promise((resolve, reject) => {
            instance
                .post(url, formData, {
                    transformRequest: [function(data, headers:any) {
                        // 去除post请求默认的Content-Type
                        delete headers.post['Content-Type']
                        return data
                      }],
                    data: formData,
                    headers:{'Authorization': getCookie('token')}
                })
                .then(res => success(res, resolve, reject))
                .catch(err => failure(err, reject));
        });
    }
}
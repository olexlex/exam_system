
import axios from "axios";
import router from '../router'
import { Notification } from 'element-ui';
let config = {
  baseURL: 'http://82.156.166.79:23333',//配置生产环境路径和开发路径
  withCredentials: true, // 允许跨域
};

const _axios = axios.create(config);

//配置请求的参数
_axios.interceptors.request.use(config => {
  //配置token
  if (localStorage.getItem('token')) {
    config.headers['Token'] = localStorage.getItem('token');
  }
  return config;
}, error => {
  return Promise.reject(error);
})
//配置响应的参数
_axios.interceptors.response.use(response => {
//当token过期或者不存在时，后台返回状态码401，此时页面跳转到登录页面
   if (response.status === 401) {
    router.push({ path: "/login" });
    Notification({
      message: "登录信息已过期,请重新登录",
      type: "error",
    });
    return ;
  }
  return response

}, error => {
  return Promise.reject(error);
});

export default _axios

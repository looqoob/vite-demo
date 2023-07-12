import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 请求拦截器回调注入的对象，需要1返回
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  // 请求成功的回调
  return response
}, (error) => {
  // 请求失败的回调
  // 获取状态码处理错误
  let status = error.response.status;
  switch(status) {
    case 404:
      ElMessage({
        type: 'error',
        message: error.message
      })
      break;
    case 500 | 501 | 502 | 503 | 504 | 505:
      ElMessage({
        type: 'error',
        message: "服务器挂了"
      })
      break;
  }
  return Promise.reject(new Error(error.message))
})

// 对外暴露
export default request
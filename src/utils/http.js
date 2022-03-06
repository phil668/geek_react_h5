import { Toast } from 'antd-mobile'
import axios from 'axios'

// 创建请求对象
const instance = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0/',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    console.log('request-拦截器')
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log('response-拦截器')

    // 对响应数据做点什么
    // 吞掉多余的data
    return response
  },
  function (error) {
    if (!error.response) {
      Toast.show('Service Error')
      return Promise.reject(error)
    }
    Toast.show(error.response.data.message)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 暴露出去
export default instance

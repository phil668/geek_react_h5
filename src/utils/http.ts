import { Toast } from 'antd-mobile'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getToken } from './storage'
import { history } from './history'
import store from '@/store'
import { loginMutation, logout } from '@/store/actions/login'

// 创建请求对象
const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: AxiosRequestConfig<any>) {
    if (JSON.stringify(getToken()) !== '{}') {
      config!.headers!.Authorization = `Bearer ${getToken().token}`
    }
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
    // 对响应数据做点什么
    // 吞掉多余的data
    return response
  },
  async function (error: AxiosError) {
    console.dir(error)
    if (!error.response) {
      Toast.show('Service Error')
      return Promise.reject(error)
    }
    // 如果token过期,尝试无感刷新token
    if (error.response.status === 401) {
      try {
        // 如果发现没有refresh_token就直接退出重新登录
        if (!getToken().refresh_token) {
          Toast.show({
            icon: 'error',
            content: '登录过期',
          })
          store.dispatch(logout())
          history.replace('/login', { from: history.location.pathname })
          return Promise.reject(error)
        } else {
          // 如果有refresh_token尝试换取新的token
          // 换取token
          const res = await axios({
            url: '/authorizations',
            baseURL: 'http://geek.itheima.net/v1_0/',
            method: 'put',
            headers: {
              Authorization: `Bearer ${getToken().refresh_token}`,
            },
          })
          // 保存最新的token
          store.dispatch(
            loginMutation({
              token: res.data.data.token,
              refresh_token: getToken().refresh_token,
            })
          )
          // 继续上一次的请求
          return instance(error.config)
        }
      } catch (error) {
        Toast.show({
          icon: 'fail',
          content: '登录过期',
        })
        store.dispatch(logout())
        history.replace('/login', { from: history.location.pathname })
        return Promise.reject(error)
      }
    }
    Toast.show(error.response.data.message)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 暴露出去
export default instance

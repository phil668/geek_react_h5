// 存放数据的类型

import { AxiosPromise } from 'axios'

// 登录的表单数据
export type LoginForm = {
  mobile: string
  code: string
}

// 服务器返回的Token数据的类型
export type Token = {
  token: string
  refresh_token: string
}

// axios的返回数据类型
export interface MyAxiosPromise<T>
  extends AxiosPromise<{ data: T; message: string }> {}

import { UserInfo } from './data.d'
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

// 服务器返回的用户信息数据类型
export type UserInfo = {
  art_count: number
  fans_count: number
  follow_count: number
  id: string
  like_count: number
  name: string
  photo: string
}

export type Profile = {
  id: string
  name: string
  photo: string
  mobile: string
  gender: number
  birthday: string
  intro?: string
}

// 服务器返回的频道数据
export type channel = {
  id: number
  name: string
}

// axios的返回数据类型
export interface MyAxiosPromise<T>
  extends AxiosPromise<{ data: T; message: string }> {}

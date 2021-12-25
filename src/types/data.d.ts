// 存放数据的类型

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

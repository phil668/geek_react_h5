import { UserInfoAction } from './store.d'
// 保存Redux的类型

// 导入仓库
import store from '@/store'

// 导入 thunk中间件提供的 工具类型
import { ThunkAction } from 'redux-thunk'
import { Token, Profile, UserInfo } from './data'

// store中的RootState
export type RootState = ReturnType<typeof store.getState>
// Action的类型
export type LoginAction = {
  type: 'login/login'
  payload: Token
}
export type LogoutAction = {
  type: 'login/logout'
  payload: Token
}
export type ProfileAction = {
  type: 'profile/profile'
  payload: Profile
}
export type UserInfoAction = {
  type: 'profile/user'
  payload: UserInfo
}

export type RootAction = LoginAction | ProfileAction | UserInfoAction

// thunk中间件的类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

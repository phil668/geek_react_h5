import { channel } from './data.d'
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
}
export type ProfileAction = {
  type: 'profile/profile'
  payload: Profile
}
export type UserInfoAction = {
  type: 'profile/user'
  payload: UserInfo
}
export type channelAction =
  | {
      type: 'home/saveUserChannel'
      payload: channel[]
    }
  | {
      type: 'home/saveAllChannel'
      payload: channel[]
    }
  | {
      type: 'home/saveActiveId'
      payload: number
    }
  | {
      type: 'home/delUserChannel'
      payload: number
    }

export type RootAction =
  | LoginAction
  | ProfileAction
  | UserInfoAction
  | LogoutAction
  | channelAction

// thunk中间件的类型
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

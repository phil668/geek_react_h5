import { login } from '@/api'
import { LoginForm, Token } from '@/types/data'
import { RootThunkAction, LogoutAction, LoginAction } from '@/types/store'
import { removeToken, setToken } from '@/utils/storage'

// 设置token的生成器
function loginMutation(token: Token): LoginAction {
  setToken(token)
  return {
    type: 'login/login',
    payload: token,
  }
}

// 登录的 action生成器
function loginAction(data: LoginForm): RootThunkAction {
  return async (dispatch) => {
    // 调用接口
    const res = await login(data)
    // setToken(res.data.data)
    // // 更新仓库的数据
    // dispatch({
    //   type: 'login/login',
    //   payload: res.data.data,
    // })
    loginMutation(res.data.data)
  }
}

function logout(): LogoutAction {
  removeToken()
  return {
    type: 'login/logout',
  }
}
// 退出登录
function logoutAction(): RootThunkAction {
  return async (dispatch) => {
    dispatch(logout())
  }
}

export { loginAction, logoutAction, logout, loginMutation }

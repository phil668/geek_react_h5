import { login } from '@/api'
import { LoginForm } from '@/types/data'
import { RootThunkAction } from '@/types/store'
import { setToken } from '@/utils/storage'

// 登录的 action生成器
function loginAction(data: LoginForm): RootThunkAction {
  return async (dispatch) => {
    // 调用接口
    const res = await login(data)
    setToken(res.data.data)
    // 更新仓库的数据
    dispatch({
      type: 'login/login',
      payload: res.data.data,
    })
  }
}

export { loginAction }

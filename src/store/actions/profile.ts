import { RootThunkAction } from '@/types/store'
import { getUserInfo, getUserInfoReal } from '@/api/profile'

export function profileAction(): RootThunkAction {
  return async (dispatch) => {
    const res = await getUserInfo()
    dispatch({
      type: 'profile/profile',
      payload: res.data.data,
    })
  }
}

export function UserInfoAction(): RootThunkAction {
  return async (dispatch) => {
    const res = await getUserInfoReal()
    dispatch({
      type: 'profile/user',
      payload: res.data.data,
    })
  }
}

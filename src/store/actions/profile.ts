import { RootThunkAction } from '@/types/store'
import {
  getUserInfo,
  getUserInfoReal,
  editUserProfile,
  editPhoto,
} from '@/api/profile'

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

export function editProfileAction(key: string, value: string): RootThunkAction {
  return async (dispatch) => {
    const res = await editUserProfile(key, value)
    console.log(res)
    await dispatch(profileAction())
  }
}

// 修改用户头像
export function editPhotoAction(data: FormData): RootThunkAction {
  return async (dispatch) => {
    const res = await editPhoto(data)
    console.log(res)
    await dispatch(profileAction())
  }
}

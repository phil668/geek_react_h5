import { Profile, UserInfo } from '@/types/data'
import { ProfileAction, UserInfoAction } from '@/types/store'

type ProfileState = {
  profile: Profile
  userInfo: UserInfo
}

export default function userInfo(
  state: ProfileState = { profile: {}, userInfo: {} } as ProfileState,
  action: ProfileAction | UserInfoAction
) {
  switch (action.type) {
    case 'profile/profile':
      return { ...state, profile: action.payload }
    case 'profile/user':
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

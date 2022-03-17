import { MyAxiosPromise, Profile, UserInfo } from '@/types/data'
import http from '@/utils/http'

export function getUserInfo(): MyAxiosPromise<Profile> {
  return http({
    url: '/user/profile',
  })
}

export function getUserInfoReal(): MyAxiosPromise<UserInfo> {
  return http({
    url: '/user',
  })
}

// 编辑用户个人资料
export function editUserProfile(key: string, value: string) {
  return http({
    url: '/user/profile',
    method: 'patch',
    data: {
      [key]: value,
    },
  })
}

// 编辑头像
export function editPhoto(data: FormData) {
  return http({
    url: '/user/photo',
    method: 'patch',
    data,
  })
}

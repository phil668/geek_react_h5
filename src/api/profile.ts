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

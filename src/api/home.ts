import { MyAxiosPromise, channel } from '@/types/data'
import http from '@/utils/http'

function getUserChannel(): MyAxiosPromise<{ channels: channel[] }> {
  return http({
    url: '/user/channels',
    method: 'get',
  })
}

function getAllChannel(): MyAxiosPromise<{ channels: channel[] }> {
  return http({
    url: '/channels',
  })
}

export { getUserChannel, getAllChannel }

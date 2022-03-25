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

// 删除频道
function delUserChannel(id: number) {
  return http({
    url: `/user/channels/${id}`,
    method: 'delete',
  })
}

// 增加频道
function addUserChannel(id: number) {
  return http({
    url: '/user/channels',
    method: 'patch',
    data: {
      channels: [
        {
          id,
        },
      ],
    },
  })
}

export { getUserChannel, getAllChannel, delUserChannel, addUserChannel }

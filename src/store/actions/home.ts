import { getUserChannel } from '@/api/home'
import { RootThunkAction } from '@/types/store'
import { getToken, setChannels, getChannels } from '@/utils/storage'

export function userChannelAction(): RootThunkAction {
  return async (dispatch) => {
    // 如果用户登录了就调用接口获取用户自己的频道
    if (JSON.stringify(getToken()) !== '{}') {
      const res = await getUserChannel()
      setChannels(res.data.data.channels)
      return dispatch({
        type: 'home/saveUserChannel',
        payload: res.data.data.channels,
      })
    } else {
      // 如果没有登录
      // 如果本地有缓存
      if (getChannels().length) {
        return dispatch({
          type: 'home/saveUserChannel',
          payload: getChannels(),
        })
      } else {
        const res = await getUserChannel()
        setChannels(res.data.data.channels)
        return dispatch({
          type: 'home/saveUserChannel',
          payload: res.data.data.channels,
        })
      }
    }
  }
}

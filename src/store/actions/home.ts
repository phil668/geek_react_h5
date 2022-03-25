import { channel } from './../../types/data.d'
import {
  getUserChannel,
  getAllChannel,
  delUserChannel,
  addUserChannel,
} from '@/api/home'
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

// 获取全部频道
export function allChannelAction(): RootThunkAction {
  return async (dispatch) => {
    const res = await getAllChannel()
    dispatch({
      type: 'home/saveAllChannel',
      payload: res.data.data.channels,
    })
  }
}

// 设置active频道id
export function activeIdAction(id: number): RootThunkAction {
  return async (dispatch) => {
    dispatch({
      type: 'home/saveActiveId',
      payload: id,
    })
  }
}

// 删除频道
export function delChannelAction(id: number): RootThunkAction {
  return async (dispatch, getState) => {
    // 如果登录了
    if (JSON.stringify(getToken()) !== '{}') {
      const res = await delUserChannel(id)
    } else {
      const { userChannels } = getState().home
      userChannels.find((item) => {
        return item.id !== id
      })
    }
    await dispatch(userChannelAction())
  }
}

// 添加频道
export function addChannelAction(channel: {
  id: number
  name: string
}): RootThunkAction {
  return async (dispatch, getState) => {
    // 如果登录了
    if (JSON.stringify(getToken()) !== '{}') {
      const res = await addUserChannel(channel.id)
    } else {
      const { userChannels } = getState().home
      userChannels.push(channel)
    }
    await dispatch(userChannelAction())
  }
}

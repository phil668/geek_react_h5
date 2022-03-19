import { channel } from './../../types/data.d'
import { channelAction } from '@/types/store'

type homeState = {
  userChannels: channel[]
}

export default function HomeReducer(
  state: homeState = { userChannels: [] },
  action: channelAction
) {
  switch (action.type) {
    case 'home/saveUserChannel':
      return { ...state, userChannels: action.payload }
    default:
      return state
  }
}

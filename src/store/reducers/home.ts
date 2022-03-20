import { channel } from './../../types/data.d'
import { channelAction } from '@/types/store'

type homeState = {
  userChannels: channel[]
  allChannels: channel[]
  activeId: number
}

export default function HomeReducer(
  state: homeState = { userChannels: [], allChannels: [], activeId: 0 },
  action: channelAction
) {
  switch (action.type) {
    case 'home/saveUserChannel':
      return { ...state, userChannels: action.payload }
    case 'home/saveAllChannel':
      return { ...state, allChannels: action.payload }
    case 'home/saveActiveId':
      return { ...state, activeId: action.payload }
    default:
      return state
  }
}

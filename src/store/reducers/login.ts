import { LoginAction, LogoutAction } from '@/types/store'
import { getToken } from '@/utils/storage'

function loginReducer(state = getToken(), action: LoginAction | LogoutAction) {
  switch (action.type) {
    case 'login/login':
      return action.payload
    case 'login/logout':
      return {}
    default:
      return state
  }
}

export default loginReducer

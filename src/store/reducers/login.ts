import { LoginAction } from '@/types/store'
import { getToken } from '@/utils/storage'

function loginReducer(state = getToken(), action: LoginAction) {
  switch (action.type) {
    case 'login/login':
      return action.payload
    default:
      return state
  }
}

export default loginReducer

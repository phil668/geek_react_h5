import { LoginAction } from '@/types/store'

function loginReducer(state = {}, action: LoginAction) {
  switch (action.type) {
    case 'login/login':
      return action.payload
    default:
      return state
  }
}

export default loginReducer

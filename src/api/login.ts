// 导入请求对象
import { LoginForm } from '@/types/data'
import http from '@/utils/http'

function login(data: LoginForm) {
  return http({
    url: '/authorizations',
    method: 'post',
    data,
  })
}

export { login }

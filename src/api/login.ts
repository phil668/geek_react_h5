// 导入请求对象
import { LoginForm } from '@/types/data'
import http from '@/utils/http'
import { MyAxiosPromise, Token } from '@/types/data'

export function login(data: LoginForm): MyAxiosPromise<Token> {
  return http({
    url: '/authorizations',
    method: 'post',
    data,
  })
}

// get sms code
export function getSmsCode(mobile: string) {
  return http({
    url: `/sms/codes/${mobile}`,
  })
}

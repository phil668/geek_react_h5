import { Token } from '@/types/data'

const TOKEN_KEY = 'geek_token'

export function setToken(value: Token): void {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(value))
}

export function getToken(): Token {
  return JSON.parse(window.localStorage.getItem(TOKEN_KEY) || '{}')
}

export function removeToken(): void {
  window.localStorage.removeItem(TOKEN_KEY)
}

export function hasToken(): boolean {
  return !!getToken()
}

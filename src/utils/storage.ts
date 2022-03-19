import { channel } from './../types/data.d'
import { Token } from '@/types/data'

const TOKEN_KEY = 'geek_token'
const GEEK_CHANNEL = 'geek_channel'

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

export function setChannels(value: channel[]): void {
  window.localStorage.setItem(GEEK_CHANNEL, JSON.stringify(value))
}

export function getChannels(): channel[] {
  return JSON.parse(window.localStorage.getItem(GEEK_CHANNEL) || '[]')
}

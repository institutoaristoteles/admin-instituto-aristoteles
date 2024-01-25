import { api } from '@/shared/services/api'
import { clearToken, saveToken } from '@/shared/services/token.service'
import { cache } from 'react'

interface LoginData {
  username: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: string
}

export const login = cache(async (username: string, password: string) => {
  const body = { username, password } satisfies LoginData
  const { data } = await api.post<LoginResponse>('/auth/login', body)
  saveToken(data.accessToken, data.refreshToken, new Date(data.expiresIn))
})

export function logout() {
  clearToken()
}

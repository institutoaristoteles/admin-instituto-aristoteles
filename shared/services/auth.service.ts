import { api } from '@/shared/services/api'
import { UserProfile } from '@/shared/models/user-profile'
import { clearToken, saveToken } from '@/shared/services/token.service'
import { cache } from 'react'

interface LoginData {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  refreshToken: string
}

export const login = cache(async (email: string, password: string) => {
  const body = { email, password } satisfies LoginData
  const { data } = await api.post<LoginResponse>('/auth/login', body)

  await saveToken(data.access_token, data.refreshToken)
})

export const logout = async () => {
  console.log('called')
  clearToken()
}

export const getUser = async () => {
  try {
    const { data } = await api.get<UserProfile>('/users/me')
    return data
  } catch (e) {
    return null
  }
}

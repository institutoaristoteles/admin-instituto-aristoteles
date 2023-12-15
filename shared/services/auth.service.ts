import { Role, UserProfile } from '@/shared/models/user-profile'
import { api } from '@/shared/services/api'
import { clearToken, saveToken } from '@/shared/services/token.service'
import React, { cache } from 'react'

interface LoginData {
  username: string
  password: string
}

interface LoginResponse {
  accessToken: string
  refreshToken: string
  expiresIn: string
}

interface JwtToken {
  status: 'confirmed' | 'unconfirmed'
  role: Role
  sub: string
  picture: string | undefined
  name: string
  email: string
  preferred_username: string
}

export const login = cache(async (username: string, password: string) => {
  const body = { username, password } satisfies LoginData
  const { data } = await api.post<LoginResponse>('/auth/login', body)
  saveToken(data.accessToken, data.refreshToken, new Date(data.expiresIn))
})

export function logout() {
  clearToken()
}

const mapJwtToUserProfile = React.cache(
  (jwt: JwtToken): UserProfile => ({
    id: jwt.sub,
    avatar: jwt.picture,
    name: jwt.name,
    email: jwt.email,
    username: jwt.preferred_username,
    role: jwt.role,
    status: jwt.status,
  }),
)

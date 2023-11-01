import { api } from '@/shared/services/api'
import { UserProfile } from '@/shared/models/user-profile'
import {
  ACCESS_TOKEN_COOKIE,
  clearToken,
  getToken,
  saveToken,
} from '@/shared/services/token.service'
import { cache } from 'react'
import { decodeJwt } from 'jose'

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

function mapJwtToUserProfile(jwt: JwtToken): UserProfile {
  return {
    id: jwt.sub,
    avatar: jwt.picture,
    name: jwt.name,
    email: jwt.email,
    username: jwt.preferred_username,
  }
}

export async function getUser(): Promise<UserProfile | undefined> {
  const accesToken = await getToken(ACCESS_TOKEN_COOKIE)
  if (accesToken) {
    const jwt = decodeJwt(accesToken) as unknown as JwtToken
    return mapJwtToUserProfile(jwt)
  }
}

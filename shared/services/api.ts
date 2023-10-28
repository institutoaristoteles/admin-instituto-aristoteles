import axios from 'axios'
import { ACCESS_TOKEN_COOKIE, getToken } from '@/shared/services/token.service'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(async (config) => {
  const accessToken = await getToken(ACCESS_TOKEN_COOKIE)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}, Promise.reject)

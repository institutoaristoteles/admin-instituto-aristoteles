import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export const ACCESS_TOKEN_COOKIE = 'accessToken'
export const REFRESH_TOKEN_COOKIE = 'refreshToken'

export function saveToken(access: string, refresh: string) {
  setCookie(ACCESS_TOKEN_COOKIE, access)
  setCookie(REFRESH_TOKEN_COOKIE, refresh)
}

export function clearToken() {
  deleteCookie(ACCESS_TOKEN_COOKIE)
  deleteCookie(REFRESH_TOKEN_COOKIE)
}

export async function getToken(name: string) {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    const { cookies } = await import('next/headers')
    return cookies().get(name)?.value
  } else {
    return getCookie(name)
  }
}

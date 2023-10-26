import { cookies } from 'next/headers'

export const ACCESS_TOKEN_COOKIE = 'accessToken'
export const REFRESH_TOKEN_COOKIE = 'refreshToken'

export async function saveToken(access: string, refresh: string) {
  const cookiesStore = cookies()
  cookiesStore.set(ACCESS_TOKEN_COOKIE, access)
  cookiesStore.set(REFRESH_TOKEN_COOKIE, refresh)
}

export function clearToken() {
  const cookiesStore = cookies()
  cookiesStore.delete(ACCESS_TOKEN_COOKIE)
  cookiesStore.delete(REFRESH_TOKEN_COOKIE)
}

export const getTokens = () => {
  return {
    accessToken: cookies().get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: cookies().get(REFRESH_TOKEN_COOKIE)?.value,
  }
}

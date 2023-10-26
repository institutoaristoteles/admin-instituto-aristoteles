'use server'

import { login, logout } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'
import { isAxiosError } from 'axios'

export const loginAction = async (_prevState: any, formData: FormData) => {
  try {
    const data = Object.fromEntries(formData) as {
      email: string
      password: string
    }

    await login(data.email, data.password)
  } catch (e) {
    const isAuthenticationError = isAxiosError(e) && e.response?.status === 401

    const message = !isAuthenticationError
      ? 'Ocorreu um erro'
      : 'Usuário ou senha inválidos'

    return { message }
  }

  redirect('/')
}

export const logoutAction = async () => {
  await logout()
  redirect('/')
}

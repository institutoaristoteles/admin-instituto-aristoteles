'use client'

import LoginButton from '@/shared/components/login-button'
import { login } from '@/shared/services/auth.service'
import { isAxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'
import { Password } from 'primereact/password'
import React, { FormEvent, useState } from 'react'

export default function LoginForm() {
  const [pending, setIsPending] = useState(false)
  const [error, setError] = useState<{ message: string | null }>({
    message: null,
  })
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsPending(true)

    const formData = new FormData(event.target as HTMLFormElement)

    const data = Object.fromEntries(formData) as {
      username: string
      password: string
    }

    try {
      await login(data.username, data.password)
      router.push('/')
    } catch (e) {
      const errorMessage =
        isAxiosError(e) && e.response?.status === 401
          ? 'Usuário ou senha inválidos'
          : 'Ocorreu um erro'

      setError({ message: errorMessage })
      setIsPending(false)
    }
  }

  return (
    <form
      className="flex flex-col items-center gap-5 w-full"
      onSubmit={handleSubmit}
    >
      {error.message && (
        <Message severity="error" text={error.message} className="w-full" />
      )}

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Usuário
        <InputText type="text" name="username" required />
      </label>

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Senha
        <Password
          type="password"
          inputClassName="w-full"
          feedback={false}
          name="password"
          required
        />
      </label>

      <div className="border-t border-t-surface-border fixed bottom-0 py-3 px-5 flex justify-end w-full md:relative md:p-0 md:border-none">
        <LoginButton pending={pending} className="md:w-full" />
      </div>
    </form>
  )
}

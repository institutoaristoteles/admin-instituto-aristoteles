'use client'

import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { useFormState } from 'react-dom'
import { Message } from 'primereact/message'
import React from 'react'
import { loginAction } from '@/shared/actions/auth'
import SubmitButton from '@/shared/components/login-button'
import { Button } from 'primereact/button'

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, { message: null })

  return (
    <form className="flex flex-col items-center gap-5 w-full" action={action}>
      {state.message && (
        <Message severity="error" text={state.message} className="w-full" />
      )}

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        E-mail
        <InputText type="email" id="email" name="email" required />
      </label>

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Senha
        <Password
          type="password"
          inputId="password"
          inputClassName="w-full"
          feedback={false}
          name="password"
          required
        />
      </label>

      <SubmitButton />

      <Button text label="Esqueci minha senha" type="button" size="small" />
    </form>
  )
}

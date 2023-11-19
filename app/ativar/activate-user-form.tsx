'use client'

import { UserProfile } from '@/shared/models/user-profile'
import { logout } from '@/shared/services/auth.service'
import {
  activateUser,
  ActivateUserPassword,
} from '@/shared/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const activateUserPasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
})

export default function ActivateUserForm({ user }: { user: UserProfile }) {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ActivateUserPassword>({
    resolver: zodResolver(activateUserPasswordSchema),
  })
  const router = useRouter()

  const oldPasswordField = register('oldPassword')
  const newPasswordField = register('newPassword')

  const logoutAndRedirect = useCallback(() => {
    logout()
    router.push('/')
  }, [router])

  const onSubmit = useCallback(
    async (values: ActivateUserPassword) => {
      setLoading(true)

      try {
        await activateUser(user.id, values)
        toast.success('Senha atualizada com sucesso!')
        logoutAndRedirect()
      } catch (e) {
        console.error(e)

        if (isAxiosError(e) && e.response?.status === 401) {
          setError('oldPassword', { message: 'Senha inválida' })
        }
      } finally {
        setLoading(false)
      }
    },
    [logoutAndRedirect, setError, user.id],
  )

  return (
    <div>
      <form
        className="flex flex-col items-start gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Senha atual
          <Password
            name={oldPasswordField.name}
            onChange={oldPasswordField.onChange}
            onBlur={oldPasswordField.onBlur}
            inputRef={oldPasswordField.ref}
            inputId={oldPasswordField.name}
            toggleMask
            feedback={false}
            className={clsx({ 'p-invalid': errors.oldPassword })}
            inputClassName="w-full"
            autoFocus
          />
          {errors.oldPassword && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.oldPassword.message}
            </span>
          )}
        </label>

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Nova senha
          <Password
            name={newPasswordField.name}
            onChange={newPasswordField.onChange}
            onBlur={newPasswordField.onBlur}
            inputRef={newPasswordField.ref}
            inputId={newPasswordField.name}
            toggleMask
            feedback={false}
            className={clsx({ 'p-invalid': errors.newPassword })}
            inputClassName="w-full"
          />
          {errors.newPassword && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.newPassword.message}
            </span>
          )}
        </label>

        <div className="flex flex-col w-full gap-2">
          <Button
            label="Confirmar nova senha"
            className="w-full"
            icon={PrimeIcons.CHECK}
            type="submit"
            loading={loading}
          />

          <Button
            label="Sair"
            className="w-full"
            icon={PrimeIcons.SIGN_OUT}
            type="button"
            outlined
            severity="danger"
            onClick={logoutAndRedirect}
          />
        </div>
      </form>
    </div>
  )
}

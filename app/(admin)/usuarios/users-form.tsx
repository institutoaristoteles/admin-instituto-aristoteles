'use client'

import TemporaryPasswordField from '@/shared/components/temporary-password-field'
import UserRolesField from '@/shared/components/user-roles-field'
import { UserRoles } from '@/shared/models/user-profile'
import { saveUser, SaveUser } from '@/shared/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Message } from 'primereact/message'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const PASSWORD_LENGTH = 8
const NAME_MIN_LENGTH = 3
const USERNAME_MIN_LENGTH = 3
const USERNAME_PATTERN = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

const roleKeys = Object.keys(UserRoles) as [string, ...string[]]

const saveUserSchema = z.object({
  name: z
    .string()
    .min(
      NAME_MIN_LENGTH,
      `Nome do usuário deve conter ao menos ${NAME_MIN_LENGTH} caracteres`,
    ),
  username: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Usuário deve conter ao menos ${USERNAME_MIN_LENGTH} caracteres`,
    )
    .regex(USERNAME_PATTERN, 'Formato incorreto de usuário'),
  email: z.string().email('Informe um endereço de e-mail válido'),
  password: z
    .string({ coerce: true })
    .min(
      PASSWORD_LENGTH,
      `A senha deve possuir ao menos ${PASSWORD_LENGTH} caracteres`,
    ),
  role: z.enum(roleKeys),
})

export default function UsersForm() {
  const methods = useForm<SaveUser>({
    resolver: zodResolver(saveUserSchema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: { role: 'editor' },
  })
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = useCallback(async (values: SaveUser) => {
    setLoading(true)
    try {
      await saveUser(values)
      setSuccess(true)
      toast.success('Usuário criado com sucesso')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <FormProvider {...methods}>
      <form
        className="max-w-prose flex flex-col items-start gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {success && (
          <Message
            text="Usuário criado com successo"
            severity="success"
            className="w-full"
          />
        )}

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Nome
          <InputText
            {...register('name')}
            className={clsx({ 'p-invalid': errors.name })}
            disabled={success}
            autoFocus
          />
          {errors.name && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Usuário
          <InputText
            {...register('username')}
            disabled={success}
            className={clsx({ 'p-invalid': errors.username })}
          />
          {errors.username && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.username.message}
            </span>
          )}
        </label>

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          E-mail
          <InputText
            {...register('email')}
            type="email"
            disabled={success}
            className={clsx({ 'p-invalid': errors.email })}
          />
          {errors.email && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.email.message}
            </span>
          )}
        </label>

        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-bold flex flex-col items-start gap-1 w-full">
            Perfil
          </label>

          <UserRolesField disabled={success} />
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <label
            className="text-sm font-bold flex flex-col items-start gap-1 w-full"
            htmlFor="password"
          >
            Senha Provisória
          </label>
          <TemporaryPasswordField disabled={success} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            label="Salvar"
            type="submit"
            icon={PrimeIcons.SAVE}
            disabled={success}
            loading={loading}
          />

          <Link href="/usuarios">
            <Button
              label="Voltar"
              outlined
              type="button"
              icon={PrimeIcons.TIMES}
            />
          </Link>
        </div>
      </form>
    </FormProvider>
  )
}

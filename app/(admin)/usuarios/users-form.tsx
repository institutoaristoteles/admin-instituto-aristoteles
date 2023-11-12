'use client'

import TemporaryPasswordField from '@/shared/components/temporary-password-field'
import UserRolesField from '@/shared/components/user-roles-field'
import { UserRoles } from '@/shared/models/user-profile'
import { SaveUser } from '@/shared/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const PASSWORD_LENGTH = 8
const USERNAME_MIN_LENGTH = 3
const USERNAME_PATTERN = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

const roleKeys = Object.keys(UserRoles) as [string, ...string[]]

const saveUserSchema = z.object({
  username: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Nome de usuário deve conter ao menos ${USERNAME_MIN_LENGTH} caracteres`,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = async (values: SaveUser) => {
    console.table(values)
  }

  return (
    <FormProvider {...methods}>
      <form
        className="max-w-prose flex flex-col items-start gap-5 max-md:pb-24"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          E-mail
          <InputText
            {...register('email')}
            type="email"
            className={clsx({ 'p-invalid': errors.email })}
            autoFocus
          />
          {methods.formState.errors.email && (
            <span className="text-[#ff7b7b] font-normal">
              {methods.formState.errors.email.message}
            </span>
          )}
        </label>

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Usuário
          <InputText
            {...register('username')}
            className={clsx({ 'p-invalid': errors.username })}
          />
          {errors.username && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.username.message}
            </span>
          )}
        </label>

        <div className="flex flex-col items-start gap-1 w-full">
          <label
            className="text-sm font-bold flex flex-col items-start gap-1 w-full"
            htmlFor="password"
          >
            Senha temporária
          </label>

          <TemporaryPasswordField />
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-bold flex flex-col items-start gap-1 w-full">
            Perfil
          </label>

          <UserRolesField />
        </div>

        <div
          className={`
          max-md:fixed
          max-md:bg-surface-b
          max-md:bottom-0 max-md:left-0
          w-full
          max-md:px-5 max-md:py-3
          max-md:border-t border-t-surface-border
          flex items-center justify-between gap-2 md:justify-end md:flex-row-reverse
        `}
        >
          <Link href="/usuarios">
            <Button
              label="Voltar"
              outlined
              type="button"
              icon={PrimeIcons.TIMES}
            />
          </Link>

          <Button label="Salvar" type="submit" icon={PrimeIcons.SAVE} />
        </div>
      </form>
    </FormProvider>
  )
}

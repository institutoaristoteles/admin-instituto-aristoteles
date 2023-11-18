'use client'

import UserRolesField from '@/shared/components/user-roles-field'
import { UserRoles } from '@/shared/models/user-profile'
import { SaveUser } from '@/shared/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { generate } from 'generate-password'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { RadioButton } from 'primereact/radiobutton'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

const PASSWORD_LENGTH = 8
const USERNAME_MIN_LENGTH = 3
const USERNAME_PATTERN = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

const roleKeys = Object.keys(UserRoles) as [string, ...string[]]

const saveUserSchema = z.object({
  name: z.string().min(3, 'Mínimo de 3 caracteres'),
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

function generatePassword() {
  return generate({
    length: 24,
    numbers: true,
    strict: true,
  })
}

export default function UsersForm() {
  const methods = useForm<SaveUser>({
    resolver: zodResolver(saveUserSchema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: { role: 'editor' },
  })
  const [customPassword, setCustomPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setValue,
  } = methods

  const handlePasswordType = useCallback(
    (usesCustomPassword: boolean) => () => {
      setCustomPassword(usesCustomPassword)
      const newPasswordOrEmpty = !usesCustomPassword ? generatePassword() : ''
      setValue('password', newPasswordOrEmpty)
      clearErrors('password')
    },
    [clearErrors, setValue],
  )

  const onSubmit = async (values: SaveUser) => {
    console.table(values)
  }

  const passwordField = register('password')

  return (
    <FormProvider {...methods}>
      <form
        className="max-w-prose flex flex-col items-start gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          Nome
          <InputText
            {...register('name')}
            className={clsx({ 'p-invalid': errors.name })}
            autoFocus
          />
          {methods.formState.errors.name && (
            <span className="text-[#ff7b7b] font-normal">
              {methods.formState.errors.name.message}
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

        <label className="text-sm font-bold flex flex-col gap-1 w-full">
          E-mail
          <InputText
            {...register('email')}
            type="email"
            className={clsx({ 'p-invalid': errors.email })}
          />
          {methods.formState.errors.email && (
            <span className="text-[#ff7b7b] font-normal">
              {methods.formState.errors.email.message}
            </span>
          )}
        </label>

        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-bold flex flex-col items-start gap-1 w-full">
            Perfil
          </label>

          <UserRolesField />
        </div>

        <div className="flex flex-col items-start gap-1 w-full">
          <label
            className="text-sm font-bold flex flex-col items-start gap-1 w-full"
            htmlFor="password"
          >
            Senha Provisória
          </label>
          <div className="flex flex-col gap-5 py-5">
            <label className="flex items-center gap-2">
              <RadioButton
                onChange={handlePasswordType(false)}
                checked={!customPassword}
              />
              Gerar automaticamente
            </label>

            <label className="flex items-center gap-2">
              <RadioButton
                onChange={handlePasswordType(true)}
                checked={customPassword}
              />
              Personalizada
            </label>
          </div>

          {customPassword && (
            <Password
              {...passwordField}
              inputRef={passwordField.ref}
              inputId={passwordField.name}
              autoFocus
              toggleMask
              feedback={false}
              inputClassName="w-full"
              className={clsx('w-full', { 'p-invalid': errors.password })}
            />
          )}

          {errors.password && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button label="Salvar" type="submit" icon={PrimeIcons.SAVE} />

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

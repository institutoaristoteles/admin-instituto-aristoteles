'use client'

import SuccessUserDialog from '@/app/(admin)/usuarios/novo/success-user-dialog'
import LabeledInput from '@/shared/components/labeled-input'
import UserRolesField from '@/shared/components/user-roles-field'
import { UserRoles } from '@/shared/models/user-profile'
import { saveUser, SaveUser } from '@/shared/services/users.service'
import { isConflictError } from '@/shared/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

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
  role: z.enum(roleKeys),
})

function hasConflictOn(field: keyof SaveUser, e: unknown) {
  return isConflictError(e) && e.response?.data.messages.includes(field)
}

export default function UsersForm() {
  const methods = useForm<SaveUser>({
    resolver: zodResolver(saveUserSchema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: { role: 'editor' },
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [userCreated, setUserCreated] = useState<SaveUser>()

  const onHide = useCallback(() => {
    router.push('/usuarios')
    router.refresh()
  }, [router])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods

  const onSubmit = useCallback(
    async (values: SaveUser) => {
      setLoading(true)
      try {
        await saveUser(values)
        setUserCreated(values)
      } catch (e) {
        console.error(e)

        if (hasConflictOn('username', e)) {
          setError('username', {
            message: 'Este nome de usuário já está em uso',
          })
        }

        if (hasConflictOn('email', e)) {
          setError('email', { message: 'Este e-mail já está em uso' })
        }
      } finally {
        setLoading(false)
      }
    },
    [setError],
  )

  return (
    <FormProvider {...methods}>
      <form
        className="max-w-prose flex flex-col items-start gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabeledInput label="Nome">
          <InputText
            {...register('name')}
            className={clsx({ 'p-invalid': errors.name })}
            autoFocus
          />
          {errors.name && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.name.message}
            </span>
          )}
        </LabeledInput>

        <LabeledInput label="Usuário">
          <InputText
            {...register('username')}
            className={clsx({ 'p-invalid': errors.username })}
          />
          {errors.username && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.username.message}
            </span>
          )}
        </LabeledInput>

        <LabeledInput label="E-mail">
          <InputText
            {...register('email')}
            type="email"
            className={clsx({ 'p-invalid': errors.email })}
          />
          {errors.email && (
            <span className="text-[#ff7b7b] font-normal">
              {errors.email.message}
            </span>
          )}
        </LabeledInput>

        <LabeledInput label="Perfil" className="w-auto">
          <UserRolesField />
        </LabeledInput>

        <div className="flex items-center gap-2">
          <Button
            label="Salvar"
            type="submit"
            icon={PrimeIcons.SAVE}
            loading={loading}
          />

          <Link href="/usuarios">
            <Button
              label="Voltar"
              outlined
              type="button"
              icon={PrimeIcons.CHEVRON_LEFT}
            />
          </Link>
        </div>
      </form>

      <SuccessUserDialog user={userCreated} onClose={onHide} />
    </FormProvider>
  )
}

'use client'

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
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import { z } from 'zod'

const PASSWORD_LENGTH = 42
const USERNAME_MIN_LENGTH = 5
const USERNAME_PATTERN = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/

const roleOptions = Object.entries(UserRoles)
const roleKeys = Object.keys(UserRoles) as [string, ...string[]]

const saveUserSchema = z.object({
  username: z
    .string()
    .min(
      USERNAME_MIN_LENGTH,
      `Nome de usuário deve conter ao menos ${USERNAME_MIN_LENGTH}`,
    )
    .regex(USERNAME_PATTERN, 'Formato incorreto de usuário'),
  email: z.string().email('Informe um endereço de e-mail válido'),
  password: z.string({ coerce: true }).min(PASSWORD_LENGTH),
  role: z.enum(roleKeys),
})

export default function UsersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SaveUser>({
    resolver: zodResolver(saveUserSchema),
    shouldFocusError: false,
    reValidateMode: 'onChange',
    defaultValues: { role: 'editor' },
  })

  const currentPassword = watch('password', '')
  const selectedRole = watch('role')

  const [, copy] = useCopyToClipboard()

  const generatePass = useCallback(async () => {
    const generatedPassword = generate({
      length: PASSWORD_LENGTH,
      numbers: true,
      strict: true,
    })

    setValue('password', generatedPassword)
  }, [setValue])

  const copyPassword = useCallback(async () => {
    await copy(currentPassword)
    toast.success('Senha copiada')
  }, [copy, currentPassword])

  const onSubmit = async (values: SaveUser) => {
    console.log(values)
  }

  return (
    <form
      className="max-w-prose flex flex-col items-start gap-5"
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
        {errors.email && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.email.message}
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
        <div className="p-inputgroup flex-1">
          <Password
            readOnly
            inputId="password"
            value={currentPassword}
            feedback={false}
            toggleMask
            {...register('password')}
            className={clsx({ 'p-invalid': errors.password })}
          />
          <Button
            severity="info"
            icon={PrimeIcons.COPY}
            type="button"
            disabled={!currentPassword.length}
            onClick={copyPassword}
          />
        </div>
        <Button
          severity="info"
          icon={PrimeIcons.KEY}
          label="Gerar nova senha"
          type="button"
          onClick={generatePass}
          link
          className="px-0"
        />

        {errors.password && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-1 w-full">
        <label className="text-sm font-bold flex flex-col items-start gap-1 w-full">
          Perfil
        </label>
        {errors.role && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.role.message}
          </span>
        )}

        <div className="flex flex-col gap-5 py-5">
          {roleOptions.map(([value, role]) => (
            <label key={value} className="flex items-center gap-2">
              <RadioButton
                {...register('role')}
                value={value}
                checked={value === selectedRole}
                onChange={(event) => setValue('role', event.value)}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-start md:flex-row gap-2 w-full">
        <Button
          label="Salvar"
          type="submit"
          className="w-full md:w-auto"
          icon={PrimeIcons.SAVE}
        />
        <Link href="/usuarios">
          <Button
            label="Cancelar"
            outlined
            type="button"
            className="w-full md:w-auto"
            icon={PrimeIcons.CHEVRON_LEFT}
          />
        </Link>
      </div>
    </form>
  )
}

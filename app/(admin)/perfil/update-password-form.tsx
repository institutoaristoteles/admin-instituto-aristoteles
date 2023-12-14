'use client'

import LabeledInput from '@/shared/components/labeled-input'
import { updatePassword, UpdatePassword } from '@/shared/services/users.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import clsx from 'clsx'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

export default function UpdatePasswordForm() {
  const [loading, setLoading] = useState(false)
  const {
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<UpdatePassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(
      z.object({
        oldPassword: z.string().min(1, 'Este campo é obrigatório'),
        newPassword: z
          .string()
          .min(8, 'A senha deve possuir ao menos 8 caracteres'),
      }),
    ),
  })

  const onSubmit = useCallback(async (values: UpdatePassword) => {
    try {
      setLoading(true)
      await updatePassword(values)
      toast.success('Senha atualizada com sucesso!')
    } catch (e) {
      console.error(e)
      if (isAxiosError(e) && e.response?.status === 401) {
        setError('oldPassword', { message: 'Senha incorreta' })
      }

      toast.error('Ocorreu um erro ao atualizar a senha')
    } finally {
      setLoading(false)
    }
  }, [])

  const oldPassword = watch('oldPassword')
  const newPassword = watch('newPassword')

  return (
    <form
      className="flex flex-col gap-5 p-5 rounded-2xl bg-surface-card border border-surface-border"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-primary border-b border-b-surface-border pb-2 flex gap-2 items-center font-bold">
        <i className={clsx(PrimeIcons.KEY, 'text-base')} />
        Mudar senha
      </h2>

      <LabeledInput label="Senha atual">
        <Password
          value={oldPassword}
          onChange={(event) => setValue('oldPassword', event.target.value)}
          className={clsx({ 'p-invalid': !!errors.oldPassword })}
          inputClassName="w-full"
          feedback={false}
          toggleMask
        />
        {errors.oldPassword && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.oldPassword.message}
          </span>
        )}
      </LabeledInput>

      <LabeledInput label="Nova senha">
        <Password
          value={newPassword}
          onChange={(event) => setValue('newPassword', event.target.value)}
          className={clsx({ 'p-invalid': !!errors.newPassword })}
          inputClassName="w-full"
          feedback={false}
          toggleMask
        />
        {errors.newPassword && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.newPassword.message}
          </span>
        )}
      </LabeledInput>

      <div>
        <Button
          label="Atualizar senha"
          icon={PrimeIcons.CHECK}
          size="small"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  )
}

'use client'

import AvatarInput from '@/shared/components/avatar-input'
import LabeledInput from '@/shared/components/labeled-input'
import { useCurrentUser } from '@/shared/contexts/auth-provider'
import { updateProfile, UpdateProfile } from '@/shared/services/profile.service'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const updateProfileSchema = z.object({
  avatar: z.string().optional(),
  email: z.string().email('E-mail inválido'),
  name: z.string().min(3, 'Nome deve possuir no mínimo 3 caracteres'),
})

export default function UpdateUserinfoForm() {
  const currentUser = useCurrentUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<UpdateProfile>({
    defaultValues: {
      avatar: currentUser.avatar,
      email: currentUser.email,
      name: currentUser.name,
    },
    resolver: zodResolver(updateProfileSchema),
  })

  const avatarUrl = watch('avatar')

  const saveUserInfo = useCallback(async (values: UpdateProfile) => {
    try {
      setLoading(true)
      await updateProfile(values)
      toast.success('Informações atualizadas com sucesso!')
      router.refresh()
    } catch (e) {
      console.error(e)
      toast.error('Ocorreu um erro ao atualizar as informações')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <form
      className="flex flex-col gap-5 p-5 rounded-2xl bg-surface-card border border-surface-border"
      onSubmit={handleSubmit(saveUserInfo)}
    >
      <h2 className="text-primary border-b border-b-surface-border pb-2 flex gap-2 items-center font-bold">
        <i className={clsx(PrimeIcons.USER, 'text-base')} />
        Informações de Perfil
      </h2>

      <LabeledInput label="Imagem" className="w-auto">
        <AvatarInput
          onChange={(imageUrl) => setValue('avatar', imageUrl)}
          value={avatarUrl}
        />
      </LabeledInput>

      <LabeledInput label="Nome">
        <InputText
          {...register('name')}
          className={clsx({ 'p-invalid': errors.name })}
        />
        {errors.name && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.name.message}
          </span>
        )}
      </LabeledInput>

      <LabeledInput label="E-mail">
        <InputText
          {...register('email')}
          className={clsx({ 'p-invalid': errors.email })}
        />

        {errors.email && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.email.message}
          </span>
        )}
      </LabeledInput>

      <div>
        <Button
          label="Salvar"
          icon={PrimeIcons.CHECK}
          size="small"
          loading={loading}
        />
      </div>
    </form>
  )
}

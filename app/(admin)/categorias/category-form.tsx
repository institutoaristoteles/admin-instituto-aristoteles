'use client'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import React, { useCallback, useState } from 'react'
import {
  SaveCategory,
  saveCategory,
} from '@/shared/services/categories.service'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Category } from '@/shared/models/category'
import toast from 'react-hot-toast'
import { PrimeIcons } from 'primereact/api'
import { isAxiosError } from 'axios'
import clsx from 'clsx'

const createCategoryData = z.object({
  title: z.string(),
})

interface ApiException {
  type: 'duplicated_key'
  path: string
  statusCode: number
  timestamp: string
}

function isApiException(e: unknown): e is ApiException {
  return isAxiosError(e) && !!e.response?.data.type
}

export default function CategoryForm({ category }: { category?: Category }) {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<SaveCategory>({
    resolver: zodResolver(createCategoryData),
    values: category ? { title: category.title } : undefined,
  })

  const onSubmit = useCallback(
    async (data: SaveCategory) => {
      try {
        setPending(true)
        await saveCategory(data, category?.id)
        toast.success('Categoria criada com sucesso')
        router.push('/categorias')
      } catch (e) {
        if (isApiException(e) && e.type === 'duplicated_key') {
          setError('title', {
            type: e.type,
            message: 'Esta categoria já existe',
          })
        }

        toast.error('Ocorreu um erro ao salvar esta categoria')
      } finally {
        setPending(false)
      }
    },
    [category?.id, router, setError],
  )

  const onCancel = useCallback(() => {
    reset()
    router.push('/categorias')
  }, [reset, router])

  return (
    <form
      className="max-w-prose flex flex-col items-start gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Nome
        <InputText
          autoFocus
          {...register('title')}
          className={clsx({ 'p-invalid': errors.title })}
        />
        {errors.title && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.title.message}
          </span>
        )}
      </label>

      <div className="flex flex-col justify-end md:flex-row gap-2 w-full">
        <Button
          label="Salvar"
          type="submit"
          loading={pending}
          className="w-full md:w-auto"
          icon={PrimeIcons.SAVE}
          severity="success"
        />
        <Button
          label="Cancelar"
          outlined
          type="button"
          onClick={onCancel}
          className="w-full md:w-auto"
          icon={PrimeIcons.CHEVRON_LEFT}
        />
      </div>
    </form>
  )
}

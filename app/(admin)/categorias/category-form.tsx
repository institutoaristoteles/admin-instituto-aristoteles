'use client'

import { Category } from '@/shared/models/category'
import {
  SaveCategory,
  saveCategory,
} from '@/shared/services/categories.service'
import { isConflictError } from '@/shared/utils/errors'
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

const createCategoryData = z.object({
  title: z.string(),
})

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

  const onCancel = useCallback(() => {
    reset()
    router.push('/categorias')
  }, [reset, router])

  const onSubmit = useCallback(
    async (data: SaveCategory) => {
      try {
        setPending(true)
        await saveCategory(data, category?.id)
        toast.success('Categoria criada com sucesso')
        router.push('/categorias')
      } catch (e) {
        if (isConflictError(e)) {
          setError('title', { message: 'Esta categoria já existe' })
        }

        toast.error('Ocorreu um erro ao salvar esta categoria')
      } finally {
        setPending(false)
      }
    },
    [category?.id, router, setError],
  )

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

      <div className="fixed bg-surface-b bottom-0 left-0 w-full px-5 py-3 border-t border-t-surface-border flex items-center justify-between gap-2 md:relative md:border-none md:p-0 md:justify-end md:flex-row-reverse">
        <Button
          label="Cancelar"
          outlined
          type="button"
          onClick={onCancel}
          icon={PrimeIcons.TIMES}
        />

        <Button
          label="Salvar"
          type="submit"
          loading={pending}
          icon={PrimeIcons.SAVE}
        />
      </div>
    </form>
  )
}

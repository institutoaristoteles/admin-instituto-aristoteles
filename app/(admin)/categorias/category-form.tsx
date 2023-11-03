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
        toast.error('Ocorreu um erro ao salvar esta categoria')
      } finally {
        setPending(false)
      }
    },
    [category?.id, router],
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
        <InputText autoFocus {...register('title')} />
        {errors.title && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.title.message}
          </span>
        )}
      </label>

      <div className="flex items-center gap-2">
        <Button label="Salvar" type="submit" loading={pending} />
        <Button label="Cancelar" outlined type="button" onClick={onCancel} />
      </div>
    </form>
  )
}

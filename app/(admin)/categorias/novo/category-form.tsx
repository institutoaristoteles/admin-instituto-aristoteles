'use client'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import React, { useCallback, useState } from 'react'
import { NewCategory, saveCategory } from '@/shared/services/categories.service'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createCategoryData = z.object({
  name: z.string(),
})

export default function CategoryForm() {
  const [pending, setPending] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewCategory>({
    resolver: zodResolver(createCategoryData),
  })

  const onSubmit = useCallback(
    async (data: NewCategory) => {
      try {
        setPending(true)
        await saveCategory(data)
        router.push('/categorias')
      } catch (e) {
        console.error(e)
      } finally {
        setPending(false)
      }
    },
    [router],
  )

  const cancel = useCallback(() => {
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
        <InputText {...register('name')} />
        {errors.name && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.name.message}
          </span>
        )}
      </label>

      <div className="flex items-center gap-2">
        <Button label="Salvar" type="submit" loading={pending} />
        <Button label="Cancelar" outlined type="button" onClick={cancel} />
      </div>
    </form>
  )
}

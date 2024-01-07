'use client'

import AvatarInput from '@/shared/components/avatar-input'
import CategoriesSelector from '@/shared/components/categories-selector'
import LabeledInput from '@/shared/components/labeled-input'
import TextEditor from '@/shared/components/text-editor'
import { savePost, SavePost } from '@/shared/services/posts.service'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

const schemaValidator = z.object({
  title: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  content: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  coverUrl: z.string().url().optional(),
  description: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
  categoryId: z.string({
    required_error: 'É necessário selecionar uma categoria',
  }),
})

export default function PostForm() {
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SavePost>({
    resolver: zodResolver(schemaValidator),
  })

  const onSubmit = useCallback(async (values: SavePost) => {
    try {
      setLoading(true)
      await savePost(values)
      toast.success('Post salvo')
    } catch (e) {
      toast.error('Ocorreu um erro ao salvar este post')
    } finally {
      setLoading(false)
    }
  }, [])

  const coverUrl = watch('coverUrl')
  const categoryId = watch('categoryId')
  const content = watch('content')

  return (
    <form
      className="flex flex-col gap-5 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="coverUrl" className="text-sm font-bold">
          Capa
        </label>

        <AvatarInput
          onChange={function (imageUrl?: string | undefined): void {
            setValue('coverUrl', imageUrl)
          }}
          value={coverUrl}
        />
      </div>

      <LabeledInput label="Título">
        <InputText
          {...register('title')}
          className={clsx({ 'p-invalid': errors.title })}
          autoFocus
        />

        {errors.title && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.title.message}
          </span>
        )}
      </LabeledInput>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="editor" className="text-sm font-bold">
          Conteúdo
        </label>

        <TextEditor
          value={content}
          id="editor"
          onChange={(value) => setValue('content', value)}
          invalid={!!errors.content}
        />

        {errors.content && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.content.message}
          </span>
        )}
      </div>

      <LabeledInput label="Descrição">
        <InputTextarea
          {...register('description')}
          className={clsx('min-h-[150px]', { 'p-invalid': errors.description })}
        />

        {errors.description && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.description.message}
          </span>
        )}
      </LabeledInput>

      <LabeledInput label="Categoria">
        <CategoriesSelector
          value={categoryId}
          onChange={(event) => setValue('categoryId', event.value)}
          className={clsx({ 'p-invalid': errors.categoryId })}
        />

        {errors.categoryId && (
          <span className="text-[#ff7b7b] font-normal">
            {errors.categoryId.message}
          </span>
        )}
      </LabeledInput>

      <div className="flex items-center gap-2">
        <Button label="Salvar artigo" type="submit" loading={loading} />
        <Link href="/artigos">
          <Button label="Cancelar" outlined type="button" />
        </Link>
      </div>
    </form>
  )
}

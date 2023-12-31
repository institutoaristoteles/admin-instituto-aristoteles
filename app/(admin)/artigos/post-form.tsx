'use client'

import AvatarInput from '@/shared/components/avatar-input'
import CategoriesSelector from '@/shared/components/categories-selector'
import LabeledInput from '@/shared/components/labeled-input'
import StatusSelector from '@/shared/components/status-selector'
import TextEditor from '@/shared/components/text-editor'
import { Post } from '@/shared/models/post'
import { PostStatuses } from '@/shared/models/post-status'
import { savePost, SavePost } from '@/shared/services/posts.service'
import { isConflictError } from '@/shared/utils/errors'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
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
  status: z.enum(PostStatuses),
})

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<SavePost>({
    defaultValues: post && {
      title: post.title,
      content: post.content,
      description: post.description,
      categoryId: post.category?.id,
      coverUrl: post.coverUrl,
      status: post.status,
    },
    resolver: zodResolver(schemaValidator),
  })

  const onSubmit = useCallback(
    async (values: SavePost) => {
      try {
        setLoading(true)
        await savePost(values, post?.id)
        toast.success('Post salvo')

        if (!post) {
          return router.push('/artigos')
        }

        router.refresh()
      } catch (e) {
        if (isConflictError(e)) {
          setError('title', {
            message: 'Um artigo com este título já existe',
          })
          return
        }

        toast.error('Ocorreu um erro ao salvar este post')
      } finally {
        setLoading(false)
      }
    },
    [post, router, setError],
  )

  return (
    <form
      className="flex flex-col gap-5 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 w-full lg:grid lg:grid-cols-[1fr_.5fr] items-start">
        <div className="p-5 rounded-2xl bg-surface-card bg-opacity-75 backdrop-blur-2xl border border-surface-border w-full flex flex-col gap-5">
          <input
            type="hidden"
            {...register('status')}
            value={post?.status || 'draft'}
          />

          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="coverUrl" className="text-sm font-bold">
              Capa
            </label>

            <AvatarInput
              onChange={function (imageUrl?: string | undefined): void {
                setValue('coverUrl', imageUrl)
              }}
              value={watch('coverUrl')}
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
              value={watch('content')}
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
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border w-full flex flex-col gap-5">
          <LabeledInput label="Resumo">
            <InputTextarea
              {...register('description')}
              className={clsx('min-h-[150px]', {
                'p-invalid': errors.description,
              })}
            />

            {errors.description && (
              <span className="text-[#ff7b7b] font-normal">
                {errors.description.message}
              </span>
            )}
          </LabeledInput>

          <LabeledInput label="Categoria">
            <CategoriesSelector
              value={watch('categoryId')}
              onChange={(event) => setValue('categoryId', event.value)}
              className={clsx({ 'p-invalid': errors.categoryId })}
            />

            {errors.categoryId && (
              <span className="text-[#ff7b7b] font-normal">
                {errors.categoryId.message}
              </span>
            )}
          </LabeledInput>

          <LabeledInput label="Status">
            <StatusSelector
              value={watch('status', 'draft')}
              onChange={(event) => setValue('status', event.value)}
              className={clsx({ 'p-invalid': errors.status })}
            />

            {errors.status && (
              <span className="text-[#ff7b7b] font-normal">
                {errors.status.message}
              </span>
            )}
          </LabeledInput>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          label="Salvar artigo"
          type="submit"
          loading={loading}
          icon={PrimeIcons.SAVE}
        />
        <Link href="/artigos">
          <Button
            label="Cancelar"
            outlined
            type="button"
            icon={PrimeIcons.CHEVRON_LEFT}
          />
        </Link>
      </div>
    </form>
  )
}

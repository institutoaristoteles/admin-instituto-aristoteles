'use client'

import AvatarInput from '@/shared/components/avatar-input'
import CategoriesSelector from '@/shared/components/categories-selector'
import LabeledInput from '@/shared/components/labeled-input'
import TextEditor from '@/shared/components/text-editor'
import { savePost, SavePost } from '@/shared/services/posts.service'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function PostForm() {
  const [loading, setLoading] = useState(false)
  const { handleSubmit, register, watch, setValue } = useForm<SavePost>()

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
        <InputText {...register('title')} />
      </LabeledInput>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="editor" className="text-sm font-bold">
          Conteúdo
        </label>

        <TextEditor
          value={content}
          onChange={(value) => setValue('content', value)}
        />
      </div>

      <LabeledInput label="Descrição">
        <InputTextarea {...register('description')} className="min-h-[150px]" />
      </LabeledInput>

      <LabeledInput label="Categoria">
        <CategoriesSelector
          value={categoryId}
          onChange={(event) => setValue('categoryId', event.value)}
        />
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

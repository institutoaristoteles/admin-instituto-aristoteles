'use client'

import AvatarInput from '@/shared/components/avatar-input'
import CategoriesSelector from '@/shared/components/categories-selector'
import LabeledInput from '@/shared/components/labeled-input'
import TextEditor from '@/shared/components/text-editor'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'

export default function PostForm() {
  const [img, setImg] = useState('')

  return (
    <form className="flex flex-col gap-5 items-start">
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="editor" className="text-sm font-bold">
          Capa
        </label>

        <AvatarInput
          onChange={function (imageUrl?: string | undefined): void {
            setImg(imageUrl ?? '')
          }}
          value={img}
        />
      </div>

      <LabeledInput label="Título">
        <InputText />
      </LabeledInput>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="editor" className="text-sm font-bold">
          Conteúdo
        </label>

        <TextEditor />
      </div>

      <LabeledInput label="Descrição">
        <InputTextarea className="min-h-[150px]" />
      </LabeledInput>

      <LabeledInput label="Categoria">
        <CategoriesSelector />
      </LabeledInput>

      <div className="flex items-center gap-2">
        <Button label="Salvar artigo" type="submit" />
        <Link href="/artigos">
          <Button label="Cancelar" outlined type="button" />
        </Link>
      </div>
    </form>
  )
}

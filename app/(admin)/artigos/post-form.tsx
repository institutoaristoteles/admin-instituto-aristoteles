'use client'

import LabeledInput from '@/shared/components/labeled-input'
import RichTextEditor from '@/shared/components/rich-text-editor'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'

export default function PostForm() {
  const categoryOptions = [
    { label: 'Categoria 1', value: 1 },
    { label: 'Categoria 2', value: 2 },
    { label: 'Categoria 3', value: 3 },
    { label: 'Categoria 4', value: 4 },
  ]

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(ev) => ev.preventDefault()}
    >
      <LabeledInput label="Título">
        <InputText />
      </LabeledInput>

      {/* <LabeledInput label="Descrição">
        <InputTextarea />
      </LabeledInput> */}

      <LabeledInput label="Conteúdo">
        <RichTextEditor />
      </LabeledInput>

      <LabeledInput label="Categoria">
        <Dropdown options={categoryOptions} />
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

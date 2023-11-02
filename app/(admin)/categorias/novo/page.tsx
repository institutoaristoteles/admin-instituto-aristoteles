'use client'

import React from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

export default function NewCategoryPage() {
  return (
    <main>
      <div className="container">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary py-10">
            Nova categoria
          </h2>
        </header>

        <form className="max-w-prose flex flex-col items-start gap-5">
          <label className="text-sm font-bold flex flex-col gap-1 w-full">
            Nome
            <InputText type="text" name="name" required />
          </label>

          <div className="flex items-center gap-2">
            <Button label="Salvar" type="submit" />
            <Button label="Cancelar" outlined type="reset" />
          </div>
        </form>
      </div>
    </main>
  )
}

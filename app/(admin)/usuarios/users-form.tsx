'use client'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import React from 'react'

export default function UsersForm() {
  return (
    <form className="max-w-prose flex flex-col items-start gap-5">
      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        E-mail
        <InputText type="email" />
      </label>

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Usuário
        <InputText />
      </label>

      <label className="text-sm font-bold flex flex-col gap-1 w-full">
        Senha temporária
        <div className="p-inputgroup flex-1">
          <InputText readOnly />
          <Button
            severity="info"
            icon={PrimeIcons.KEY}
            label="Gerar"
            type="button"
          />
        </div>
      </label>

      <div className="flex flex-col justify-start md:flex-row gap-2 w-full">
        <Button
          label="Salvar"
          type="submit"
          className="w-full md:w-auto"
          icon={PrimeIcons.SAVE}
        />
        <Button
          label="Cancelar"
          outlined
          type="button"
          className="w-full md:w-auto"
          icon={PrimeIcons.CHEVRON_LEFT}
        />
      </div>
    </form>
  )
}

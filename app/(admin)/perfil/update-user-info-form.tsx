'use client'

import LabeledInput from '@/shared/components/labeled-input'
import { useCurrentUser } from '@/shared/contexts/auth-provider'
import clsx from 'clsx'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function UpdateUserInfoForm() {
  const currentUser = useCurrentUser()

  return (
    <form className="flex flex-col gap-5 p-5 rounded-2xl bg-surface-card border border-surface-border">
      <h2 className="text-text-color border-b border-b-surface-border pb-2 flex gap-5 items-center">
        <i className={clsx(PrimeIcons.USER, 'text-sm')} />
        Informações de Perfil
      </h2>

      <LabeledInput label="Nome">
        <InputText value={currentUser.name} />
      </LabeledInput>

      <LabeledInput label="E-mail">
        <InputText value={currentUser.email} />
      </LabeledInput>

      <div>
        <Button label="Salvar" icon={PrimeIcons.CHECK} size="small" />
      </div>
    </form>
  )
}

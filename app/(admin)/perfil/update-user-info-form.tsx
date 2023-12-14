'use client'

import AvatarInput from '@/shared/components/avatar-input'
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
      <h2 className="text-primary border-b border-b-surface-border pb-2 flex gap-2 items-center font-bold">
        <i className={clsx(PrimeIcons.USER, 'text-base')} />
        Informações de Perfil
      </h2>

      <LabeledInput label="Imagem" className="w-auto">
        <AvatarInput />
      </LabeledInput>

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

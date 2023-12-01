'use client'

import LabeledInput from '@/shared/components/labeled-input'
import clsx from 'clsx'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React from 'react'

export default function UpdatePasswordForm() {
  return (
    <form className="max-w-prose flex flex-col gap-5">
      <h2 className="text-text-color border-b border-b-surface-border pb-2 flex gap-5 items-center">
        <i className={clsx(PrimeIcons.KEY, 'text-sm')} />
        Mudar senha
      </h2>

      <LabeledInput label="Senha atual">
        <Password className="w-full" inputClassName="w-full" />
      </LabeledInput>

      <LabeledInput label="Nova senha">
        <Password className="w-full" inputClassName="w-full" />
      </LabeledInput>

      <div>
        <Button label="Atualizar senha" icon={PrimeIcons.CHECK} size="small" />
      </div>
    </form>
  )
}

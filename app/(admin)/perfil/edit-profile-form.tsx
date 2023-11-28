'use client'

import LabeledInput from '@/shared/components/LabeledInput'
import { useCurrentUser } from '@/shared/contexts/auth-provider'
import clsx from 'clsx'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Password } from 'primereact/password'

function EditProfileForm() {
  const currentUser = useCurrentUser()

  return (
    <section className="flex flex-col-reverse gap-10 md:grid md:gap-24 md:grid-cols-[auto_auto] mt-7">
      <div className="flex flex-col gap-16">
        <form className="flex flex-col gap-5">
          <h2 className="text-text-color-secondary border-b border-b-surface-border pb-2 flex gap-5 items-center">
            <i className={clsx(PrimeIcons.USER, 'text-sm')} />
            Informações de Perfil
          </h2>

          <LabeledInput label="Nome">
            <InputText value={currentUser.name} />
          </LabeledInput>

          <LabeledInput label="Bio">
            <InputTextarea className="min-h-[120px]" />
          </LabeledInput>

          <LabeledInput label="E-mail">
            <InputText value={currentUser.email} />
          </LabeledInput>

          <div>
            <Button label="Salvar" icon={PrimeIcons.CHECK} size="small" />
          </div>
        </form>

        <form className="max-w-prose flex flex-col gap-5">
          <h2 className="text-text-color-secondary border-b border-b-surface-border pb-2 flex gap-5 items-center">
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
            <Button
              label="Atualizar senha"
              icon={PrimeIcons.CHECK}
              size="small"
            />
          </div>
        </form>
      </div>

      <form>
        <LabeledInput label="Imagem" className="w-auto">
          <div className="rounded-full bg-surface-d w-40 aspect-square" />
        </LabeledInput>
      </form>
    </section>
  )
}

export default EditProfileForm

import CopyButton from '@/shared/components/copy-button'
import { SaveUser } from '@/shared/services/users.service'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Message } from 'primereact/message'
import { Panel } from 'primereact/panel'
import { Password } from 'primereact/password'
import React, { useCallback, useMemo, useState } from 'react'

export interface SuccessModalProps {
  user?: SaveUser
  onClose: () => void
}

function SuccessUserModal(props: SuccessModalProps) {
  const [canClose, setCanClose] = useState(false)

  const onPasswordCopy = useCallback(() => {
    setCanClose(true)
  }, [])

  const footer = useMemo(
    () => (
      <div className="pt-5">
        <Button
          label="Fechar"
          icon={PrimeIcons.CHECK}
          className="m-0 max-md:w-full"
          disabled={!canClose}
          onClick={props.onClose}
        />
      </div>
    ),
    [canClose, props.onClose],
  )

  return (
    <Dialog
      onHide={props.onClose}
      header="Usuário criado com sucesso!"
      visible={!!props.user}
      draggable={false}
      closable={false}
      className="min-w-[30%]"
      footer={footer}
    >
      <Message
        severity="info"
        text="Salve a senha provisória e informe ao usuário."
        className="mb-5 w-full justify-start"
      />

      <div className="flex flex-col md:grid md:grid-cols-7 gap-5">
        <div className="md:col-span-full">
          <Panel header="Usuário">{props.user?.username}</Panel>
        </div>

        <div className="md:col-span-full">
          <Panel header="Senha provisória">
            <div className="flex flex-col gap-2 items-start">
              <Password
                value={props.user?.password}
                toggleMask
                feedback={false}
                inputClassName="border-none p-0 w-full"
                className="w-full"
              />
            </div>
          </Panel>
          <CopyButton
            value={props.user?.password}
            onCopy={onPasswordCopy}
            label="Copiar senha provisória"
            className="px-0"
          />
        </div>
      </div>
    </Dialog>
  )
}

export default React.memo(SuccessUserModal)

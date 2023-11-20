import { SaveUser } from '@/shared/services/users.service'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useMemo } from 'react'

export interface SuccessModalProps {
  user?: SaveUser
  onClose: () => void
}

function SuccessUserModal({ onClose, user }: SuccessModalProps) {
  const footer = useMemo(
    () => (
      <div className="pt-5">
        <Button
          label="Entendido"
          icon={PrimeIcons.CHECK}
          className="m-0 max-md:w-full"
          onClick={onClose}
          severity="success"
        />
      </div>
    ),
    [onClose],
  )

  return (
    <Dialog
      onHide={onClose}
      visible={!!user}
      draggable={false}
      closable={false}
      className="min-w-[20%]"
      footer={footer}
    >
      <div className="flex flex-col text-center gap-5 items-center">
        <i className={`${PrimeIcons.CHECK_CIRCLE} text-6xl text-[#86EFAC]`} />
        <div className="flex flex-col gap-2">
          <h2 className="text-[#86EFAC] text-2xl font-bold">
            Usuário criado com sucesso!
          </h2>
          <p>
            Um e-mail foi enviado para o e-mail <span>{user?.email}</span> com
            as informações de acesso.
          </p>
        </div>
      </div>
    </Dialog>
  )
}

export default React.memo(SuccessUserModal)

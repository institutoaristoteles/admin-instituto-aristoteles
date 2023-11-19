import CopyButton from '@/shared/components/copy-button'
import { SaveUser } from '@/shared/services/users.service'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Message } from 'primereact/message'
import { Panel } from 'primereact/panel'
import { Password } from 'primereact/password'
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

export interface SuccessModalProps {
  open: (data: SaveUser) => void
}

function SuccessUserModal(_: unknown, ref: ForwardedRef<SuccessModalProps>) {
  const [user, setUser] = useState<SaveUser>()
  const [canCloseDialog, setCanCloseDialog] = useState(false)
  const router = useRouter()

  const onHide = useCallback(() => {
    setUser(undefined)
    router.push('/usuarios')
    router.refresh()
  }, [router])

  const onPasswordCopy = useCallback(() => {
    setCanCloseDialog(true)
  }, [])

  const modalActions = useCallback(
    (): SuccessModalProps => ({ open: (data) => setUser(data) }),
    [],
  )

  useImperativeHandle(ref, modalActions)

  if (!user) {
    return <></>
  }

  return (
    <Dialog
      onHide={onHide}
      header="Usuário criado com sucesso!"
      visible
      draggable={false}
      closable={false}
      footer={
        <div className="pt-5">
          <Button
            label="Fechar"
            icon={PrimeIcons.CHECK}
            className="m-0 max-md:w-full"
            disabled={!canCloseDialog}
            onClick={onHide}
          />
        </div>
      }
    >
      <Message
        severity="warn"
        text={
          <React.Fragment>
            <strong>Salve a senha provisória</strong> e informe ao usuário.
          </React.Fragment>
        }
        className="mb-5 w-full"
      />

      <div className="flex flex-col md:grid md:grid-cols-7 gap-5">
        <div className="md:col-span-full">
          <Panel header="Usuário">{user.username}</Panel>
        </div>
        <div className="md:col-span-2">
          <Panel header="Nome">{user.name}</Panel>
        </div>
        <div className="md:col-span-3">
          <Panel header="Email">{user.email}</Panel>
        </div>
        <div className="md:col-span-2">
          <Panel header="Função">{user.role}</Panel>
        </div>

        <div className="md:col-span-full">
          <Panel header="Senha provisória">
            <div className="p-inputgroup flex-1">
              <Password
                value={user.password}
                toggleMask
                feedback={false}
                inputClassName="border-none"
              />
              <CopyButton value={user.password} onCopy={onPasswordCopy} />
            </div>
          </Panel>
        </div>
      </div>
    </Dialog>
  )
}

export default forwardRef(SuccessUserModal)

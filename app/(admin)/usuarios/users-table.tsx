'use client'

import RoleBadge from '@/shared/components/role-badge'
import {
  UserProfile,
  UserRoles,
  UserStatus,
} from '@/shared/models/user-profile'
import {
  deleteUser,
  getUsers,
  resetUser,
  updateUser,
} from '@/shared/services/users.service'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { Dropdown } from 'primereact/dropdown'
import { Tag, TagProps } from 'primereact/tag'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function UsersTable() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<UserProfile[]>([])

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      setUsers(await getUsers())
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const UserStatusTag = useCallback((props: { status: UserStatus }) => {
    const statusProps: Record<UserStatus, TagProps> = {
      confirmed: {
        severity: 'success',
        value: 'Confirmado',
      },
      unconfirmed: {
        severity: 'warning',
        value: 'Pendente',
      },
    }

    return <Tag {...statusProps[props.status]} />
  }, [])

  const removeUser = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await deleteUser(id)
        await loadUsers()
        toast.success('Categoria removida com sucesso')
      } catch (e) {
        toast.error('Ocorreu um erro ao remover a categoria')
      } finally {
        setLoading(false)
      }
    },
    [loadUsers],
  )

  const confirmUserRemoval = useCallback(
    (user: UserProfile) => {
      confirmDialog({
        message: `Tem certeza que deseja excluir o usuário ${user.username}?`,
        header: 'Excluir usuário',
        icon: PrimeIcons.TRASH,
        acceptClassName: 'p-button-danger',
        rejectLabel: 'Não, cancelar',
        acceptLabel: 'Sim, excluir',
        async accept() {
          await removeUser(user.id)
        },
      })
    },
    [removeUser],
  )

  const confirmUserReset = useCallback(
    (user: UserProfile) => {
      confirmDialog({
        message:
          'Ao resetar um usuário, ele será obrigado a definir uma nova senha na próxima vez que fizer login no sistema.',
        header: `Tem certeza que deseja resetar o usuário ${user.username}?`,
        icon: PrimeIcons.INFO_CIRCLE,
        draggable: false,
        acceptClassName: 'p-button-warning',
        rejectLabel: 'Não, cancelar',
        acceptIcon: PrimeIcons.REPLAY,
        acceptLabel: 'Sim, resetar',
        rejectIcon: PrimeIcons.TIMES,
        async accept() {
          try {
            setLoading(true)
            await resetUser(user.id)
            toast.success('Reset de usuário realizado com sucesso')
            await loadUsers()
          } catch (e) {
            console.error(e)
          } finally {
            setLoading(false)
          }
        },
      })
    },
    [loadUsers],
  )

  const roleEditor = useCallback((options: ColumnEditorOptions) => {
    const roleOptions = Object.entries(UserRoles).map(([value, role]) => ({
      name: role,
      value,
    }))

    return (
      <Dropdown
        onChange={(event) => options.editorCallback?.(event.value)}
        value={options.value}
        options={roleOptions}
        optionLabel="name"
        optionValue="value"
      />
    )
  }, [])

  const onUserEditComplete = useCallback(
    async (e: DataTableRowEditCompleteEvent) => {
      const user = e.newData as UserProfile
      setLoading(true)

      try {
        await updateUser(user.id, { role: user.role })
        await loadUsers()
        toast.success('Usuário atualizado com sucesso')
      } catch (e) {
        toast.error('Ocorreu um erro ao atualizar o usuário')
      } finally {
        setLoading(false)
      }
    },
    [loadUsers],
  )

  useEffect(() => {
    ;(async () => {
      await loadUsers()
    })()

    return () => {
      setUsers([])
    }
  }, [loadUsers])

  return (
    <React.Fragment>
      <header className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center justify-between gap-2 w-full">
          <Link href="/usuarios/novo">
            <Button label="Adicionar" icon={PrimeIcons.PLUS} size="small" />
          </Link>
        </div>
      </header>

      <DataTable
        value={users}
        loading={loading}
        dataKey="id"
        paginator
        rows={10}
        emptyMessage="Nenhum usuário encontrado"
        editMode="row"
        onRowEditComplete={onUserEditComplete}
        className="p-input-filled"
      >
        <Column
          header="Avatar"
          bodyClassName="font-bold text-sm whitespace-nowrap"
          body={(user: UserProfile) => (
            <Avatar image={user.avatar} size="normal" shape="circle" />
          )}
        />
        <Column
          header="Nome"
          bodyClassName="font-bold text-sm whitespace-nowrap"
          field="name"
        />
        <Column header="Username" field="username" />
        <Column
          header="Função"
          bodyClassName="font-bold text-sm whitespace-nowrap"
          field="role"
          body={(user: UserProfile) => <RoleBadge role={user.role} />}
          editor={roleEditor}
        />
        <Column
          header="Status"
          body={(user: UserProfile) => <UserStatusTag status={user.status} />}
        />
        <Column
          rowEditor
          headerStyle={{ width: '10%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
        <Column
          body={(user: UserProfile) => (
            <div className="flex items-center gap-2">
              <Button
                icon={PrimeIcons.REPLAY}
                text
                rounded
                severity="info"
                onClick={() => confirmUserReset(user)}
                tooltip="Resetar usuário"
              />

              <Button
                icon={PrimeIcons.TRASH}
                text
                rounded
                severity="danger"
                onClick={() => confirmUserRemoval(user)}
                tooltip="Excluir usuário"
              />
            </div>
          )}
        />
      </DataTable>

      <ConfirmDialog />
    </React.Fragment>
  )
}

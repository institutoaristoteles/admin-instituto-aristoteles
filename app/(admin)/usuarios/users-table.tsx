'use client'

import { UserProfile, UserStatus } from '@/shared/models/user-profile'
import { getUsers } from '@/shared/services/users.service'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag, TagProps } from 'primereact/tag'
import React, { useCallback, useEffect, useState } from 'react'

export default function UsersTable() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [selected, setSelected] = useState<UserProfile[]>([])

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

  useEffect(() => {
    ;(async () => {
      await loadUsers()
    })()

    return () => {
      setUsers([])
      setSelected([])
    }
  }, [loadUsers])

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

  return (
    <React.Fragment>
      <header className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/usuarios/novo">
            <Button label="Adicionar" icon={PrimeIcons.PLUS} size="small" />
          </Link>

          {selected.length > 0 && (
            <Button
              label="Excluir"
              icon={PrimeIcons.TRASH}
              size="small"
              severity="danger"
              loading={loading}
              outlined
            >
              <Badge value={selected.length.toString()} severity="danger" />
            </Button>
          )}
        </div>
      </header>

      <DataTable
        value={users}
        loading={loading}
        selection={selected}
        selectionMode="multiple"
        onSelectionChange={(e) => setSelected(e.value)}
        dataKey="id"
        paginator
        rows={10}
        emptyMessage="Nenhum usuário encontrado"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
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
        />
        <Column
          header="Status"
          body={(user: UserProfile) => <UserStatusTag status={user.status} />}
        />
        <Column
          body={(user: UserProfile) => (
            <div className="flex items-center gap-2">
              <Link href={`/users/${user.id}`}>
                <Button icon={PrimeIcons.PENCIL} text rounded severity="info" />
              </Link>

              <Button icon={PrimeIcons.TRASH} text rounded severity="danger" />
            </div>
          )}
        />
      </DataTable>
    </React.Fragment>
  )
}

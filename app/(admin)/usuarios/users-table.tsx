'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { UserProfile } from '@/shared/models/user-profile'
import { getUsers } from '@/shared/services/users.service'
import { Column } from 'primereact/column'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'
import { useCurrentUser } from '@/shared/contexts/auth-provider'

export default function UsersTable() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [selected, setSelected] = useState<UserProfile[]>([])
  const currentUser = useCurrentUser()

  const loadUsers = useCallback(async () => {
    setLoading(true)
    try {
      const results = await getUsers()
      setUsers(results)
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

    return () => setUsers([])
  }, [loadUsers])

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
        emptyMessage="Nenhuma categoria encontrada"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column
          header="Nome"
          bodyClassName="font-bold text-sm whitespace-nowrap"
          field="name"
        />
        <Column header="Username" field="username" />
        <Column header="E-mail" field="email" />
        <Column
          body={(user: UserProfile) => (
            <div className="flex items-center gap-2">
              <Link href={`/users/${user.id}`}>
                <Button icon={PrimeIcons.PENCIL} text rounded severity="info" />
              </Link>

              <Button
                icon={PrimeIcons.TRASH}
                text
                rounded
                severity="danger"
                disabled={user.id === currentUser.id}
              />
            </div>
          )}
        />
      </DataTable>
    </React.Fragment>
  )
}

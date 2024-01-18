import SidebarMenuItem from '@/shared/components/sidebar-menu-item'
import { useCurrentUser } from '@/shared/contexts/auth-provider'
import { PrimeIcons } from 'primereact/api'
import React from 'react'

function SidebarMenu() {
  const currentUser = useCurrentUser()

  return (
    <nav className="w-full flex flex-col gap-1 px-3">
      <SidebarMenuItem
        label="Artigos"
        href="/artigos"
        icon={<i className={PrimeIcons.BOOK} />}
      />
      <SidebarMenuItem
        label="Categorias"
        href="/categorias"
        icon={<i className={PrimeIcons.TH_LARGE} />}
      />

      {currentUser.role === 'admin' && (
        <React.Fragment>
          <SidebarMenuItem
            label="Usuários"
            href="/usuarios"
            icon={<i className={PrimeIcons.USERS} />}
          />
        </React.Fragment>
      )}
    </nav>
  )
}

export default React.memo(SidebarMenu)

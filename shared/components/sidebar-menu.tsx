import SidebarMenuItem from '@/shared/components/sidebar-menu-item'
import { useCurrentUser } from '@/shared/contexts/auth-provider'
import { PrimeIcons } from 'primereact/api'
import React from 'react'

function SidebarMenu() {
  const currentUser = useCurrentUser()

  return (
    <nav className="w-full flex flex-col gap-1 px-3">
      <SidebarMenuItem
        label="Início"
        href="/"
        icon={<i className={PrimeIcons.HOME} />}
      />
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
          <SidebarMenuItem
            label="Configurações"
            icon={<i className={PrimeIcons.COG} />}
          >
            <SidebarMenuItem
              label="Geral"
              href="/configuracoes"
              icon={<i className={PrimeIcons.SLIDERS_H} />}
            />
            <SidebarMenuItem
              label="Aparência"
              href="/configuracoes/aparencia"
              icon={<i className={PrimeIcons.PALETTE} />}
            />
          </SidebarMenuItem>
        </React.Fragment>
      )}
    </nav>
  )
}

export default React.memo(SidebarMenu)

import SidebarMenuItem from '@/shared/components/sidebar-menu-item'
import { PrimeIcons } from 'primereact/api'
import React from 'react'

const SidebarMenu = () => (
  <nav className="w-full flex flex-col gap-1 px-3">
    <SidebarMenuItem
      label="Dashboard"
      href="/"
      icon={<i className={PrimeIcons.CHART_BAR} />}
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
    <SidebarMenuItem
      label="Usuários"
      href="/usuarios"
      icon={<i className={PrimeIcons.USERS} />}
    />
    <SidebarMenuItem
      label="Configurações"
      href="/configuracoes"
      icon={<i className={PrimeIcons.COG} />}
    />
  </nav>
)

export default React.memo(SidebarMenu)

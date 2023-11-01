'use client'

import { PrimeIcons } from 'primereact/api'
import { useSidebar } from '@/shared/contexts/sidebar-provider'

export default function SidebarTrigger() {
  const { setSidebarOpen } = useSidebar()

  return (
    <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
      <div className="bg-surface-card border border-surface-border rounded-2xl w-10 flex items-center justify-center aspect-square">
        <i className={PrimeIcons.BARS} />
      </div>
    </button>
  )
}

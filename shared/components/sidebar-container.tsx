'use client'

import Sidebar from '@/shared/components/sidebar'
import { PropsWithChildren, useState } from 'react'
import { PrimeIcons } from 'primereact/api'

export default function SidebarContainer({ children }: PropsWithChildren) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="md:grid md:grid-cols-[auto_1fr] h-screen max-h-screen">
      <Sidebar
        open={sidebarOpen}
        onOutsideClick={() => setSidebarOpen(false)}
      />

      <div className="overflow-auto">
        <header>
          <div className="container py-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              <div className="bg-surface-b border border-surface-border rounded-2xl w-10 flex items-center justify-center aspect-square group-hover:bg-primary group-hover:text-primary-color-text">
                <i className={PrimeIcons.BARS} />
              </div>
            </button>
          </div>
        </header>

        {children}
      </div>
    </div>
  )
}

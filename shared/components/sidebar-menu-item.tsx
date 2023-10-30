import Link from 'next/link'
import React, { ReactNode } from 'react'
import { useSidebar } from '@/shared/contexts/sidebar-provider'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

interface MenuItemProps {
  label: string
  href: string
  icon: ReactNode
}

export default function SidebarMenuItem({ href, label, icon }: MenuItemProps) {
  const { setSidebarOpen } = useSidebar()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={clsx(
        'flex items-center gap-3 p-2 rounded-xl w-full font-bold text-sm transition-all hover:bg-surface-d group',
        {
          'bg-surface-b': pathname === href,
        },
      )}
      onClick={() => setSidebarOpen(false)}
    >
      <div className="bg-surface-c border border-surface-border rounded-xl w-8 flex items-center justify-center aspect-square group-hover:bg-primary group-hover:text-primary-color-text">
        {icon}
      </div>
      {label}
    </Link>
  )
}

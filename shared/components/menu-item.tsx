import Link from 'next/link'
import { ReactNode } from 'react'

interface MenuItemProps {
  label: string
  href: string
  icon: ReactNode
}

export default function MenuItem({ href, label, icon }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded-xl w-full font-bold text-sm transition-all hover:bg-surface-b group"
    >
      <div className="bg-surface-c border border-surface-border rounded-xl w-8 flex items-center justify-center aspect-square group-hover:bg-primary group-hover:text-primary-color-text">
        {icon}
      </div>
      {label}
    </Link>
  )
}

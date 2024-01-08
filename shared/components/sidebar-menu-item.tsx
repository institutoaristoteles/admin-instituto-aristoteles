import { useSidebar } from '@/shared/contexts/sidebar-provider'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import React, { ReactNode, useCallback, useState } from 'react'

interface MenuItemProps {
  label: string
  href?: string
  icon: ReactNode
  children?: ReactNode
}

export default function SidebarMenuItem({
  href,
  label,
  icon,
  children,
}: MenuItemProps) {
  const { setSidebarOpen } = useSidebar()
  const pathname = usePathname()
  const hasChildren = Boolean(children)
  const [expanded, setExpanded] = useState(false)

  const handleLinkLink = useCallback(() => {
    if (href) {
      return setSidebarOpen(false)
    }

    setExpanded(!expanded)
  }, [expanded, href, setSidebarOpen])

  const handleArrowClick = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    setExpanded((prevState) => !prevState)
  }, [])

  return (
    <span className="relative">
      <Link
        href={href ?? ''}
        className={clsx(
          'flex items-center gap-3 p-2 rounded-xl w-full font-bold text-sm transition-all hover:bg-gradient group',
          {
            'bg-surface-b': pathname === href,
          },
        )}
        onClick={handleLinkLink}
      >
        <div className="bg-surface-c border border-surface-border rounded-xl w-8 center aspect-square group-hover:bg-primary group-hover:text-primary-color-text">
          {icon}
        </div>

        {label}

        {hasChildren && (
          <button
            className={clsx('p-2 ml-auto center transition-all', {
              '-rotate-180': expanded,
            })}
            onClick={handleArrowClick}
          >
            <i className={PrimeIcons.ANGLE_DOWN} />
          </button>
        )}
      </Link>

      {hasChildren && (
        <div
          className={clsx('pl-5 transition-all', {
            'translate-x-[-1000%] absolute': !expanded,
          })}
        >
          {children}
        </div>
      )}
    </span>
  )
}

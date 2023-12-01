'use client'

import { useCurrentUser } from '@/shared/contexts/auth-provider'
import { logout } from '@/shared/services/auth.service'
import { useRouter } from 'next/navigation'
import { PrimeIcons } from 'primereact/api'
import { Avatar } from 'primereact/avatar'
import { Menu } from 'primereact/menu'
import { MenuItem } from 'primereact/menuitem'
import React, { useRef } from 'react'

function UserAvatar() {
  const user = useCurrentUser()
  const menuRef = useRef<Menu>(null)
  const router = useRouter()

  const items: MenuItem[] = [
    {
      label: 'Meu perfil',
      icon: PrimeIcons.USER_EDIT,
      command() {
        router.push('/perfil')
        router.refresh()
      },
    },
    { separator: true },
    {
      label: 'Sair',
      icon: PrimeIcons.SIGN_OUT,
      command() {
        logout()
        router.push('/login')
        router.refresh()
      },
    },
  ]

  return (
    <button
      className="flex items-center gap-2 lg:ml-auto p-1 pr-3 bg-surface-c rounded-full transition-all hover:bg-surface-a group relative"
      aria-controls="user-menu"
      aria-haspopup
      onClick={(event) => menuRef.current?.toggle(event)}
    >
      <Avatar image={user.avatar} label={user.name[0]} shape="circle" />

      <span className="text-sm text-text-color">{user.name}</span>

      <Menu
        model={items}
        ref={menuRef}
        id="user-menu"
        popup
        popupAlignment="right"
      />
    </button>
  )
}

export default React.memo(UserAvatar)

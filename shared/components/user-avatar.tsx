'use client'

import { Avatar } from 'primereact/avatar'
import LogoutButton from '@/shared/components/logout-button'
import React from 'react'
import { useCurrentUser } from '@/shared/contexts/auth-provider'

export default function UserAvatar() {
  const user = useCurrentUser()

  return (
    <div className="flex items-start gap-2 ml-auto">
      <Avatar image={user.avatar} label={user.name[0]} size="normal" />

      <div className="flex flex-col items-start">
        <span>{user.name}</span>
        <LogoutButton />
      </div>
    </div>
  )
}

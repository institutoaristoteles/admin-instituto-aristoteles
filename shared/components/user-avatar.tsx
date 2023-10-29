'use client'

import { Avatar } from 'primereact/avatar'
import { useAuth } from '@/shared/contexts/auth-provider'
import LogoutButton from '@/shared/components/logout-button'
import React from 'react'

export default function UserAvatar() {
  const { user } = useAuth()

  return (
    <div className="flex gap-2 ml-auto">
      <Avatar image={user.avatar} label={user.name[0]} />

      <div className="flex flex-col items-start">
        <span>{user.name}</span>
        <LogoutButton />
      </div>
    </div>
  )
}

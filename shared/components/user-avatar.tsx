import { Avatar } from 'primereact/avatar'
import LogoutButton from '@/shared/components/logout-button'
import React from 'react'
import { getUser } from '@/shared/services/auth.service'

export default async function UserAvatar() {
  const user = await getUser()

  if (!user) {
    return <></>
  }

  return (
    <div className="flex items-start gap-2 ml-auto">
      <Avatar image={user.avatar} label={user.name[0]} />

      <div className="flex flex-col items-start">
        <span>{user.name}</span>
        <LogoutButton />
      </div>
    </div>
  )
}

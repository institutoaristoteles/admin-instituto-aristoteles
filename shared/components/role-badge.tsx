import { Role } from '@/shared/models/user-profile'
import clsx from 'clsx'
import React from 'react'

function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={clsx('text-xs border rounded py-1 px-2', {
        'border-[coral] text-[coral]': role === 'admin',
        'border-[powderblue] text-[powderblue]': role === 'editor',
      })}
    >
      {role}
    </span>
  )
}

export default React.memo(RoleBadge)

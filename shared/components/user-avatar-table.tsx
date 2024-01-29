import { UserProfile } from '@/shared/models/user-profile'
import { Avatar } from 'primereact/avatar'

interface UserAvatarTableProps {
  user: UserProfile
}

export default function UserAvatarTable({ user }: UserAvatarTableProps) {
  return (
    <div className="flex items-center gap-2 p-1 pr-3">
      <Avatar
        image={user.avatar}
        label={user.name[0]}
        shape="circle"
        className="rounded-full overflow-hidden shrink-0"
      />
      <span className="text-sm text-text-color hidden md:block shrink-0">
        {user.name}
      </span>
    </div>
  )
}

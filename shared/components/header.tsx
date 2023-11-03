import SidebarTrigger from '@/shared/components/sidebar-trigger'
import UserAvatar from '@/shared/components/user-avatar'

export default function Header() {
  return (
    <header>
      <div className="container py-5 flex items-center">
        <SidebarTrigger />
        <UserAvatar />
      </div>
    </header>
  )
}

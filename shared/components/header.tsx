import SidebarTrigger from '@/shared/components/sidebar-trigger'
import UserAvatar from '@/shared/components/user-avatar'
import logoSvg from '@/shared/images/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="container py-5 flex items-center justify-between">
        <SidebarTrigger />
        <Link href="/" className="lg:hidden">
          <Image
            src={logoSvg}
            alt="Logo Instituto Aristóteles"
            height={46}
            priority
          />
        </Link>
        <UserAvatar />
      </div>
    </header>
  )
}

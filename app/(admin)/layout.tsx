import SidebarContainer from '@/shared/components/sidebar-container'
import { PropsWithChildren } from 'react'
import { getUser } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return <SidebarContainer>{children}</SidebarContainer>
}

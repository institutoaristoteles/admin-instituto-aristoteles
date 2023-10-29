import { PropsWithChildren } from 'react'
import { getUser } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'
import SidebarProvider from '@/shared/contexts/sidebar-provider'
import Header from '@/shared/components/header'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <SidebarProvider>
      <Header />

      {children}
    </SidebarProvider>
  )
}

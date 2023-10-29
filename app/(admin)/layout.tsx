import { PropsWithChildren } from 'react'
import { getUser } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'
import SidebarProvider from '@/shared/contexts/sidebar-provider'
import Header from '@/shared/components/header'
import AuthProvider from '@/shared/contexts/auth-provider'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <SidebarProvider>
      <AuthProvider user={user}>
        <Header />

        {children}
      </AuthProvider>
    </SidebarProvider>
  )
}

import Header from '@/shared/components/header'
import AuthProvider from '@/shared/contexts/auth-provider'
import SidebarProvider from '@/shared/contexts/sidebar-provider'
import { getCurrentUser } from '@/shared/services/profile.service'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/login')
  }

  if (user.status === 'unconfirmed') {
    return redirect('/ativar')
  }

  return (
    <AuthProvider user={user}>
      <SidebarProvider>
        <Header />

        {children}
      </SidebarProvider>
    </AuthProvider>
  )
}

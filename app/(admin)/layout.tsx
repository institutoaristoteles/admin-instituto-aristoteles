import Header from '@/shared/components/header'
import AuthProvider from '@/shared/contexts/auth-provider'
import SidebarProvider from '@/shared/contexts/sidebar-provider'
import { getUser } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await getUser()

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

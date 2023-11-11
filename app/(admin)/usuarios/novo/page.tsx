import UsersForm from '@/app/(admin)/usuarios/users-form'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import PageHeader from '@/shared/components/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novo usuário',
}

export default function NewUserPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Usuários', path: '/usuarios' },
    { label: 'Novo' },
  ]

  return (
    <main>
      <div className="container">
        <PageHeader title="Novo usuário" breadcrumbs={breadcrumbs} />
        <UsersForm />
      </div>
    </main>
  )
}

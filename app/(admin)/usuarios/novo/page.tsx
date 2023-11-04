import PageHeader from '@/shared/components/page-header'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import UsersForm from '@/app/(admin)/usuarios/users-form'

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

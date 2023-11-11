import UsersTable from '@/app/(admin)/usuarios/users-table'
import PageHeader from '@/shared/components/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Usuários',
}

export default function UsersPage() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Usuários" breadcrumbs={[{ label: 'Usuários' }]} />
        <UsersTable />
      </div>
    </main>
  )
}

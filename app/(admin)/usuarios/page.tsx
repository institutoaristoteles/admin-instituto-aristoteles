import PageHeader from '@/shared/components/page-header'
import UsersTable from '@/app/(admin)/usuarios/users-table'

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

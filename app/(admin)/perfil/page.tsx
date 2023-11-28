import EditProfileForm from '@/app/(admin)/perfil/edit-profile-form'
import PageHeader from '@/shared/components/page-header'

export default function ProfilePage() {
  const breadcrumbs = [{ label: 'Meu perfil' }]

  return (
    <main>
      <div className="container">
        <PageHeader title="Meu perfil" breadcrumbs={breadcrumbs} />

        <EditProfileForm />
      </div>
    </main>
  )
}

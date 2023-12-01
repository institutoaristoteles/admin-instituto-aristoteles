import UpdateAvatarForm from '@/app/(admin)/perfil/update-avatar-form'
import UpdatePasswordForm from '@/app/(admin)/perfil/update-password-form'
import UpdateUserInfoForm from '@/app/(admin)/perfil/update-user-info-form'
import PageHeader from '@/shared/components/page-header'

export default function ProfilePage() {
  const breadcrumbs = [{ label: 'Meu perfil' }]

  return (
    <main>
      <div className="container">
        <PageHeader title="Meu perfil" breadcrumbs={breadcrumbs} />

        <section className="flex flex-col-reverse gap-10 md:grid md:gap-24 md:grid-cols-[auto_auto] mt-7">
          <div className="flex flex-col gap-16">
            <UpdateUserInfoForm />
            <UpdatePasswordForm />
          </div>

          <UpdateAvatarForm />
        </section>
      </div>
    </main>
  )
}

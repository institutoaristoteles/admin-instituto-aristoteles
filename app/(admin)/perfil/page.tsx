import UpdatePasswordForm from '@/app/(admin)/perfil/update-password-form'
import UpdateUserInfoForm from '@/app/(admin)/perfil/update-user-info-form'
import PageHeader from '@/shared/components/page-header'
import React from 'react'

export default function ProfilePage() {
  const breadcrumbs = [{ label: 'Editar perfil' }]

  return (
    <main>
      <div className="container">
        <PageHeader title="Editar perfil" breadcrumbs={breadcrumbs} />
        <section className="flex flex-col gap-10 max-w-prose">
          <UpdateUserInfoForm />
          <UpdatePasswordForm />
        </section>
      </div>
    </main>
  )
}

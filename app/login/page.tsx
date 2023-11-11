import LoginForm from '@/app/login/login-form'

import logoSvg from '@/shared/images/logo.svg'
import { getUser } from '@/shared/services/auth.service'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()

  if (user) {
    return redirect('/')
  }

  return (
    <main>
      <div className="md:container flex items-center justify-center h-screen md:max-w-lg">
        <div className="w-full md:bg-surface-card md:rounded-2xl p-5 h-full md:h-auto md:p-10 shadow flex flex-col justify-center gap-10">
          <header className="flex flex-col gap-5 items-center">
            <Image
              src={logoSvg}
              alt="Logo Instituto Aristóteles"
              className="max-h-24"
              priority
            />

            <div>
              <span className="opacity-75 uppercase block text-center text-sm mb-2">
                Instituto Aristóteles
              </span>
              <h1 className="text-2xl text-primary text-center font-bold">
                Administração
              </h1>
            </div>
          </header>

          <LoginForm />
        </div>
      </div>
    </main>
  )
}

import Image from 'next/image'

import logoSvg from '@/shared/images/logo.svg'
import LoginForm from '@/app/login/login-form'

export default function LoginPage() {
  return (
    <main>
      <div className="container flex items-center justify-center h-screen max-w-lg">
        <div className="w-full bg-surface-card rounded-2xl p-10 shadow flex flex-col gap-10">
          <header className="flex flex-col gap-5 items-center">
            <Image
              src={logoSvg}
              alt="Logo Instituto Aristóteles"
              className="max-h-40"
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

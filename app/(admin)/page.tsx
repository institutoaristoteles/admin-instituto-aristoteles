import { getUser } from '@/shared/services/auth.service'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Home() {
  const user = await getUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <main>
      <div className="container">
        <h2 className="text-5xl font-bold text-center text-primary py-5">
          Bem vindo, {user.name}!
        </h2>
      </div>
    </main>
  )
}

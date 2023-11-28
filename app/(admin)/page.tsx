import PageHeader from '@/shared/components/page-header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default async function Home() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Seja bem vindo(a)" />
      </div>
    </main>
  )
}

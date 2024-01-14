import PostForm from '@/app/(admin)/artigos/post-form'
import PageHeader from '@/shared/components/page-header'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Novo artigo',
}

export default function NewPostPage() {
  const breadcrumbs = [
    {
      label: 'Artigos',
      path: '/artigos',
    },
    {
      label: 'Novo',
    },
  ]

  return (
    <main>
      <div className="container">
        <PageHeader title="Novo artigo" breadcrumbs={breadcrumbs} />
        <PostForm />
      </div>
    </main>
  )
}

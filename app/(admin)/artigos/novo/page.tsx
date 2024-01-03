import PostForm from '@/app/(admin)/artigos/post-form'
import PageHeader from '@/shared/components/page-header'
import React from 'react'

export default function NewPostPage() {
  return (
    <main>
      <div className="container">
        <PageHeader title="Novo artigo" />

        <PostForm />
      </div>
    </main>
  )
}

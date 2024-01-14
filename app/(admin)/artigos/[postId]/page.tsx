import PostForm from '@/app/(admin)/artigos/post-form'
import PageHeader from '@/shared/components/page-header'
import { getPostById } from '@/shared/services/posts.service'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Editando artigo',
}

export default async function EditPostPage({
  params,
}: {
  params: { postId: string }
}) {
  const post = await getPostById(params.postId)

  const breadcrumbs = [
    {
      label: 'Artigos',
      path: '/artigos',
    },
    {
      label: post.title,
    },
  ]

  return (
    <main>
      <div className="container">
        <PageHeader title="Editar artigo" breadcrumbs={breadcrumbs} />
        <PostForm post={post} />
      </div>
    </main>
  )
}

import PostsTable from '@/app/(admin)/artigos/posts-table'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import PageHeader from '@/shared/components/page-header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Artigos',
}

function PostsPage() {
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Artigos' }]

  return (
    <main>
      <div className="container">
        <PageHeader title="Artigos" breadcrumbs={breadcrumbs} />
        <PostsTable />
      </div>
    </main>
  )
}

export default PostsPage

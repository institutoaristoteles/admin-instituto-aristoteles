import React from 'react'
import CategoryForm from '@/app/(admin)/categorias/category-form'
import { Metadata } from 'next'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import PageHeader from '@/shared/components/page-header'

export const metadata: Metadata = {
  title: 'Nova categoria',
}

export default function NewCategoryPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Categorias', path: '/categorias' },
    { label: 'Novo' },
  ]

  return (
    <main>
      <div className="container">
        <PageHeader title="Nova categoria" breadcrumbs={breadcrumbs} />
        <CategoryForm />
      </div>
    </main>
  )
}

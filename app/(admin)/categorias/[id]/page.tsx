import React from 'react'
import CategoryForm from '@/app/(admin)/categorias/category-form'
import { getCategoryById } from '@/shared/services/categories.service'
import { Metadata } from 'next'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import PageHeader from '@/shared/components/page-header'

export const metadata: Metadata = {
  title: 'Editar categoria',
}

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const category = await getCategoryById(params.id)
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Categorias', path: '/categorias' },
    { label: category.title },
  ]

  return (
    <main>
      <div className="container">
        <PageHeader title="Editar categoria" breadcrumbs={breadcrumbs} />
        <CategoryForm category={category} />
      </div>
    </main>
  )
}

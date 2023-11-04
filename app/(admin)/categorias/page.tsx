import React from 'react'
import CategoriesTable from '@/app/(admin)/categorias/categories-table'
import { Metadata } from 'next'
import { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import PageHeader from '@/shared/components/page-header'

export const metadata: Metadata = {
  title: 'Categorias',
}

export default async function CategoriesPage() {
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Categorias' }]
  return (
    <main>
      <div className="container">
        <PageHeader title="Categorias" breadcrumbs={breadcrumbs} />
        <CategoriesTable />
      </div>
    </main>
  )
}

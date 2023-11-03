import React from 'react'
import CategoriesTable from '@/app/(admin)/categorias/categories-table'
import { Metadata } from 'next'
import { Breadcrumb, Breadcrumbs } from '@/shared/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Categorias',
}

export default async function CategoriesPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label="Categorias" />
        </Breadcrumbs>

        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary pb-5">Categorias</h2>
        </header>

        <CategoriesTable />
      </div>
    </main>
  )
}

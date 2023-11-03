import React from 'react'
import CategoryForm from '@/app/(admin)/categorias/category-form'
import { Metadata } from 'next'
import { Breadcrumb, Breadcrumbs } from '@/shared/components/breadcrumbs'

export const metadata: Metadata = {
  title: 'Nova categoria',
}

export default function NewCategoryPage() {
  return (
    <main>
      <div className="container">
        <Breadcrumbs>
          <Breadcrumb label="Categorias" path="/categorias" />
          <Breadcrumb label="Novo" />
        </Breadcrumbs>

        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary pb-5">
            Nova categoria
          </h2>
        </header>

        <CategoryForm />
      </div>
    </main>
  )
}

import React from 'react'
import CategoryForm from '@/app/(admin)/categorias/category-form'
import { getCategoryById } from '@/shared/services/categories.service'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar categoria',
}

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string }
}) {
  const category = await getCategoryById(params.id)

  return (
    <main>
      <div className="container">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary py-10">
            Nova categoria
          </h2>
        </header>

        <CategoryForm category={category} />
      </div>
    </main>
  )
}

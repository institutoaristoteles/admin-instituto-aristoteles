import React from 'react'
import { getCategories } from '@/shared/services/categories.service'
import CategoriesTable from '@/app/(admin)/categorias/categories-table'
import { Button } from 'primereact/button'
import Link from 'next/link'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <main>
      <div className="container">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary py-10">Categorias</h2>
          <div className="flex items-center gap-5">
            <Link href="/categorias/novo">
              <Button label="Nova categoria" icon="pi pi-plus" size="small" />
            </Link>
          </div>
        </header>

        <CategoriesTable categories={categories} />
      </div>
    </main>
  )
}

'use client'

import React from 'react'
import CategoryForm from '@/app/(admin)/categorias/novo/category-form'

export default function NewCategoryPage() {
  return (
    <main>
      <div className="container">
        <header className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary py-10">
            Nova categoria
          </h2>
        </header>

        <CategoryForm />
      </div>
    </main>
  )
}

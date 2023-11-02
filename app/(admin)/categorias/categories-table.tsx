'use client'

import { Category } from '@/shared/models/category'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'

interface CategoriesTableProps {
  categories: Category[]
}

const dateFormatter = new Intl.DateTimeFormat('pt-br', {
  dateStyle: 'medium',
})

export default function CategoriesTable({ categories }: CategoriesTableProps) {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])

  return (
    <DataTable
      value={categories}
      selection={selectedCategories}
      selectionMode="checkbox"
      onSelectionChange={(e) => setSelectedCategories(e.value)}
    >
      <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
      <Column
        header="Nome"
        headerStyle={{ width: '100%' }}
        body={(category: Category) => (
          <Link
            href={`/categories/${category.slug}`}
            className="underline font-bold text-sm whitespace-nowrap"
          >
            {category.title}
          </Link>
        )}
      />
      <Column
        header={<span className="whitespace-nowrap">Data de criação</span>}
        body={(category: Category) => (
          <time className="w-min block whitespace-nowrap text-sm">
            {dateFormatter.format(new Date(category.createdAt))}
          </time>
        )}
      />
      <Column
        header={<span className="whitespace-nowrap">Última atualização</span>}
        body={(category: Category) => (
          <time className="w-min block whitespace-nowrap text-sm">
            {dateFormatter.format(new Date(category.updatedAt))}
          </time>
        )}
      />
      <Column
        body={(_category: Category) => (
          <div className="flex items-center gap-2">
            <Button icon={PrimeIcons.PENCIL} text rounded severity="info" />
            <Button icon={PrimeIcons.TRASH} text rounded severity="danger" />
          </div>
        )}
      />
    </DataTable>
  )
}

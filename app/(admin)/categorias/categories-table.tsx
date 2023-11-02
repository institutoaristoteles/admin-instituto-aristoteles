'use client'

import { Category } from '@/shared/models/category'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { getCategories } from '@/shared/services/categories.service'
import Link from 'next/link'

const dateFormatter = new Intl.DateTimeFormat('pt-br', {
  dateStyle: 'medium',
})

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        setLoadingCategories(true)
        setCategories(await getCategories())
      } catch (e) {
        console.error(e)
      } finally {
        setLoadingCategories(false)
      }
    })()

    return () => setCategories([])
  }, [])

  return (
    <React.Fragment>
      <header className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/categorias/novo">
            <Button
              label="Nova categoria"
              icon={PrimeIcons.PLUS}
              size="small"
            />
          </Link>

          {selectedCategories.length > 0 && (
            <Button
              label="Excluir"
              icon={PrimeIcons.TRASH}
              size="small"
              severity="danger"
            />
          )}
        </div>
      </header>

      <DataTable
        value={categories}
        selection={selectedCategories}
        selectionMode="checkbox"
        onSelectionChange={(e) => setSelectedCategories(e.value)}
        loading={loadingCategories}
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column
          header="Nome"
          headerStyle={{ width: '100%' }}
          body={(category: Category) => (
            <span className="font-bold text-sm whitespace-nowrap">
              {category.title}
            </span>
          )}
        />
        <Column
          header={<span className="whitespace-nowrap">Data de criação</span>}
          body={(category: Category) => (
            <time className="w-min block whitespace-nowrap text-sm text-text-color-secondary">
              {dateFormatter.format(new Date(category.createdAt))}
            </time>
          )}
        />
        <Column
          header={<span className="whitespace-nowrap">Última atualização</span>}
          body={(category: Category) => (
            <time className="w-min block whitespace-nowrap text-sm text-text-color-secondary">
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
    </React.Fragment>
  )
}

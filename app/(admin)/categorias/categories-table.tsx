'use client'

import { Category } from '@/shared/models/category'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useCallback, useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import {
  bulkDeleteCategories,
  deleteCategory,
  getCategories,
} from '@/shared/services/categories.service'
import Link from 'next/link'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { dateFormatter } from '@/shared/utils/date'
import toast from 'react-hot-toast'
import { Badge } from 'primereact/badge'

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const loadCategories = useCallback(async () => {
    try {
      setLoading(true)
      setCategories(await getCategories())
    } catch (e) {
      toast.error('Ocorreu um erro ao carregar as categorias')
    } finally {
      setLoading(false)
    }
  }, [])

  const removeSelectedCategories = useCallback(async () => {
    try {
      setLoading(true)
      const ids = selectedCategories.map((category) => category.id)
      if (ids.length <= 0) return

      await bulkDeleteCategories(...ids)
      await loadCategories()
      toast.success(
        `${selectedCategories.length} categoria(s) removidas com sucesso`,
      )
      setSelectedCategories([])
    } catch (e) {
      toast.error('Ocorreu um erro ao remover as categorias')
    } finally {
      setLoading(false)
    }
  }, [loadCategories, selectedCategories])

  const removeCategory = useCallback(
    async (id: string) => {
      try {
        setLoading(true)
        await deleteCategory(id)
        await loadCategories()
        toast.success('Categoria removida com sucesso')
      } catch (e) {
        toast.error('Ocorreu um erro ao remover a categoria')
      } finally {
        setLoading(false)
      }
    },
    [loadCategories],
  )

  const confirmCategoryRemoval = useCallback(
    (category: Category) => {
      confirmDialog({
        message: `Tem certeza que deseja excluir a categoria ${category.title}?`,
        header: 'Excluir categoria',
        icon: PrimeIcons.TRASH,
        acceptClassName: 'p-button-danger',
        rejectLabel: 'Não, cancelar',
        acceptLabel: 'Sim, excluir',
        async accept() {
          return await removeCategory(category.id)
        },
      })
    },
    [removeCategory],
  )

  const confirmCategoriesRemoval = useCallback(() => {
    confirmDialog({
      message: (
        <>
          Tem certeza que deseja excluir as seguintes categorias?
          <ul className="pl-5 pt-5">
            {selectedCategories.map((cat) => (
              <li key={cat.id} className="list-disc">
                {cat.title}
              </li>
            ))}
          </ul>
        </>
      ),
      header: 'Excluir categorias',
      icon: PrimeIcons.TRASH,
      acceptClassName: 'p-button-danger',
      rejectLabel: 'Não, cancelar',
      acceptLabel: 'Sim, excluir',
      accept: removeSelectedCategories,
    })
  }, [removeSelectedCategories, selectedCategories])

  useEffect(() => {
    ;(async () => {
      await loadCategories()
    })()

    return () => setCategories([])
  }, [loadCategories])

  return (
    <React.Fragment>
      <header className="flex items-center justify-between gap-5 pb-5">
        <div className="flex items-center gap-2 shrink-0">
          <Link href="/categorias/novo">
            <Button
              label="Nova categoria"
              icon={PrimeIcons.PLUS}
              size="small"
              severity="success"
              outlined
            />
          </Link>

          {selectedCategories.length > 0 && (
            <Button
              label="Excluir"
              icon={PrimeIcons.TRASH}
              size="small"
              severity="danger"
              onClick={confirmCategoriesRemoval}
              loading={loading}
              outlined
            >
              <Badge
                value={selectedCategories.length.toString()}
                severity="danger"
              />
            </Button>
          )}
        </div>
      </header>

      <DataTable
        value={categories}
        selection={selectedCategories}
        selectionMode="checkbox"
        onSelectionChange={(e) => setSelectedCategories(e.value)}
        loading={loading}
        dataKey="id"
        paginator
        rows={10}
        emptyMessage="Nenhuma categoria encontrada"
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
          body={(category: Category) => (
            <div className="flex items-center gap-2">
              <Link href={`/categorias/${category.id}/editar`}>
                <Button icon={PrimeIcons.PENCIL} text rounded severity="info" />
              </Link>

              <Button
                icon={PrimeIcons.TRASH}
                text
                rounded
                severity="danger"
                onClick={() => confirmCategoryRemoval(category)}
              />
            </div>
          )}
        />
      </DataTable>

      <ConfirmDialog />
    </React.Fragment>
  )
}

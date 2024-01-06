import { getCategories } from '@/shared/services/categories.service'
import { Dropdown } from 'primereact/dropdown'
import React, { useMemo } from 'react'
import useSWR from 'swr'

export default function CategoriesSelector(
  props: React.ComponentProps<typeof Dropdown>,
) {
  const { data, isLoading } = useSWR('/categories', getCategories)

  const options = useMemo(() => {
    if (!data) return []

    return data.map((cat) => ({ label: cat.title, value: cat.id }))
  }, [data])

  return (
    <Dropdown
      {...props}
      options={options}
      placeholder={isLoading ? 'Carregando categorias...' : undefined}
    />
  )
}

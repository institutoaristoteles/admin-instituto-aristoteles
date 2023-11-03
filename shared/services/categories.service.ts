import { api } from '@/shared/services/api'
import { Category } from '@/shared/models/category'
import React from 'react'

export interface SaveCategory {
  id?: string
  name: string
}

export const getCategories = React.cache(async () => {
  const { data } = await api.get<Category[]>('/categories')
  return data
})

export const getCategoryById = React.cache(async (id: string) => {
  const { data } = await api.get<Category>(`/categories/${id}`)
  return data
})

export const saveCategory = React.cache(async (data: SaveCategory) => {
  const isUpdate = !!data.id

  if (isUpdate) {
    return await api.put('/categories', data)
  }

  await api.post('/categories', data)
})

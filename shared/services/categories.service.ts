import { api } from '@/shared/services/api'
import { Category } from '@/shared/models/category'
import React from 'react'

export interface SaveCategory {
  title: string
}

export const getCategories = React.cache(async () => {
  const { data } = await api.get<Category[]>('/categories')
  return data
})

export const getCategoryById = React.cache(async (id: string) => {
  const { data } = await api.get<Category>(`/categories/${id}`)
  return data
})

export const saveCategory = React.cache(
  async (data: SaveCategory, id?: string) => {
    if (id) {
      return await api.put(`/categories/${id}`, data)
    }

    await api.post('/categories', data)
  },
)

export const deleteCategories = React.cache(async (...ids: string[]) => {
  await api.delete('/categories/bulk-delete', {
    data: { ids },
  })
})

export const deleteCategory = React.cache(async (id: string) => {
  await api.delete(`/categories/${id}`)
})

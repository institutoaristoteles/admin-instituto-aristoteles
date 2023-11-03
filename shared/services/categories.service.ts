import { api } from '@/shared/services/api'
import { Category } from '@/shared/models/category'
import React from 'react'

export interface NewCategory {
  name: string
}

export const getCategories = React.cache(async () => {
  const { data } = await api.get<Category[]>('/categories')
  return data
})

export const saveCategory = React.cache(async (data: NewCategory) => {
  await api.post('/categories', data)
})

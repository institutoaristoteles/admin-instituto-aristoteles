import { api } from '@/shared/services/api'
import { Category } from '@/shared/models/category'
import React from 'react'

export const getCategories = React.cache(async () => {
  const { data } = await api.get<Category[]>('/categories')
  return data
})

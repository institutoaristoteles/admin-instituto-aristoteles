import { api } from '@/shared/services/api'
import { Category } from '@/shared/models/category'

export async function getCategories() {
  const { data } = await api.get<Category[]>('/categories')
  return data
}

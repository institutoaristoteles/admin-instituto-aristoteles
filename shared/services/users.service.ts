import { api } from '@/shared/services/api'
import { UserProfile } from '@/shared/models/user-profile'
import React from 'react'

export type GetUsersFilters = Partial<{
  pageSize: number
  page: number
}>

const defaultFilters: GetUsersFilters = { pageSize: 10, page: 1 }

export const getUsers = React.cache(
  async (filters: GetUsersFilters = defaultFilters) => {
    const { data } = await api.get<UserProfile[]>('/users', {
      params: filters,
    })

    return data
  },
)

import { Role, UserProfile } from '@/shared/models/user-profile'
import { api } from '@/shared/services/api'
import React from 'react'

export interface SaveUser {
  name: string
  username: string
  email: string
  password: string
  role: Role
}

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

export const saveUser = React.cache(async (data: SaveUser) => {
  await api.post('/users', data)
})

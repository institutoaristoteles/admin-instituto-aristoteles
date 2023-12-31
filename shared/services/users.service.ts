import { Role, UserProfile } from '@/shared/models/user-profile'
import { api } from '@/shared/services/api'
import React from 'react'

export interface SaveUser {
  name: string
  username: string
  email: string
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

export const createUser = React.cache(async (data: SaveUser) => {
  await api.post('/users', data)
})

export const updateUser = React.cache(
  async (userId: string, data: Pick<SaveUser, 'role'>) => {
    await api.put(`/users/${userId}`, data)
  },
)

export const deleteUser = React.cache(async (id: string) => {
  await api.delete(`/users/${id}`)
})

export const resetUser = React.cache(async (id: string) => {
  await api.put(`/users/${id}/reset-password`)
})

export const getUserById = React.cache(async (id: string) => {
  const { data } = await api.get<UserProfile>(`/users/${id}`)
  return data
})

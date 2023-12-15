import { UserProfile } from '@/shared/models/user-profile'
import { api } from '@/shared/services/api'
import React from 'react'

export interface UpdateProfile {
  name: string
  email: string
  avatar?: string
}

export interface ActivateUserPassword {
  oldPassword: string
  newPassword: string
}

export interface UpdatePassword {
  oldPassword: string
  newPassword: string
}

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get<UserProfile>('/users/me')
    return data
  } catch (e) {
    return null
  }
}

export const activateUser = React.cache(async (data: ActivateUserPassword) => {
  await api.put(`/users/me/activate-user`, data)
})

export const updateProfile = React.cache(async (data: UpdateProfile) => {
  await api.put('/users/me', data)
})

export const updatePassword = React.cache(async (data: UpdatePassword) => {
  await api.put('/users/me/update-password', data)
})

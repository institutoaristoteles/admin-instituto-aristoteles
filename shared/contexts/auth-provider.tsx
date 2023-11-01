'use client'

import { createContext, PropsWithChildren, useContext } from 'react'
import { UserProfile } from '@/shared/models/user-profile'

const defaultUser: UserProfile = {
  id: '',
  email: '',
  avatar: '',
  name: '',
  username: '',
}

export const AuthContext = createContext<{ user: UserProfile }>({
  user: defaultUser,
})

export default function AuthProvider({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

'use client'

import { createContext, PropsWithChildren, useContext } from 'react'
import { UserProfile } from '@/shared/models/user-profile'

const defaultUser = { id: '', email: '', avatar: '', name: '' }

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

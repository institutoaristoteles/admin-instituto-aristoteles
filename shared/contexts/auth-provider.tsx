'use client'

import { createContext, PropsWithChildren, useContext } from 'react'
import { UserProfile } from '@/shared/models/user-profile'

export const AuthContext = createContext<UserProfile | null>(null)

export default function AuthProvider({
  user,
  children,
}: PropsWithChildren<{ user: UserProfile }>) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export function useCurrentUser() {
  const user = useContext(AuthContext)

  if (user === null) {
    throw new Error('useCurrentUser cannot be called without an AuthProvider')
  }

  return user
}

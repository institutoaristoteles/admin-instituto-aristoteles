'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'
import Sidebar from '@/shared/components/sidebar'

interface SidebarContextProps {
  open: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps | null>(null)

export default function SidebarProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  const value = useMemo(() => ({ open, setSidebarOpen: setOpen }), [open])

  return (
    <SidebarContext.Provider value={value}>
      <div className="lg:grid lg:grid-cols-[auto_1fr] h-screen max-h-screen">
        <Sidebar />

        <div className="overflow-auto pb-10">{children}</div>
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const value = useContext(SidebarContext)

  if (value === null) {
    throw new Error('useSidebar cannot be called without an SidebarProvider')
  }

  return value
}

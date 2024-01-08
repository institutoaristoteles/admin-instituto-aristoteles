'use client'

import Sidebar from '@/shared/components/sidebar'
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

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
      <div className="lg:grid lg:grid-cols-[auto_1fr] h-full min-h-full">
        <Sidebar />

        <div className="overflow-auto pb-10 lg:px-10 h-full">{children}</div>
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

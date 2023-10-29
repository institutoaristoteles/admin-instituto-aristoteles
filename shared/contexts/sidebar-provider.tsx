'use client'

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import Sidebar from '@/shared/components/sidebar'

interface SidebarContextProps {
  open: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setSidebarOpen: () => {},
})

export default function SidebarProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false)

  return (
    <SidebarContext.Provider value={{ open, setSidebarOpen: setOpen }}>
      <div className="lg:grid lg:grid-cols-[auto_1fr] h-screen max-h-screen">
        <Sidebar />

        <div className="overflow-auto">{children}</div>
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}

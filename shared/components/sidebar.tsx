import SidebarMenu from '@/shared/components/sidebar-menu'
import { useSidebar } from '@/shared/contexts/sidebar-provider'
import logoSvg from '@/shared/images/logo.svg'
import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export default function Sidebar() {
  const ref = useRef(null)
  const { open, setSidebarOpen } = useSidebar()

  useOnClickOutside(ref, () => setSidebarOpen(false))

  return (
    <aside
      ref={ref}
      className={clsx(
        'bg-surface-overlay flex flex-col items-center gap-10 border-r border-r-surface-border h-full min-w-[250px] transition-all max-lg:fixed',
        {
          'max-lg:top-0 max-lg:-translate-x-full': !open,
          'max-lg:max-w-[75%] max-lg:z-10': open,
        },
      )}
    >
      <header className="flex flex-col gap-5 items-center p-5">
        <Image
          src={logoSvg}
          alt="Logo Instituto Aristóteles"
          height={64}
          priority
          className="max-lg:hidden"
        />

        <div>
          <h1 className="text-xl text-primary text-center font-bold">
            Administração
          </h1>
          <span className="uppercase block text-center text-xs mb-2 text-text-color-secondary">
            Instituto Aristóteles
          </span>
        </div>
      </header>

      <SidebarMenu />
    </aside>
  )
}

import Image from 'next/image'
import logoSvg from '@/shared/images/logo.svg'
import MenuItem from '@/shared/components/menu-item'
import clsx from 'clsx'
import { useOnClickOutside } from 'usehooks-ts'
import { useRef } from 'react'

interface SidebarProps {
  open: boolean
  onOutsideClick: () => any
}

export default function Sidebar({ open, onOutsideClick }: SidebarProps) {
  const ref = useRef(null)

  useOnClickOutside(ref, onOutsideClick)

  return (
    <aside
      ref={ref}
      className={clsx(
        'bg-surface-overlay flex flex-col items-center gap-10 border-r border-r-surface-border h-full md:min-w-[300px] transition-all max-md:fixed',
        {
          'max-md:top-0 max-md:-translate-x-full': !open,
          'max-md:w-[75%] max-md:z-10': open,
        },
      )}
    >
      <header className="flex flex-col gap-5 items-center p-5">
        <Image
          src={logoSvg}
          alt="Logo Instituto Aristóteles"
          className="max-h-16"
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

      <nav className="w-full flex flex-col gap-1 px-3">
        <MenuItem
          label="Artigos"
          href="/artigos"
          icon={<i className="pi pi-book" />}
        />
        <MenuItem
          label="Categorias"
          href="/categorias"
          icon={<i className="pi pi-th-large" />}
        />
        <MenuItem
          label="Usuários"
          href="/usuarios"
          icon={<i className="pi pi-users" />}
        />
        <MenuItem
          label="Configurações"
          href="/configuracoes"
          icon={<i className="pi pi-cog" />}
        />
      </nav>
    </aside>
  )
}

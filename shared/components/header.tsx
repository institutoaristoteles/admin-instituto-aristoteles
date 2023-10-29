import SidebarTrigger from '@/shared/components/sidebar-trigger'

export default function Header() {
  return (
    <header>
      <div className="container py-2">
        <SidebarTrigger />
      </div>
    </header>
  )
}

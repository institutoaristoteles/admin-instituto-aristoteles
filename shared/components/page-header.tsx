import Breadcrumbs, { BreadcrumbItem } from '@/shared/components/breadcrumbs'
import React, { memo } from 'react'

interface PageHeaderProps {
  title: string
  breadcrumbs?: BreadcrumbItem[]
}

function PageHeader({ breadcrumbs = [], title }: PageHeaderProps) {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary pb-5">{title}</h2>
      </header>
    </>
  )
}

export default memo(PageHeader)

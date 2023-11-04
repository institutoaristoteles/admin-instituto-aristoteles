import { BreadcrumbItem, Breadcrumbs } from '@/shared/components/breadcrumbs'
import React from 'react'

interface PageHeaderProps {
  title: string
  breadcrumbs: BreadcrumbItem[]
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <>
      <Breadcrumbs items={props.breadcrumbs} />
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-primary pb-5">{props.title}</h2>
      </header>
    </>
  )
}

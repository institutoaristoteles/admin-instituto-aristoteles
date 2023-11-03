'use client'

import { Children, ReactElement, useCallback } from 'react'
import Link from 'next/link'
import { PrimeIcons } from 'primereact/api'
import clsx from 'clsx'

export interface BreadcrumbItem {
  label: string
  path?: string
}

type BreadcrumbsChildren =
  | ReactElement<BreadcrumbItem>
  | ReactElement<BreadcrumbItem>[]

export function Breadcrumbs({ children }: { children?: BreadcrumbsChildren }) {
  const typedChildren = Children.toArray(
    children,
  ) as ReactElement<BreadcrumbItem>[]

  const renderItem = useCallback((item: BreadcrumbItem) => {
    if (item.path) {
      return (
        <Link
          href={item.path}
          className="text-text-color underline underline-offset-4"
        >
          {item.label}
        </Link>
      )
    }

    return <span>{item.label}</span>
  }, [])

  return (
    <div>
      <ul className="flex items-center gap-2 text-text-color-secondary text-sm py-5">
        <li
          className={clsx('flex items-center', {
            "after:content-['/']": typedChildren.length === 0,
            'after:ml-2': typedChildren.length === 0,
          })}
        >
          <Link href="/" title="Home" className="text-text-color">
            <i className={`text-base ${PrimeIcons.HOME}`} />
          </Link>
        </li>

        {typedChildren.map((item, index) => (
          <li
            key={index}
            className="flex items-center before:content-['/'] before:mr-2"
          >
            {renderItem(item.props)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Breadcrumb(_: BreadcrumbItem) {
  return <></>
}

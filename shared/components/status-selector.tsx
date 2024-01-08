import { PostStatus, PostStatuses } from '@/shared/models/post-status'
import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { SelectItem } from 'primereact/selectitem'
import { TagProps } from 'primereact/tag'
import React, { useCallback } from 'react'

type StatusSelectorProps = Omit<DropdownProps, 'itemTemplate' | 'options'>

export default function StatusSelector({ ...props }: StatusSelectorProps) {
  const statusTemplate = useCallback((option: SelectItem) => {
    const props: Record<PostStatus, TagProps> = {
      draft: {
        value: 'Rascunho',
        severity: 'warning',
      },
      published: {
        value: 'Publicado',
        severity: 'success',
      },
    }

    const statusProp = props[option.value as PostStatus]

    return statusProp.value
  }, [])

  return (
    <Dropdown
      valueTemplate={statusTemplate}
      itemTemplate={statusTemplate}
      options={PostStatuses.map((status) => {
        return {
          label: status,
          value: status,
        } as SelectItem
      })}
      {...props}
    />
  )
}

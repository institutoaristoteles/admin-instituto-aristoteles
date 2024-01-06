import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import React, { useCallback, useMemo, useRef } from 'react'

interface ImageUploadInputProps {
  onSelect: (file?: File) => void
  selected?: string
  loading: boolean
}

export default function ImageUploadInput({
  selected,
  onSelect,
  loading,
}: ImageUploadInputProps) {
  const fileInput = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    fileInput.current?.click()
  }, [])

  const handleFileSelection = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      file && onSelect(file)
    },
    [onSelect],
  )

  const handleClear = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault()
      onSelect(undefined)

      if (fileInput.current) {
        fileInput.current.value = ''
      }
    },
    [onSelect],
  )

  const buttons = useMemo(() => {
    if (!selected) {
      return (
        <Button
          label="Selecionar"
          type="button"
          outlined
          size="small"
          icon={PrimeIcons.PENCIL}
          onClick={handleClick}
          loading={loading}
        />
      )
    }

    return (
      <React.Fragment>
        <Button
          type="button"
          outlined
          rounded
          size="small"
          onClick={handleClick}
          icon={PrimeIcons.PENCIL}
          loading={loading}
        />
        <Button
          outlined
          rounded
          icon={PrimeIcons.TRASH}
          severity="danger"
          type="button"
          size="small"
          onClick={handleClear}
          loading={loading}
        />
      </React.Fragment>
    )
  }, [handleClear, handleClick, loading, selected])

  return (
    <div className="flex items-center gap-5">
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileSelection}
        className="hidden"
        accept="image/png, image/jpeg"
      />

      {selected && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={selected}
          alt=""
          className="rounded-2xl aspect-square object-cover shadow w-[120px] h-[120px]"
        />
      )}

      <div className="flex flex-col gap-2">{buttons}</div>
    </div>
  )
}

// export default React.memo(ImageUploadInput)

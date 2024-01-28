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

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
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
        <React.Fragment>
          <p className="text-sm font-normal">
            Clique{' '}
            <button
              onClick={handleClick}
              className="inline text-primary underline"
              type="button"
            >
              aqui
            </button>{' '}
            para selecionar uma imagem.
          </p>
        </React.Fragment>
      )
    }

    return (
      <div className="flex gap-2">
        <Button
          type="button"
          text
          size="small"
          label="Trocar"
          onClick={handleClick}
          icon={PrimeIcons.PENCIL}
          loading={loading}
          pt={{
            label: { className: 'font-normal text-sm' },
            root: { className: 'p-2' },
          }}
        />
        <Button
          text
          icon={PrimeIcons.TRASH}
          severity="danger"
          label="Remover"
          type="button"
          size="small"
          onClick={handleClear}
          loading={loading}
          pt={{
            label: { className: 'font-normal text-sm' },
            root: { className: 'p-2' },
          }}
        />
      </div>
    )
  }, [handleClear, handleClick, loading, selected])

  return (
    <div className="flex flex-col justify-center items-center gap-5 bg-surface-b bg-dotted border border-surface-border rounded p-5">
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
          className="rounded-2xl object-cover shadow max-h-[120px]"
        />
      )}

      <div className="flex flex-col gap-2 w-full justify-center items-center">
        {buttons}
      </div>
    </div>
  )
}

// export default React.memo(ImageUploadInput)

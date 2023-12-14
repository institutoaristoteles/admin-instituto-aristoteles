import ImageUploadInput from '@/shared/components/image-upload-input'
import { uploadFile } from '@/shared/services/self'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

interface AvatarInputProps {
  onChange: (imageUrl?: string) => void
  value: string | undefined
}

export default function AvatarInput({ onChange, value }: AvatarInputProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (file?: File) => {
    if (!file) {
      return onChange(undefined)
    }

    try {
      setLoading(true)
      const url = await uploadFile(file)
      onChange(url)
    } catch (e) {
      toast.error('Ocorreu um erro ao carregar esta imagem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ImageUploadInput
      onSelect={handleSubmit}
      selected={value}
      loading={loading}
    />
  )
}

'use client'

import AvatarField from '@/shared/components/avatar-field'
import LabeledInput from '@/shared/components/labeled-input'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

async function uploadFile(file: File) {
  const formData = new FormData()
  formData.set('name', file.name)
  formData.set('file', file)

  const response = await axios.post<{ url: string }>(
    '/api/upload-avatar',
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  )
  return response.data.url
}

export default function UpdateAvatarForm() {
  const [preview, setPreview] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (file?: File) => {
    if (!file) {
      setPreview(undefined)
      return
    }

    try {
      setLoading(true)
      const url = await uploadFile(file)
      setPreview(url)
    } catch (e) {
      toast.error('Ocorreu um erro ao carregar esta imagem')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form>
      <LabeledInput label="Imagem" className="w-auto">
        <AvatarField
          onSelect={handleSubmit}
          selected={preview}
          loading={loading}
        />
      </LabeledInput>
    </form>
  )
}

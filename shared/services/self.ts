import axios from 'axios'

export async function uploadFile(file: File) {
  const formData = new FormData()
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

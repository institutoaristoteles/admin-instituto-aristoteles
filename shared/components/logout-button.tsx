'use client'

import React from 'react'
import { Button } from 'primereact/button'
import { logout } from '@/shared/services/auth.service'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleClick = async () => {
    logout()
    router.push('/login')
  }

  return (
    <Button
      label="Sair"
      onClick={handleClick}
      severity="danger"
      className="p-0"
      link
      size="small"
    />
  )
}

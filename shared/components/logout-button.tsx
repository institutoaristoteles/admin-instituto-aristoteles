'use client'

import React from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
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
      icon={PrimeIcons.SIGN_OUT}
      severity="danger"
      text
    />
  )
}

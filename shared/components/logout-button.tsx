'use client'

import React, { useCallback, useState } from 'react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import { logout } from '@/shared/services/auth.service'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleClick = useCallback(async () => {
    setPending(true)
    logout()
    setPending(false)
    router.push('/')
  }, [router])

  return (
    <Button
      label="Sair"
      onClick={handleClick}
      icon={PrimeIcons.SIGN_OUT}
      severity="danger"
      loading={pending}
      text
    />
  )
}

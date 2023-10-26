'use client'

import React, { useTransition } from 'react'
import { Button } from 'primereact/button'
import { logoutAction } from '@/shared/actions/auth'
import { PrimeIcons } from 'primereact/api'

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      label="Sair"
      onClick={() => startTransition(logoutAction)}
      icon={PrimeIcons.SIGN_OUT}
      severity="danger"
      loading={isPending}
      text
    />
  )
}

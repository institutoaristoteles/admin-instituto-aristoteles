'use client'

import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import React from 'react'

interface LoginButtonProps extends React.HTMLProps<'button'> {
  pending: boolean
}

export default function LoginButton({ pending, className }: LoginButtonProps) {
  return (
    <Button
      label="Entrar"
      icon={PrimeIcons.SIGN_IN}
      type="submit"
      size="small"
      className={className}
      loading={pending}
    />
  )
}

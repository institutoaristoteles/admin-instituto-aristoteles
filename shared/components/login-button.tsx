'use client'

import { Button } from 'primereact/button'
import React from 'react'
import { PrimeIcons } from 'primereact/api'

export default function LoginButton({ pending }: { pending: boolean }) {
  return (
    <Button
      label="Entrar"
      icon={PrimeIcons.SIGN_IN}
      type="submit"
      size="large"
      className="w-full"
      loading={pending}
    />
  )
}

'use client'

import { useFormStatus } from 'react-dom'
import { Button } from 'primereact/button'
import React from 'react'
import { PrimeIcons } from 'primereact/api'

export default function SubmitButton() {
  const { pending } = useFormStatus()

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

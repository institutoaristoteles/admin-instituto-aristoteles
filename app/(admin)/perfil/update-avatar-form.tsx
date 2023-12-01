'use client'

import AvatarField from '@/shared/components/avatar-field'
import LabeledInput from '@/shared/components/labeled-input'
import React from 'react'

export default function UpdateAvatarForm() {
  return (
    <form>
      <LabeledInput label="Imagem" className="w-auto">
        <AvatarField />
      </LabeledInput>
    </form>
  )
}

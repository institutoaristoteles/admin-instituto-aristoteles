import { SaveUser } from '@/shared/services/users.service'
import clsx from 'clsx'
import { generate } from 'generate-password'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'

function generatePassword(length: number) {
  return generate({
    length,
    numbers: true,
    strict: true,
  })
}

function TemporaryPasswordField() {
  const [copied, setCopied] = useState(false)
  const [, copy] = useCopyToClipboard()

  console.log('hello')

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SaveUser>()

  const currentPassword = watch('password', '')

  const copyPassword = useCallback(async () => {
    await copy(currentPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 300)
    toast.success('Senha copiada para a área de transferência')
  }, [copy, currentPassword])

  const generatePass = useCallback(async () => {
    setValue('password', generatePassword(24))
  }, [setValue])

  const field = register('password')

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="p-inputgroup flex-1">
        <Password
          {...field}
          inputRef={field.ref}
          id={field.name}
          toggleMask
          feedback={false}
          className={clsx({ 'p-invalid': errors.password })}
        />
        <Button
          autoFocus
          severity={copied ? 'success' : 'info'}
          icon={copied ? PrimeIcons.CHECK : PrimeIcons.COPY}
          type="button"
          disabled={!currentPassword.length}
          onClick={copyPassword}
        />
      </div>

      {errors.password && (
        <span className="text-[#ff7b7b] font-normal">
          {errors.password.message}
        </span>
      )}

      <Button
        severity="info"
        icon={PrimeIcons.KEY}
        label="Gerar senha"
        type="button"
        onClick={generatePass}
        link
        className="px-0 mt-2"
      />
    </div>
  )
}

export default React.memo(TemporaryPasswordField)

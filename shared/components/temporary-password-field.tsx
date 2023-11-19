import CopyButton from '@/shared/components/copy-button'
import { SaveUser } from '@/shared/services/users.service'
import clsx from 'clsx'
import { generate } from 'generate-password'
import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import { Password, PasswordProps } from 'primereact/password'
import React, { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

function TemporaryPasswordField(props: Partial<PasswordProps>) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    resetField,
  } = useFormContext<SaveUser>()

  const currentPassword = watch('password', '')
  const field = register('password')

  const generatePass = useCallback(async () => {
    resetField('password')
    const newPassword = generate({
      length: 24,
      numbers: true,
      strict: true,
    })

    setValue('password', newPassword)
  }, [resetField, setValue])

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <div className="p-inputgroup flex-1">
        <Password
          {...field}
          inputRef={field.ref}
          inputId={field.name}
          toggleMask
          feedback={false}
          className={clsx({ 'p-invalid': errors.password })}
          {...props}
        />

        <CopyButton value={currentPassword} />
      </div>

      {errors.password && (
        <span className="text-[#ff7b7b] font-normal">
          {errors.password.message}
        </span>
      )}

      {!props.disabled && !props.readOnly && (
        <Button
          severity="info"
          icon={PrimeIcons.KEY}
          label="Gerar automaticamente"
          type="button"
          onClick={generatePass}
          link
          className="px-0 mt-2"
        />
      )}
    </div>
  )
}

export default React.memo(TemporaryPasswordField)

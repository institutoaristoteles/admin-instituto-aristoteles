import { UserRoles } from '@/shared/models/user-profile'
import { SaveUser } from '@/shared/services/users.service'
import clsx from 'clsx'
import { Dropdown } from 'primereact/dropdown'
import React from 'react'
import { useFormContext } from 'react-hook-form'

function UserRolesField() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SaveUser>()

  const field = register('role')
  const value = watch('role')

  const options = Object.entries(UserRoles).map(([value, role]) => ({
    name: role,
    value,
  }))

  return (
    <React.Fragment>
      <div className="flex flex-col gap-5">
        <Dropdown
          id={field.name}
          name={field.name}
          onChange={(event) => setValue(field.name, event.value)}
          value={value}
          options={options}
          optionLabel="name"
          optionValue="value"
          focusInputRef={field.ref}
          inputId={field.name}
          className={clsx({ 'p-invalid': errors.role })}
        />
      </div>

      {errors.role && (
        <span className="text-[#ff7b7b] font-normal">
          {errors.role.message}
        </span>
      )}
    </React.Fragment>
  )
}

export default React.memo(UserRolesField)

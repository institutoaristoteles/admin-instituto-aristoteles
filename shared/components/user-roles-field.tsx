import { UserRoles } from '@/shared/models/user-profile'
import { SaveUser } from '@/shared/services/users.service'
import { RadioButton } from 'primereact/radiobutton'
import React from 'react'
import { useFormContext } from 'react-hook-form'

function UserRolesField() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SaveUser>()

  const selectedRole = watch('role')

  return (
    <React.Fragment>
      {errors.role && (
        <span className="text-[#ff7b7b] font-normal">
          {errors.role.message}
        </span>
      )}

      <div className="flex flex-col gap-5 py-5">
        {Object.entries(UserRoles).map(([value, role]) => (
          <label key={value} className="flex items-center gap-2">
            <RadioButton
              {...register('role')}
              value={value}
              checked={value === selectedRole}
              onChange={(event) => setValue('role', event.value)}
            />
            {role}
          </label>
        ))}
      </div>
    </React.Fragment>
  )
}

export default React.memo(UserRolesField)

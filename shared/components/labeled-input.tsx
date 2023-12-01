import clsx from 'clsx'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

interface LabeledInputProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLLabelElement> {
  label: string
}

function LabeledInput({ label, children, ...props }: LabeledInputProps) {
  return (
    <label
      {...props}
      className={clsx(
        'text-sm font-bold flex flex-col gap-1 w-full',
        props.className,
      )}
    >
      {label}
      {children}
    </label>
  )
}

export default React.memo(LabeledInput)

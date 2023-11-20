import React, { PropsWithChildren } from 'react'

function LabeledInput({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <label className="text-sm font-bold flex flex-col gap-1 w-full">
      {label}
      {children}
    </label>
  )
}

export default React.memo(LabeledInput)

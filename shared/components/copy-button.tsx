import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import React, { useCallback, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  label: string
  value: any
  onCopy?: () => void
}

function CopyButton({ value, onCopy, label, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const [, copy] = useCopyToClipboard()

  const copyToClipboard = useCallback(async () => {
    await copy(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 300)
    onCopy?.()
  }, [copy, onCopy, value])

  return (
    <Button
      autoFocus
      severity={copied ? 'success' : 'info'}
      icon={copied ? PrimeIcons.CHECK : PrimeIcons.COPY}
      type="button"
      disabled={!value.length}
      onClick={copyToClipboard}
      link
      label={label}
      {...props}
    />
  )
}

export default React.memo(CopyButton)

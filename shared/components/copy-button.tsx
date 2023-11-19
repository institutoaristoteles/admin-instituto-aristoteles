import { PrimeIcons } from 'primereact/api'
import { Button } from 'primereact/button'
import React, { useCallback, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

function CopyButton({ value, onCopy }: { value: any; onCopy?: () => void }) {
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
    />
  )
}

export default React.memo(CopyButton)

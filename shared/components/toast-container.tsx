import React, { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastContainer({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: 'var(--surface-c)',
            color: 'var(--text-color)',
          },
        }}
      />
    </>
  )
}

import React, { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

export default function ToastContainer({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 100000,
          style: {
            borderRadius: '10px',
            background: 'var(--surface-overlay)',
            color: 'var(--text-color)',
          },
        }}
      />
    </>
  )
}

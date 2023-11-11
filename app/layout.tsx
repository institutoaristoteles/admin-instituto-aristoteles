import ToastContainer from '@/shared/components/toast-container'
import { inter } from '@/shared/fonts'
import TailwindFix from '@/shared/utils/tailwind-fix'
import type { Metadata } from 'next'
import 'primeicons/primeicons.css'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/lara-dark-indigo/theme.css'
import { PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Instituto Aristóteles',
    default: 'Admin | Instituto Aristóteles',
  },
  description: 'Painel administrativo do site Instituto Aristóteles',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <PrimeReactProvider>
          <ToastContainer>{children}</ToastContainer>
        </PrimeReactProvider>
        <TailwindFix />
      </body>
    </html>
  )
}

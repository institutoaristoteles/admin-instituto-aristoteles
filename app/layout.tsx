import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PropsWithChildren } from "react"
import "primereact/resources/themes/soho-dark/theme.css"
import "primeicons/primeicons.css"
import { PrimeReactProvider } from "primereact/api"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Instituto Aristóteles",
    default: "Admin | Instituto Aristóteles",
  },
  description: "Painel administrativo do site Instituto Aristóteles",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </body>
    </html>
  )
}

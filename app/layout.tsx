import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { PropsWithChildren } from "react"

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
      <body className={inter.className}>{children}</body>
    </html>
  )
}

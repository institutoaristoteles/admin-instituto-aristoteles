import "./globals.css"
import type { Metadata } from "next"
import { PropsWithChildren } from "react"
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primeicons/primeicons.css"
import { PrimeReactProvider } from "primereact/api"
import localFont from "next/font/local"

const inter = localFont({
  variable: "--font-inter",
  src: [
    {
      path: "./_shared/fonts/inter/Inter-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./_shared/fonts/inter/Inter-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./_shared/fonts/inter/Inter-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./_shared/fonts/inter/Inter-ExtraBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./_shared/fonts/inter/Inter-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
})

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

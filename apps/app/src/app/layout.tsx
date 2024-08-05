import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Pokemon Trading Card Game',
  description: 'Pokemon Trading Card Game for Cookunity Challenge',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={cn(
        'bg-neutral-50 font-sans antialiased',
        inter.variable,
      )}
      >
        {children}
      </body>
    </html>
  )
}

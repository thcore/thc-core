import type { Metadata } from 'next'
import Providers from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'THC Core',
  description: 'THC Core Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

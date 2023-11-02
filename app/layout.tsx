import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from "@/app/ui/header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bloxberg certify app',
  description: 'Certify and verify your scientific documents.',
  authors: {
    name: 'Felix Riehm',
    url: 'https://github.com/felixriehm'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen bg-bloxberg-blue-800"}>
        {/* Include shared UI here e.g. a header or sidebar */}
        <Header></Header>
        {children}
      </body>
    </html>
  )
}

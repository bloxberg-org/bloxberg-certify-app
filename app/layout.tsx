import type { Metadata } from 'next'
import './boxicons.css'
import './globals.css'
import Header from "@/app/ui/header";
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Bloxberg certify app',
  description: 'Certify and verify your scientific documents.',
  authors: {
    name: 'Felix Riehm',
    url: 'https://github.com/felixriehm'
  }
}

const montserrat_font = localFont({
  src: '../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat_font.variable}`}>
      <body className={"font-bloxberg font-normal min-h-screen bg-bloxberg-blue-800"}>
        <Header></Header>
        <main className="mx-auto my-0 py-10 h-full bg-bloxberg-blue-800 max-w-screen-lg">
          {children}
        </main>
      </body>
    </html>
  )
}

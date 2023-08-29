/* eslint-disable react/react-in-jsx-scope */
import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import LeftSidebar from '@/components/share/LeftSidebar'
import Bottombar from '@/components/share/Bottombar'
import { ToasterProvider } from '@/lib/providers/toaster'

const inter = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HackStore',
  description: 'Developer Chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
        <body className={`${inter.className}`}>
        <ToasterProvider />
            <main className='flex flex-row'>
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
            </main>
          <Bottombar />
          </body>
          
    </html>
    </ClerkProvider>
  )
}

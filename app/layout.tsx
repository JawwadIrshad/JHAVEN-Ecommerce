import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { StoreProvider } from '@/components/providers/store-provider'
import { SiteChrome } from '@/components/layout/site-chrome'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jhaven.example'),
  title: {
    default: 'JHAVEN — Discover & Compare the Best Deals',
    template: '%s · JHAVEN',
  },
  description:
    'JHAVEN is a premium product discovery marketplace. Browse, compare, and find the best affiliate deals across electronics, fashion, gaming, home, and more.',
  keywords: ['JHAVEN', 'affiliate', 'marketplace', 'deals', 'compare prices', 'shopping'],
  generator: 'v0.app',
  openGraph: {
    title: 'JHAVEN — Discover & Compare the Best Deals',
    description:
      'Browse, compare, and find the best affiliate deals across every category.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1424' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <StoreProvider>
            <SiteChrome>{children}</SiteChrome>
          </StoreProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

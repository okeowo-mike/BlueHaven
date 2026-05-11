import type { Metadata, Viewport } from 'next'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/600.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Luxury Stays | Premium Accommodation Booking',
  description: 'Experience the epitome of luxury living with our meticulously curated accommodations. Book your perfect getaway where comfort meets elegance.',
  keywords: 'luxury accommodation, vacation rental, premium stay, holiday home, boutique rental',
  openGraph: {
    title: 'Luxury Stays | Premium Accommodation Booking',
    description: 'Experience the epitome of luxury living with our meticulously curated accommodations.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

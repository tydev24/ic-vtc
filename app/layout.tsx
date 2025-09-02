import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import ScrollToTop from "@/components/scroll-to-top"
import "./globals.css"

export const metadata: Metadata = {
  title: "ICVTC35 - Service VTC Premium à Rennes",
  description:
    "Service de VTC haut de gamme à Rennes. Transport privé professionnel, ponctuel et sécurisé. Réservation en ligne disponible 7j/7.",
  generator: "v0.app",
  keywords: "VTC Rennes, chauffeur privé Rennes, transport premium, taxi luxe Rennes",
  icons: {
  icon: "/placeholder-logo.png",
  shortcut: "/placeholder-logo.png",
  apple: "/placeholder-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ICVTC35 - Service VTC Premium à Rennes",
    description: "Service de VTC haut de gamme à Rennes. Transport privé professionnel, ponctuel et sécurisé.",
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Use project logo in public/ as favicon and apple touch icon */}
        <link rel="icon" href="/placeholder-logo.png" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ScrollToTop />
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
            </div>
          }
        >
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

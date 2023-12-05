import "./globals.css"

import { RootFooter } from "@/app/_components/root-footer"
import { RootHeader } from "@/app/_components/root-header"
import { RootProvider } from "@/app/_components/root-provider"
import { config } from "@/config"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import Script from "next/script"

const notoSansJp = Noto_Sans_JP({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
})

type Props = {
  children: React.ReactNode
}

const RootLayout = (props: Props) => {
  return (
    <html lang={"ja"} suppressHydrationWarning>
      <head>
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-BN8E5K5EG4"
        />
        <Script strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
   function gtag(){dataLayer.push(arguments);}
   gtag('js', new Date());`}
        </Script>
      </head>
      <body
        className={cn(
          "min-h-screen font-sans antialiased w-full",
          notoSansJp.variable,
        )}
      >
        <RootProvider>
          <RootHeader />
          {props.children}
          <RootFooter />
        </RootProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  title: {
    default: config.siteTitle,
    template: `%s - ${config.siteTitle}`,
  },
  description: config.siteDescription,
  robots: { index: false },
  openGraph: {
    title: config.siteTitle,
    description: config.siteDescription,
    images: ["https://tech.ryukyu-i.co.jp/og-image.jpg"],
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: config.siteTitle,
    description: config.siteDescription,
    site: "@Inta_PR",
    creator: "@Inta_PR",
  },
}

export default RootLayout

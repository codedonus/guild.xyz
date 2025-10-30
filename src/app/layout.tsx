import { Providers } from "@/components/Providers"
import { PostHogPageViews } from "@/components/Providers/PostHogPageViews"
import { dystopian, inter } from "fonts"
import { type ReactNode, Suspense } from "react"
import "./globals.css"
import { OAuthResultToast } from "@/components/Providers/OAuthResultToast"
import { ReadOnlyBanner } from "@/components/ReadOnlyBanner"
import { TermsOfUseUpdateDialog } from "@/components/TermsOfUseUpdateDialog"
import { cn } from "@/lib/utils"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import NextTopLoader from "nextjs-toploader"

interface RootLayoutProps {
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Guildhall",
  applicationName: "Guildhall",
  description:
    "Automated membership management for the platforms your community already uses.",
  icons: {
    icon: "/guild-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#27272a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
  ],
  colorScheme: "dark light",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              async
              defer
              src="/js/script.js"
              data-api="/api/event"
              data-domain="guild.xyz"
              integrity="sha512-HVRUd9pld7dyE4GD9bua0YojsAokMtFExYGvwJhJ5zq37EEX7yEOeYEsh0yh/CypC832F1VkewDepCdoDlPwEw=="
              data-exclude="/oauth**"
            />
            <Script
              async
              defer
              src="https://js.jam.dev/support/d00eb75d-44cf-48af-a274-ae7c828bb08e.js"
            />
          </>
        )}
      </head>
      <body className={cn(dystopian.variable, inter.variable)}>
        <NextTopLoader showSpinner={false} color="#eff6ff" height={3} />

        <ReadOnlyBanner />

        <div className="relative top-12">
          <Providers>
            {children}

            <TermsOfUseUpdateDialog />
            <Suspense>
              <PostHogPageViews />
              <OAuthResultToast />
            </Suspense>
          </Providers>
        </div>

        <canvas
          id="js-confetti-canvas"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 10001,
            pointerEvents: "none",
          }}
        />
      </body>
    </html>
  )
}

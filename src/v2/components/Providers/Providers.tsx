"use client"

import { FuelProvider } from "@fuels/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { env } from "env"
import { fuelConfig } from "fuelConfig"
import { useAtomValue } from "jotai"
import { ThemeProvider } from "next-themes"
import dynamic from "next/dynamic"
import { ReactNode, Suspense } from "react"
import { SWRConfig } from "swr"
import { fetcherForSWR } from "utils/fetcher"
import { shouldUseReCAPTCHAAtom } from "utils/recaptcha"
import { WagmiProvider } from "wagmi"
import { wagmiConfig } from "wagmiConfig"
import { AccountModal } from "../Account/components/AccountModal"
import { PurchaseHistoryDrawer } from "../Account/components/PurchaseHistoryDrawer/PurchaseHistoryDrawer"
import { Web3ConnectionManager } from "../Web3ConnectionManager"
import { Toaster } from "../ui/Toaster"
import { TooltipProvider } from "../ui/Tooltip"
import { IntercomProvider } from "./IntercomProvider"
import { PostHogProvider } from "./PostHogProvider"

const DynamicReCAPTCHA = dynamic(() => import("v2/components/ReCAPTCHA"))

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  const shouldUseReCAPTCHA = useAtomValue(shouldUseReCAPTCHAAtom)

  return (
    <>
      <ThemeProvider
        attribute="data-theme"
        storageKey="chakra-ui-color-mode"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <SWRConfig value={{ fetcher: fetcherForSWR }}>
            <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
              <QueryClientProvider client={queryClient}>
                <FuelProvider ui={false} fuelConfig={fuelConfig}>
                  <PostHogProvider>
                    <IntercomProvider>
                      {children}
                      <AccountModal />
                      <PurchaseHistoryDrawer />
                      <Suspense>
                        <Web3ConnectionManager />
                      </Suspense>
                    </IntercomProvider>
                  </PostHogProvider>
                </FuelProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </SWRConfig>

          <Toaster />
        </TooltipProvider>
      </ThemeProvider>

      {shouldUseReCAPTCHA && (
        <DynamicReCAPTCHA
          sitekey={env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          size="invisible"
        />
      )}
    </>
  )
}
